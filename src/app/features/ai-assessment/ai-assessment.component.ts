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

interface AssessmentMessage {
  author: 'user' | 'assistant';
  text: string;
}

interface ReportSection {
  title: string;
  text: string;
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
  readonly visibleMessages = signal<AssessmentMessage[]>([]);
  readonly isTyping = signal(false);
  readonly activeInsightIndex = computed(() => Math.max(0, this.visibleMessages().length - 1));
  readonly progress = computed(() => {
    const total = this.content().messages.length;
    return total ? Math.round((this.visibleMessages().length / total) * 100) : 0;
  });
  readonly completed = computed(() => this.visibleMessages().length === this.content().messages.length && !this.isTyping());
  readonly revealedInsights = computed(() => this.content().report.slice(0, Math.max(1, this.visibleMessages().length)));

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private timers: number[] = [];
  private started = false;

  readonly content = computed(() => {
    if (this.workspace.language() === 'ar') {
      return this.arabicAssessmentContent();
    }

    if (this.workspace.language() === 'ar') {
      return {
        kicker: 'تقييم تقني بالذكاء الاصطناعي',
        title: 'محادثة تلقائية تلخص تقييماً تقنياً طويلاً.',
        description:
          'ملخص مرئي لتقييم طويل مبني على نقاشات تقنية ممتدة، مراجعات أفكار، وتحليل لطريقة التفكير وبناء الحلول.',
        status: 'Live summary',
        promptLabel: 'Zaher',
        assistantLabel: 'ChatGPT',
        analysisTitle: 'لوحة التحليل',
        analysisDescription: 'تتحدث النتائج مع تقدم المحادثة.',
        analyzing: 'جاري التحليل',
        complete: 'اكتمل التقييم',
        replay: 'إعادة التشغيل',
        badges: ['Angular', 'ASP.NET Core', 'GraphQL', 'System Design', 'API Design', 'Data Modeling'],
        messages: [
          {
            author: 'user',
            text: 'هل يمكنك تلخيص تقييمي التقني بناءً على نقاشاتنا ومشاريعي؟',
          },
          {
            author: 'assistant',
            text:
              'يظهر نمط العمل تفكيراً يتجاوز تنفيذ الواجهات إلى فهم الأنظمة، نمذجة البيانات، وبناء حلول قابلة للنمو.',
          },
          {
            author: 'assistant',
            text:
              'نقاط القوة الأوضح: Angular، ربط الواجهات بالخلفيات، GraphQL، تصميم APIs، والتعامل مع المشاريع الديناميكية.',
          },
          {
            author: 'assistant',
            text:
              'أسلوب استخدام الذكاء الاصطناعي يبدو كأداة تعلم ومراجعة أفكار، وليس بديلاً عن القرار التقني الشخصي.',
          },
          {
            author: 'assistant',
            text:
              'المسار المتوقع يتجه نحو أدوار مثل Solution Architect، Technical Lead، وبناء منصات معقدة قابلة للتوسع.',
          },
        ] as AssessmentMessage[],
        report: [
          {
            title: 'الملخص التنفيذي',
            text:
              'يركز التقييم على الصورة الكاملة للمشروع: بنية النظام، قابلية الصيانة، قابلية التوسع، وربط القرار التقني باحتياجات العمل.',
          },
          {
            title: 'الهوية الهندسية',
            text:
              'الاهتمام لا يقتصر على استخدام الأدوات، بل يمتد إلى فهم سبب اختيار التقنية، حدودها، والبدائل الممكنة.',
          },
          {
            title: 'التفكير المعماري',
            text:
              'تتكرر موضوعات مثل الأنظمة الديناميكية، محركات التحقق، المنصات المالية، النمذجة، والأنظمة المعتمدة على Metadata.',
          },
          {
            title: 'منهجية حل المشكلات',
            text:
              'يميل الأسلوب إلى تقسيم المشكلات الكبيرة، البحث عن الأنماط المشتركة، تعميم الحلول، وتقييم البدائل قبل القرار.',
          },
          {
            title: 'استخدام الذكاء الاصطناعي',
            text:
              'يظهر ChatGPT كأداة لتسريع التعلم ومراجعة التصاميم ومقارنة البدائل، مع بقاء القرار والتحليل النهائيين لدى المطور.',
          },
        ] as ReportSection[],
      };
    }

    return {
      kicker: 'AI Technical Assessment',
      title: 'An automatic chat summary of a long technical review.',
      description:
        'A visual summary of a long-form AI assessment based on extended technical discussions, project thinking, and solution design patterns.',
      status: 'Live summary',
      promptLabel: 'Zaher',
      assistantLabel: 'ChatGPT',
      analysisTitle: 'Live analysis',
      analysisDescription: 'Insights unlock as the chat generates the assessment.',
      analyzing: 'Analyzing',
      complete: 'Assessment complete',
      replay: 'Replay',
      badges: ['Angular', 'ASP.NET Core', 'GraphQL', 'System Design', 'API Design', 'Data Modeling'],
      messages: [
        {
          author: 'user',
          text: 'Can you summarize my technical assessment based on our discussions and projects?',
        },
        {
          author: 'assistant',
          text:
            'The work pattern shows thinking beyond interface implementation toward systems, data modeling, and scalable solution design.',
        },
        {
          author: 'assistant',
          text:
            'Clear strengths include Angular, frontend-backend integration, GraphQL, API design, and dynamic project architecture.',
        },
        {
          author: 'assistant',
          text:
            'AI is used as a learning accelerator and idea reviewer, not as a replacement for personal technical judgment.',
        },
        {
          author: 'assistant',
          text:
            'The expected direction points toward Solution Architecture, Technical Leadership, and complex platform development.',
        },
      ] as AssessmentMessage[],
      report: [
        {
          title: 'Executive summary',
          text:
            'The assessment focuses on the full system: architecture, maintainability, scalability, and the link between technical choices and business needs.',
        },
        {
          title: 'Engineering identity',
          text:
            'The focus is not limited to using tools. It extends to understanding why a technology exists, its constraints, and its alternatives.',
        },
        {
          title: 'Architectural thinking',
          text:
            'Repeated themes include dynamic systems, validation engines, financial platforms, data modeling, and metadata-driven software.',
        },
        {
          title: 'Problem-solving method',
          text:
            'The approach tends to split large problems, identify reusable patterns, generalize solutions, and compare options before decisions.',
        },
        {
          title: 'AI usage pattern',
          text:
            'ChatGPT appears as a tool for faster learning, design review, and alternative comparison while final judgment remains personal.',
        },
      ] as ReportSection[],
    };
  });

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  private arabicAssessmentContent() {
    return {
      kicker: 'تقييم تقني بالذكاء الاصطناعي',
      title: 'محادثة تلقائية تلخص تقييما تقنيا طويلا.',
      description:
        'ملخص مرئي لتقييم طويل مبني على نقاشات تقنية ممتدة، مراجعات أفكار، وتحليل لطريقة التفكير وبناء الحلول.',
      status: 'ملخص مباشر',
      promptLabel: 'زاهر',
      assistantLabel: 'ChatGPT',
      analysisTitle: 'لوحة التحليل',
      analysisDescription: 'تتحدث النتائج مع تقدم المحادثة.',
      analyzing: 'جار التحليل',
      complete: 'اكتمل التقييم',
      replay: 'إعادة التشغيل',
      badges: ['Angular', 'ASP.NET Core', 'GraphQL', 'System Design', 'API Design', 'Data Modeling'],
      messages: [
        {
          author: 'user',
          text: 'هل يمكنك تلخيص تقييمي التقني بناء على نقاشاتنا ومشاريعي؟',
        },
        {
          author: 'assistant',
          text:
            'يظهر نمط العمل تفكيرا يتجاوز تنفيذ الواجهات إلى فهم الأنظمة، نمذجة البيانات، وبناء حلول قابلة للنمو.',
        },
        {
          author: 'assistant',
          text:
            'نقاط القوة الأوضح: Angular، ربط الواجهات بالخلفيات، GraphQL، تصميم APIs، والتعامل مع المشاريع الديناميكية.',
        },
        {
          author: 'assistant',
          text:
            'استخدام الذكاء الاصطناعي يبدو كأداة تعلم ومراجعة أفكار، وليس بديلا عن القرار التقني الشخصي.',
        },
        {
          author: 'assistant',
          text:
            'المسار المتوقع يتجه نحو أدوار مثل Solution Architect، Technical Lead، وبناء منصات معقدة قابلة للتوسع.',
        },
      ] as AssessmentMessage[],
      report: [
        {
          title: 'الملخص التنفيذي',
          text:
            'يركز التقييم على الصورة الكاملة للمشروع: بنية النظام، قابلية الصيانة، قابلية التوسع، وربط القرار التقني باحتياجات العمل.',
        },
        {
          title: 'الهوية الهندسية',
          text:
            'الاهتمام لا يقتصر على استخدام الأدوات، بل يمتد إلى فهم سبب اختيار التقنية وحدودها والبدائل الممكنة.',
        },
        {
          title: 'التفكير المعماري',
          text:
            'تتكرر موضوعات مثل الأنظمة الديناميكية، محركات التحقق، المنصات المالية، النمذجة، والأنظمة المعتمدة على Metadata.',
        },
        {
          title: 'منهجية حل المشكلات',
          text:
            'يميل الأسلوب إلى تقسيم المشكلات الكبيرة، البحث عن الأنماط المشتركة، تعميم الحلول، وتقييم البدائل قبل القرار.',
        },
        {
          title: 'استخدام الذكاء الاصطناعي',
          text:
            'يظهر ChatGPT كأداة لتسريع التعلم ومراجعة التصاميم ومقارنة البدائل، مع بقاء القرار والتحليل النهائيين لدى المطور.',
        },
      ] as ReportSection[],
    };
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.revealAll();
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !this.started) {
          this.started = true;
          this.playConversation();
          this.observer?.disconnect();
        }
      },
      { rootMargin: '-10% 0px -20% 0px', threshold: 0.28 },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.clearTimers();
  }

  replay(): void {
    this.started = true;
    this.playConversation();
  }

  private playConversation(): void {
    this.clearTimers();
    this.visibleMessages.set([]);
    this.isTyping.set(false);

    if (this.prefersReducedMotion()) {
      this.revealAll();
      return;
    }

    this.queueMessage(0, 280);
  }

  private queueMessage(index: number, delay: number): void {
    const message = this.content().messages[index];

    if (!message) {
      this.isTyping.set(false);
      return;
    }

    const showTyping = message.author === 'assistant';
    if (showTyping) {
      this.isTyping.set(true);
    }

    this.addTimer(() => {
      this.visibleMessages.update((current) => [...current, message]);
      this.isTyping.set(false);
      this.scrollChatToBottom();
      this.queueMessage(index + 1, message.author === 'user' ? 900 : 1350);
    }, showTyping ? delay + 760 : delay);
  }

  private revealAll(): void {
    this.clearTimers();
    this.isTyping.set(false);
    this.visibleMessages.set(this.content().messages);
    this.scrollChatToBottom();
  }

  private addTimer(callback: () => void, delay: number): void {
    this.timers.push(window.setTimeout(callback, delay));
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => window.clearTimeout(timer));
    this.timers = [];
  }

  private prefersReducedMotion(): boolean {
    return isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private scrollChatToBottom(): void {
    this.addTimer(() => {
      const stream = this.chatStream?.nativeElement;
      if (stream) {
        stream.scrollTo({ top: stream.scrollHeight, behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
      }
    }, 40);
  }
}
