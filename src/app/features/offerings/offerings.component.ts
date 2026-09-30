import { Component, inject } from '@angular/core';
import { LocalizedText } from '../../core/models/portfolio.model';
import { projectById } from '../../core/data/projects.data';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

interface Offering {
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  deliverable: LocalizedText;
  technologies: string[];
  projectIds: string[];
}

@Component({
  selector: 'app-offerings',
  standalone: true,
  templateUrl: './offerings.component.html',
  styleUrl: './offerings.component.scss',
})
export class OfferingsComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly copy = {
    kicker: { en: 'How I can help', ar: 'كيف يمكنني المساعدة' },
    title: { en: 'Engineering support, from architecture to delivery', ar: 'حلول هندسية من تصميم البنية حتى التسليم' },
    intro: {
      en: 'Four ways I turn complex requirements into software people can use and teams can maintain.',
      ar: 'أربعة مجالات أحوّل فيها المتطلبات المعقدة إلى برمجيات سهلة الاستخدام والصيانة.',
    },
    deliverable: { en: 'What you get', ar: 'ما ستحصل عليه' },
    proof: { en: 'Relevant work', ar: 'أعمال ذات صلة' },
    technologies: { en: 'Technologies', ar: 'التقنيات' },
    viewWork: { en: 'Explore the work', ar: 'استكشف الأعمال' },
  };

  readonly offerings: Offering[] = [
    {
      number: '01',
      title: { en: 'Platform architecture', ar: 'هندسة المنصات' },
      description: {
        en: 'Design clear boundaries across web, mobile, API and data for products that need to grow.',
        ar: 'تصميم حدود واضحة بين الويب والموبايل والواجهات البرمجية والبيانات للمنتجات القابلة للنمو.',
      },
      deliverable: {
        en: 'A coherent system structure, shared contracts and reusable foundations.',
        ar: 'بنية نظام متماسكة، وعقود مشتركة، وأساس قابل لإعادة الاستخدام.',
      },
      technologies: ['Nx', 'Angular', 'NestJS', 'PostgreSQL'],
      projectIds: ['nasaq', 'school'],
    },
    {
      number: '02',
      title: { en: 'Enterprise Angular', ar: 'أنظمة Angular المؤسسية' },
      description: {
        en: 'Build demanding interfaces with complex forms, workflows, multilingual content and reliable state.',
        ar: 'بناء واجهات مؤسسية بنماذج ومسارات عمل معقدة ومحتوى متعدد اللغات وإدارة حالة موثوقة.',
      },
      deliverable: {
        en: 'Maintainable interfaces shaped around real operational workflows.',
        ar: 'واجهات قابلة للصيانة ومصممة حول مسارات العمل الفعلية.',
      },
      technologies: ['Angular', 'RxJS', 'Reactive Forms', 'PrimeNG'],
      projectIds: ['workflow', 'undp'],
    },
    {
      number: '03',
      title: { en: 'Modernization', ar: 'تحديث الأنظمة' },
      description: {
        en: 'Restructure inherited frontends and replace fragile parts while keeping delivery moving.',
        ar: 'إعادة تنظيم الواجهات الموروثة واستبدال أجزائها الهشة مع استمرار تسليم العمل.',
      },
      deliverable: {
        en: 'A clearer codebase and a usable production system.',
        ar: 'قاعدة شيفرة أوضح ونظام إنتاج قابل للاستخدام.',
      },
      technologies: ['Angular', 'TypeScript', 'Component Architecture'],
      projectIds: ['tli', 'workflow'],
    },
    {
      number: '04',
      title: { en: 'Web and mobile delivery', ar: 'تطوير الويب والموبايل' },
      description: {
        en: 'Connect responsive web products and field-ready mobile apps through shared product thinking.',
        ar: 'ربط منتجات ويب متجاوبة بتطبيقات موبايل مناسبة للعمل الميداني ضمن تصور موحد للمنتج.',
      },
      deliverable: {
        en: 'Connected experiences across browser and Android.',
        ar: 'تجربة مترابطة عبر المتصفح وأندرويد.',
      },
      technologies: ['Angular', 'Ionic', 'Capacitor'],
      projectIds: ['nasaq', 'mandoob'],
    },
  ];

  projectNames(ids: string[]): string[] {
    return ids
      .map((id) => projectById(id))
      .filter((project) => project !== undefined)
      .map((project) => this.workspace.t(project.name));
  }
}
