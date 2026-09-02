import { MindsetTopic } from '../models/portfolio.model';

/**
 * Replaces the earlier "AI review" section. These are my own positions, written
 * in first person — nothing here is generated live or attributed to a model.
 */
export const mindsetTopics: MindsetTopic[] = [
  {
    id: 'architecture-first',
    icon: 'bi bi-diagram-2',
    title: { en: 'Architecture before implementation', ar: 'البنية قبل التنفيذ' },
    lead: {
      en: 'I decide where responsibilities live before I decide what the screen looks like. Most of the cost of a system is paid later, in the changes nobody planned for.',
      ar: 'أحدّد أين تقع المسؤوليات قبل أن أحدّد شكل الشاشة. فمعظم كلفة أي نظام تُدفع لاحقاً، في التغييرات التي لم يخطط لها أحد.',
    },
    points: {
      en: [
        'Draw the boundaries first: which module owns which decision.',
        'Prefer a model the business would recognise over one that only fits the current screens.',
        'Make the dependency rules explicit so they survive people leaving the team.',
      ],
      ar: [
        'ارسم الحدود أولاً: أي وحدة تملك أي قرار.',
        'فضّل نموذجاً يتعرّف عليه أهل العمل على نموذج يناسب الشاشات الحالية فقط.',
        'اجعل قواعد الاعتماد صريحة لتبقى بعد مغادرة أشخاص للفريق.',
      ],
    },
    evidence: {
      en: 'In Nasaq the Nx library boundaries follow the medical domain — patients, scheduling, records, billing — not the technical layer.',
      ar: 'في نَسَق تتبع حدود مكتبات Nx النطاق الطبي — المرضى والمواعيد والسجلات والفوترة — لا الطبقة التقنية.',
    },
    projectIds: ['nasaq', 'school'],
  },
  {
    id: 'maintainability',
    icon: 'bi bi-tools',
    title: { en: 'Building for maintainability', ar: 'البناء من أجل الصيانة' },
    lead: {
      en: 'Code is read and changed far more often than it is written. I treat "can the next person change this safely?" as part of whether the work is finished.',
      ar: 'يُقرأ الكود ويُعدَّل أكثر بكثير مما يُكتب. لذا أعدّ سؤال «هل يستطيع من يأتي بعدي تغيير هذا بأمان؟» جزءاً من تعريف اكتمال العمل.',
    },
    points: {
      en: [
        'One place per rule. Duplicated logic is a future bug with a delay fuse.',
        'Types at the boundaries, so a contract change fails at build time and not in production.',
        'Generated forms and data views instead of a hand-written variant per screen.',
      ],
      ar: [
        'مكان واحد لكل قاعدة. المنطق المكرّر خلل مؤجّل.',
        'أنماط عند الحدود، ليفشل تغيّر العقد وقت البناء لا في الإنتاج.',
        'نماذج وعروض بيانات مولّدة بدل نسخة مكتوبة يدوياً لكل شاشة.',
      ],
    },
    projectIds: ['nasaq', 'workflow'],
  },
  {
    id: 'legacy',
    icon: 'bi bi-arrow-repeat',
    title: { en: 'Modernizing systems I did not write', ar: 'تحديث أنظمة لم أكتبها' },
    lead: {
      en: 'Twice I have been handed an Angular frontend in poor structural condition and asked to deliver it anyway. Both times the answer was the same: understand it before touching it.',
      ar: 'مرّتين استلمت واجهة Angular بحالة بنيوية سيئة وطُلب مني تسليمها رغم ذلك. وفي المرتين كان الجواب واحداً: افهمها قبل أن تمسّها.',
    },
    points: {
      en: [
        'Read the real flows first — the code always says something the documentation does not.',
        'Rewriting everything is usually the slowest option, not the fastest.',
        'Repair what can be repaired; rebuild the rest behind the same behaviour so delivery never stops.',
        'Leave an architecture the team can keep working in after you hand it over.',
      ],
      ar: [
        'اقرأ المسارات الفعلية أولاً — الكود يقول دائماً ما لا تقوله الوثائق.',
        'إعادة كتابة كل شيء هي عادةً الخيار الأبطأ لا الأسرع.',
        'أصلح ما يمكن إصلاحه، وأعد بناء الباقي خلف السلوك نفسه حتى لا يتوقف التسليم.',
        'اترك بنية يستطيع الفريق مواصلة العمل داخلها بعد التسليم.',
      ],
    },
    evidence: {
      en: 'Tower Load Inventory and the Workflow Automation System were both delivered this way.',
      ar: 'سُلّم كل من Tower Load Inventory ونظام أتمتة سير العمل بهذه الطريقة.',
    },
    projectIds: ['tli', 'workflow'],
  },
  {
    id: 'frontend-to-fullstack',
    icon: 'bi bi-signpost-split',
    title: { en: 'From frontend to full-stack', ar: 'من الواجهة إلى Full-Stack' },
    lead: {
      en: 'Angular is still the centre of how I work. What changed is that I stopped treating the API as somebody else’s problem.',
      ar: 'ما زالت Angular مركز طريقتي في العمل. ما تغيّر أنني توقفت عن اعتبار الـ API مشكلة شخص آخر.',
    },
    points: {
      en: [
        'Most frontend pain starts as a data model decision made without the frontend in the room.',
        'Owning the API and the schema removes a whole class of workaround code.',
        'Nx makes the whole system one workspace, so a contract change is one commit.',
      ],
      ar: [
        'معظم آلام الواجهة تبدأ كقرار في نموذج البيانات اتُّخذ دون حضور الواجهة.',
        'امتلاك الـ API والمخطط يزيل صنفاً كاملاً من الكود الالتفافي.',
        'يجعل Nx النظام كله مساحة عمل واحدة، فيصبح تغيّر العقد التزاماً واحداً.',
      ],
    },
    projectIds: ['nasaq'],
  },
  {
    id: 'ai',
    icon: 'bi bi-cpu',
    title: { en: 'Using AI as an engineering tool', ar: 'استخدام الذكاء الاصطناعي كأداة هندسية' },
    lead: {
      en: 'I use AI the way I use a good colleague to argue with: to explore options faster and to pressure-test a design. The decision, the context and the responsibility stay mine.',
      ar: 'أستخدم الذكاء الاصطناعي كما أستخدم زميلاً جيداً أناقشه: لاستكشاف الخيارات أسرع ولاختبار متانة التصميم. أما القرار والسياق والمسؤولية فتبقى لي.',
    },
    points: {
      en: [
        'Strong for learning a new area quickly and comparing approaches.',
        'Useful as a design reviewer that asks the question you skipped.',
        'Not a substitute for understanding the system you are responsible for.',
      ],
      ar: [
        'قوي في تعلّم مجال جديد بسرعة وفي مقارنة المقاربات.',
        'مفيد كمراجع تصميم يطرح السؤال الذي تخطّيته.',
        'ليس بديلاً عن فهم النظام الذي تتحمّل مسؤوليته.',
      ],
    },
  },
  {
    id: 'product',
    icon: 'bi bi-bullseye',
    title: { en: 'Product thinking', ar: 'التفكير بعقلية المنتج' },
    lead: {
      en: 'Founding Nasaq changed how I read requirements. A feature is not done when it works; it is done when someone can actually run their day with it.',
      ar: 'غيّر تأسيس نَسَق طريقة قراءتي للمتطلبات. فالميزة لا تكتمل حين تعمل، بل حين يستطيع أحدهم أن يدير يومه بها.',
    },
    points: {
      en: [
        'Ask what the user is trying to finish, not which screen they asked for.',
        'The boring flows — search, correction, undo — decide whether a system gets used.',
        'Constraints like a slow connection or a mid-range phone are requirements, not excuses.',
      ],
      ar: [
        'اسأل عمّا يحاول المستخدم إنجازه، لا عن الشاشة التي طلبها.',
        'المسارات المملّة — البحث والتصحيح والتراجع — هي التي تحسم إن كان النظام سيُستخدم.',
        'قيود مثل اتصال بطيء أو هاتف متوسط هي متطلبات لا أعذار.',
      ],
    },
    projectIds: ['nasaq', 'mandoob'],
  },
  {
    id: 'performance-a11y',
    icon: 'bi bi-universal-access',
    title: { en: 'Performance and accessibility', ar: 'الأداء وإتاحة الوصول' },
    lead: {
      en: 'Both are the same discipline: making sure the thing works for people whose conditions are worse than mine.',
      ar: 'كلاهما انضباط واحد: التأكد من أن الشيء يعمل لمن ظروفهم أصعب من ظروفي.',
    },
    points: {
      en: [
        'Semantic HTML and a keyboard path before any visual polish.',
        'Respect reduced-motion — animation should never gate access to content.',
        'Measure on the device the user actually has, not the one on my desk.',
      ],
      ar: [
        'بنية HTML دلالية ومسار لوحة مفاتيح قبل أي صقل بصري.',
        'احترم تقليل الحركة — يجب ألا تحجب الحركة الوصول إلى المحتوى.',
        'قِس على الجهاز الذي يملكه المستخدم فعلاً، لا الذي على مكتبي.',
      ],
    },
  },
];
