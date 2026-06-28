import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

interface AnswerDetail {
  title: string;
  text?: string;
  bullets?: string[];
}

interface AssessmentAnswer {
  id: string;
  question: string;
  suggestion: string;
  title: string;
  lead: string;
  highlights: string[];
  details: AnswerDetail[];
}

interface AssessmentContent {
  kicker: string;
  title: string;
  description: string;
  placeholder: string;
  send: string;
  hint: string;
  suggestionsLabel: string;
  thinking: string[];
  more: string;
  less: string;
  answers: AssessmentAnswer[];
}

interface ChatMessage {
  id: number;
  author: 'user' | 'assistant';
  text?: string;
  answerId?: string;
}

@Component({
  selector: 'ai-assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-assessment.component.html',
  styleUrl: './ai-assessment.component.scss',
})
export class AiAssessmentComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);

  @ViewChild('chatStream') private chatStream?: ElementRef<HTMLElement>;
  @ViewChild('composerInput') private composerInput?: ElementRef<HTMLTextAreaElement>;

  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly isThinking = signal(false);
  readonly isAutoTyping = signal(false);
  readonly thinkingStep = signal(0);
  readonly hasHistoryAbove = signal(false);
  readonly canScroll = signal(false);
  readonly expandedMessages = signal<ReadonlySet<number>>(new Set());
  readonly canSend = computed(
    () => this.draft().trim().length > 0 && !this.isThinking() && !this.isAutoTyping(),
  );

  readonly content = computed<AssessmentContent>(() =>
    this.workspace.language() === 'ar' ? this.arabicContent() : this.englishContent(),
  );

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private timers: number[] = [];
  private thinkingTimer?: number;
  private messageId = 0;
  private started = false;
  private pendingAnswerId?: string;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.showOpeningConversation();
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.updateScrollState());
    if (this.chatStream?.nativeElement) {
      this.resizeObserver.observe(this.chatStream.nativeElement);
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !this.started) {
          this.started = true;
          this.playOpeningConversation();
          this.observer?.disconnect();
        }
      },
      { rootMargin: '-8% 0px -18% 0px', threshold: 0.2 },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    this.clearTimers();
    this.stopThinkingSteps();
  }

  answerFor(answerId?: string): AssessmentAnswer | undefined {
    return this.content().answers.find((answer) => answer.id === answerId);
  }

  isExpanded(messageId: number): boolean {
    return this.expandedMessages().has(messageId);
  }

  toggleExpanded(messageId: number): void {
    const next = new Set(this.expandedMessages());
    next.has(messageId) ? next.delete(messageId) : next.add(messageId);
    this.expandedMessages.set(next);
    this.addTimer(() => this.updateScrollState(), 220);
  }

  askSuggestion(answer: AssessmentAnswer): void {
    if (this.isThinking() || this.isAutoTyping()) {
      return;
    }

    this.typeQuestion(answer.question, answer.id, 16);
  }

  onDraftInput(event: Event): void {
    if (this.isAutoTyping()) {
      return;
    }

    const textarea = event.target as HTMLTextAreaElement;
    this.draft.set(textarea.value);
    this.resizeComposer(textarea);
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const question = this.draft().trim();
    if (!question || this.isThinking() || this.isAutoTyping()) {
      return;
    }

    const matchedAnswer =
      this.content().answers.find(
        (answer) => answer.question.toLocaleLowerCase() === question.toLocaleLowerCase(),
      ) ?? this.content().answers[0];

    this.submitQuestion(question, this.pendingAnswerId ?? matchedAnswer.id);
  }

  onChatScroll(): void {
    this.updateScrollState();
  }

  private playOpeningConversation(): void {
    this.resetConversationState();
    const coreAnswer = this.content().answers[0];

    if (this.prefersReducedMotion()) {
      this.showOpeningConversation();
      return;
    }

    this.addTimer(() => this.typeQuestion(coreAnswer.question, coreAnswer.id, 34), 450);
  }

  private typeQuestion(question: string, answerId: string, speed: number): void {
    this.clearTimers();
    this.pendingAnswerId = answerId;
    this.draft.set('');
    this.isAutoTyping.set(true);
    this.focusComposer();

    let index = 0;
    const typeNextCharacter = () => {
      index += 1;
      this.draft.set(question.slice(0, index));
      this.resizeComposer();

      if (index < question.length) {
        this.addTimer(typeNextCharacter, speed);
        return;
      }

      this.isAutoTyping.set(false);
      this.addTimer(() => this.submitQuestion(question, answerId), 420);
    };

    this.addTimer(typeNextCharacter, speed);
  }

  private submitQuestion(question: string, answerId: string): void {
    this.pendingAnswerId = undefined;
    this.messages.update((messages) => [
      ...messages,
      { id: ++this.messageId, author: 'user', text: question },
    ]);
    this.draft.set('');
    this.resetComposerHeight();
    this.beginAssistantResponse(answerId);
  }

  private beginAssistantResponse(answerId: string): void {
    this.isThinking.set(true);
    this.thinkingStep.set(0);
    this.startThinkingSteps();
    this.scrollChatToBottom();

    const delay = this.prefersReducedMotion() ? 0 : 2650;
    this.addTimer(() => {
      this.stopThinkingSteps();
      this.isThinking.set(false);
      this.messages.update((messages) => [
        ...messages,
        { id: ++this.messageId, author: 'assistant', answerId },
      ]);
      this.scrollChatToBottom();
      this.focusComposer();
    }, delay);
  }

  private showOpeningConversation(): void {
    this.resetConversationState();
    const coreAnswer = this.content().answers[0];
    this.messages.set([
      { id: ++this.messageId, author: 'user', text: coreAnswer.question },
      { id: ++this.messageId, author: 'assistant', answerId: coreAnswer.id },
    ]);
    this.scrollChatToBottom('auto');
  }

  private resetConversationState(): void {
    this.clearTimers();
    this.stopThinkingSteps();
    this.messages.set([]);
    this.expandedMessages.set(new Set());
    this.draft.set('');
    this.isThinking.set(false);
    this.isAutoTyping.set(false);
    this.pendingAnswerId = undefined;
    this.resetComposerHeight();
  }

  private startThinkingSteps(): void {
    if (!isPlatformBrowser(this.platformId) || this.prefersReducedMotion()) {
      return;
    }

    this.thinkingTimer = window.setInterval(() => {
      this.thinkingStep.update((step) => (step + 1) % this.content().thinking.length);
    }, 820);
  }

  private stopThinkingSteps(): void {
    if (this.thinkingTimer !== undefined && isPlatformBrowser(this.platformId)) {
      window.clearInterval(this.thinkingTimer);
      this.thinkingTimer = undefined;
    }
  }

  private resizeComposer(textarea = this.composerInput?.nativeElement): void {
    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  }

  private resetComposerHeight(): void {
    const textarea = this.composerInput?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  }

  private updateScrollState(): void {
    const stream = this.chatStream?.nativeElement;
    if (!stream) {
      return;
    }

    this.canScroll.set(stream.scrollHeight > stream.clientHeight + 4);
    this.hasHistoryAbove.set(stream.scrollTop > 12);
  }

  private scrollChatToBottom(behavior: ScrollBehavior = 'smooth'): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.addTimer(() => {
      const stream = this.chatStream?.nativeElement;
      if (!stream) {
        return;
      }

      stream.scrollTo({
        top: stream.scrollHeight,
        behavior: this.prefersReducedMotion() ? 'auto' : behavior,
      });
      this.updateScrollState();
    }, 50);
  }

  private focusComposer(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.addTimer(() => this.composerInput?.nativeElement.focus({ preventScroll: true }), 80);
  }

  private addTimer(callback: () => void, delay: number): void {
    if (!isPlatformBrowser(this.platformId)) {
      callback();
      return;
    }

    this.timers.push(window.setTimeout(callback, delay));
  }

  private clearTimers(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.timers = [];
      return;
    }

    this.timers.forEach((timer) => window.clearTimeout(timer));
    this.timers = [];
  }

  private prefersReducedMotion(): boolean {
    return isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private arabicContent(): AssessmentContent {
    return {
      kicker: 'تقييم مهني بالذكاء الاصطناعي',
      title: 'اسأل عن طريقة تفكيري ومساري الهندسي.',
      description:
        'محادثة مفتوحة تلخص تقييماً مهنياً بُني من النقاشات التقنية، القرارات المعمارية، والمشاريع الفعلية.',
      placeholder: 'اكتب سؤالك عن زاهر...',
      send: 'إرسال السؤال',
      hint: 'اختر سؤالاً مقترحاً أو اكتب سؤالك.',
      suggestionsLabel: 'أسئلة مقترحة',
      thinking: ['يفكر في السياق', 'يراجع النقاشات التقنية', 'يصوغ التقييم'],
      more: 'رؤية المزيد',
      less: 'عرض أقل',
      answers: [
        {
          id: 'overall',
          question: 'ما هو تقييمك المهني الشامل لزاهر؟',
          suggestion: 'التقييم المهني الشامل',
          title: 'تقييم مهني شامل',
          lead:
            'يُظهر زاهر شخصية مهندس برمجيات يتجه بوضوح من تنفيذ الحلول إلى تصميم الأنظمة والهندسة المعمارية وربط القرارات التقنية بأهداف الأعمال طويلة المدى.',
          highlights: [
            'يفكر في النظام وقابليته للتوسع قبل التفكير في الميزة المنفردة.',
            'يمتلك ميولاً معمارية واضحة واهتماماً عميقاً بنمذجة البيانات وقابلية الصيانة.',
            'يستخدم الذكاء الاصطناعي كمرشد ومراجع للأفكار، لا كبديل عن التفكير المستقل.',
            'يمتلك إمكانات قوية لأدوار الهندسة المتقدمة والقيادة التقنية.',
          ],
          details: [
            {
              title: 'الهوية الهندسية',
              bullets: [
                'مفكر أنظمة قبل أن يكون منفذ مزايا.',
                'يهتم ببناء منصات قابلة لإعادة الاستخدام والتخصيص.',
                'يربط متطلبات الأعمال بالبنية التقنية المناسبة.',
              ],
            },
            {
              title: 'العمق التقني',
              text:
                'يسعى لفهم أسباب وجود التقنيات والمفاضلات المعمارية وتأثير القرارات على الأداء والتوسع والصيانة، بدلاً من الاكتفاء بأنماط الاستخدام.',
            },
            {
              title: 'التفكير المعماري',
              text:
                'يهتم بالأنظمة المعتمدة على التوصيفات، المنصات المالية، محركات التحقق الديناميكية، تصميم واجهات API، منظومات GraphQL، وهياكل التطبيقات القابلة للتوسع.',
            },
            {
              title: 'أسلوب التعلم',
              text:
                'تحليلي واستكشافي ومدفوع بالفضول، ويفضل فهم المفهوم بعمق قبل تطبيقه في أنظمة الإنتاج.',
            },
            {
              title: 'استخدام الذكاء الاصطناعي',
              bullets: [
                'التعلم: مرتفع جداً',
                'مراجعة التصاميم: مرتفع',
                'المساعدة البرمجية: متوسط',
                'استبدال التفكير الشخصي: منخفض',
              ],
            },
            {
              title: 'المسار المهني المتوقع',
              text:
                'مهندس برمجيات أول ← مهندس حلول ← قائد تقني ← مهندس معماري للمؤسسات.',
            },
          ],
        },
        {
          id: 'identity',
          question: 'كيف تصف الهوية الهندسية لزاهر؟',
          suggestion: 'الهوية الهندسية',
          title: 'الهوية الهندسية',
          lead:
            'زاهر مفكر أنظمة قبل أن يكون منفذ مزايا؛ ينظر إلى المنتج كبنية مترابطة لا كمجموعة شاشات أو مهام منفصلة.',
          highlights: [
            'يفكر في الأنظمة قبل المزايا البرمجية.',
            'يبني حلولاً قابلة لإعادة الاستخدام والتخصيص.',
            'يصل متطلبات الأعمال بالقرارات المعمارية.',
          ],
          details: [
            {
              title: 'ما الذي يميز هذا الأسلوب؟',
              text:
                'الاهتمام لا يتوقف عند إنجاز الوظيفة المطلوبة، بل يمتد إلى حدود المسؤوليات، تطور النظام، سهولة صيانته، وقدرته على استيعاب متطلبات جديدة.',
            },
          ],
        },
        {
          id: 'depth',
          question: 'ما مستوى العمق التقني في طريقة تفكيره؟',
          suggestion: 'العمق التقني',
          title: 'العمق التقني',
          lead:
            'لا يكتفي زاهر بتعلم كيفية استخدام التقنية؛ بل يستكشف سبب وجودها، والقيود التي تعالجها، والمفاضلات التي تفرضها.',
          highlights: [
            'تحليل المفاضلات المعمارية قبل الاختيار.',
            'دراسة أثر القرار على الأداء والتوسع.',
            'اعتبار قابلية الصيانة جزءاً من جودة الحل.',
          ],
          details: [
            {
              title: 'النتيجة',
              text:
                'هذا النمط يبني فهماً قابلاً للنقل بين التقنيات، ويجعل القرارات مبنية على المبادئ والسياق بدلاً من الاعتماد على الأدوات الرائجة فقط.',
            },
          ],
        },
        {
          id: 'architecture',
          question: 'ما أبرز ميوله في التفكير المعماري؟',
          suggestion: 'التفكير المعماري',
          title: 'التفكير المعماري',
          lead:
            'تظهر في نقاشاته ميول قوية لبناء أنظمة ديناميكية وقابلة للتوسع تقودها البيانات والتوصيفات بدلاً من القواعد الجامدة.',
          highlights: [
            'Metadata-driven systems ومحركات التحقق الديناميكية.',
            'المنصات المالية ونمذجة البيانات المعقدة.',
            'تصميم API ومنظومات GraphQL وهياكل التطبيقات.',
          ],
          details: [
            {
              title: 'الصورة الأكبر',
              text:
                'الاهتمام المشترك بين هذه المجالات هو بناء أساس مرن يسمح للمنتج بالتطور من دون أن تتحول كل إضافة جديدة إلى إعادة بناء للنظام.',
            },
          ],
        },
        {
          id: 'learning',
          question: 'كيف يتعلم زاهر التقنيات والمفاهيم الجديدة؟',
          suggestion: 'أسلوب التعلم',
          title: 'أسلوب التعلم',
          lead:
            'أسلوبه تحليلي واستكشافي ومدفوع بالفضول، ويعطي الأولوية لفهم المفهوم بعمق قبل إدخاله في مشروع فعلي.',
          highlights: [
            'يبدأ بالأسئلة والمبادئ قبل التطبيق.',
            'يقارن البدائل ويختبر حدود كل حل.',
            'يحوّل المعرفة إلى نماذج قابلة لإعادة الاستخدام.',
          ],
          details: [
            {
              title: 'أثر ذلك عملياً',
              text:
                'يساعده هذا الأسلوب على التعامل مع مشكلات جديدة بثقة أكبر، لأن المعرفة لا تبقى مرتبطة بمكتبة أو إطار عمل واحد.',
            },
          ],
        },
        {
          id: 'ai',
          question: 'كيف يستخدم زاهر الذكاء الاصطناعي في عمله؟',
          suggestion: 'استخدام الذكاء الاصطناعي',
          title: 'تحليل استخدام الذكاء الاصطناعي',
          lead:
            'لا تشير التفاعلات إلى اعتماد على الذكاء الاصطناعي، بل إلى استخدامه كمرشد تقني ومسرّع للبحث والتعلم ومراجع للتصاميم والأفكار.',
          highlights: [
            'التعلم: مرتفع جداً',
            'مراجعة التصاميم: مرتفع',
            'المساعدة البرمجية: متوسط',
            'استبدال التفكير الشخصي: منخفض',
          ],
          details: [
            {
              title: 'الخلاصة',
              text:
                'ChatGPT شريك للعصف الذهني ومقارنة البدائل، بينما يبقى تحليل السياق واتخاذ القرار والمسؤولية التقنية لدى زاهر.',
            },
          ],
        },
        {
          id: 'career',
          question: 'ما المسار المهني المتوقع لزاهر؟',
          suggestion: 'المسار المهني',
          title: 'المسار المهني المتوقع',
          lead:
            'الميول الحالية تتوافق مع مسار ينتقل من الخبرة الهندسية المتقدمة إلى تصميم الحلول ثم القيادة التقنية والمعمارية.',
          highlights: [
            'مهندس برمجيات أول',
            'مهندس حلول',
            'قائد تقني',
            'مهندس معماري للمؤسسات',
          ],
          details: [
            {
              title: 'لماذا هذا المسار؟',
              text:
                'لأن نقاط القوة الظاهرة تجمع بين التحليل التقني، التفكير على مستوى النظام، فهم احتياجات الأعمال، والقدرة على تقييم البدائل طويلة المدى.',
            },
          ],
        },
      ],
    };
  }

  private englishContent(): AssessmentContent {
    return {
      kicker: 'AI Professional Assessment',
      title: 'Ask about my engineering mindset and direction.',
      description:
        'An open conversation shaped by technical discussions, architectural decisions, and real project work.',
      placeholder: 'Ask a question about Zaher...',
      send: 'Send question',
      hint: 'Choose a suggested question or write your own.',
      suggestionsLabel: 'Suggested questions',
      thinking: ['Thinking through the context', 'Reviewing technical discussions', 'Composing the assessment'],
      more: 'See more',
      less: 'Show less',
      answers: [
        {
          id: 'overall',
          question: "What is Zaher's overall professional assessment?",
          suggestion: 'Overall assessment',
          title: 'Overall professional assessment',
          lead:
            'Zaher demonstrates the profile of an engineer moving beyond implementation toward architecture, system design, and business-oriented technical thinking.',
          highlights: [
            'Thinks about systems and scalability before isolated features.',
            'Shows clear architectural tendencies and strong interest in data modeling and maintainability.',
            'Uses AI as a mentor and design reviewer, not a substitute for independent thinking.',
            'Has significant potential for senior engineering and technical leadership roles.',
          ],
          details: [
            {
              title: 'Engineering identity',
              bullets: [
                'Systems thinker before feature implementer.',
                'Interested in reusable platforms and configurable solutions.',
                'Connects business requirements with technical architecture.',
              ],
            },
            {
              title: 'Technical depth',
              text:
                'Frequently explores why technologies exist, architectural trade-offs, performance implications, and maintainability concerns rather than only learning usage patterns.',
            },
            {
              title: 'Architectural thinking',
              text:
                'Shows strong interest in metadata-driven systems, financial platforms, dynamic validation engines, API design, GraphQL ecosystems, and scalable application structures.',
            },
            {
              title: 'Learning profile',
              text:
                'Highly analytical, exploratory, and curiosity-driven. He prefers understanding concepts deeply before applying them in production systems.',
            },
            {
              title: 'AI utilization',
              bullets: [
                'Learning: Very high',
                'Design validation: High',
                'Coding assistance: Moderate',
                'Replacement of independent thinking: Low',
              ],
            },
            {
              title: 'Career projection',
              text:
                'Senior Software Engineer → Solution Architect → Technical Lead → Enterprise Architect.',
            },
          ],
        },
        {
          id: 'identity',
          question: "How would you describe Zaher's engineering identity?",
          suggestion: 'Engineering identity',
          title: 'Engineering identity',
          lead:
            'Zaher is a systems thinker before a feature implementer. He sees a product as an evolving structure rather than a collection of isolated screens and tasks.',
          highlights: [
            'Thinks in systems before individual features.',
            'Builds reusable and configurable solutions.',
            'Connects business requirements to technical architecture.',
          ],
          details: [
            {
              title: 'What distinguishes this approach?',
              text:
                'The focus extends beyond completing a requirement to responsibility boundaries, system evolution, maintainability, and the ability to absorb future needs.',
            },
          ],
        },
        {
          id: 'depth',
          question: 'How deep is his technical thinking?',
          suggestion: 'Technical depth',
          title: 'Technical depth',
          lead:
            'Zaher does not stop at learning how to use a technology. He explores why it exists, the constraints it addresses, and the trade-offs it introduces.',
          highlights: [
            'Evaluates architectural trade-offs before choosing.',
            'Studies the impact on performance and scalability.',
            'Treats maintainability as part of solution quality.',
          ],
          details: [
            {
              title: 'The result',
              text:
                'This builds knowledge that transfers across technologies and supports decisions based on principles and context rather than trends alone.',
            },
          ],
        },
        {
          id: 'architecture',
          question: 'What are his strongest architectural interests?',
          suggestion: 'Architectural thinking',
          title: 'Architectural thinking',
          lead:
            'His discussions show a strong interest in dynamic, scalable systems driven by data and metadata instead of rigid rules.',
          highlights: [
            'Metadata-driven systems and dynamic validation engines.',
            'Financial platforms and complex data modeling.',
            'API design, GraphQL ecosystems, and application structures.',
          ],
          details: [
            {
              title: 'The larger pattern',
              text:
                'These interests share one goal: creating a flexible foundation that can evolve without turning every new requirement into a system rewrite.',
            },
          ],
        },
        {
          id: 'learning',
          question: 'How does Zaher learn new technologies and concepts?',
          suggestion: 'Learning profile',
          title: 'Learning profile',
          lead:
            'His learning style is analytical, exploratory, and curiosity-driven, with deep understanding taking priority over immediate production use.',
          highlights: [
            'Starts with questions and principles before implementation.',
            'Compares alternatives and tests the boundaries of each solution.',
            'Turns knowledge into reusable mental models.',
          ],
          details: [
            {
              title: 'Practical impact',
              text:
                'This helps him approach unfamiliar problems with confidence because the knowledge is not tied to one library or framework.',
            },
          ],
        },
        {
          id: 'ai',
          question: 'How does Zaher use AI in his work?',
          suggestion: 'AI utilization',
          title: 'AI utilization analysis',
          lead:
            'The interaction history does not indicate dependence on AI. ChatGPT is primarily used as a technical mentor, research accelerator, design reviewer, and brainstorming partner.',
          highlights: [
            'Learning: Very high',
            'Design validation: High',
            'Coding assistance: Moderate',
            'Replacement of independent thinking: Low',
          ],
          details: [
            {
              title: 'Conclusion',
              text:
                'AI supports exploration and comparison, while contextual analysis, final decisions, and technical responsibility remain with Zaher.',
            },
          ],
        },
        {
          id: 'career',
          question: "What is Zaher's most likely career path?",
          suggestion: 'Career projection',
          title: 'Career projection',
          lead:
            'His current tendencies align with a path from advanced software engineering into solution design, technical leadership, and enterprise architecture.',
          highlights: [
            'Senior Software Engineer',
            'Solution Architect',
            'Technical Lead',
            'Enterprise Architect',
          ],
          details: [
            {
              title: 'Why this path?',
              text:
                'His strengths combine technical analysis, system-level thinking, business awareness, and an ability to assess long-term architectural options.',
            },
          ],
        },
      ],
    };
  }
}
