import type { L } from "@/lib/i18n";

export type Service = { title: L; summary: L; details: L; includes: L[] };

export const services: Service[] = [
  {
    title: { en: "Web Development", ar: "تطوير المواقع" },
    summary: { en: "Modern responsive websites and web experiences.", ar: "مواقع حديثة ومتجاوبة مع كل الشاشات." },
    details: {
      en: "Marketing sites, portfolios and landing pages that load fast, read clearly and work properly on every screen size.",
      ar: "مواقع تعريفية ومعارض أعمال وصفحات هبوط سريعة التحميل، واضحة القراءة، وتعمل بشكل صحيح على كل الشاشات.",
    },
    includes: [
      { en: "Responsive layouts", ar: "تصميم متجاوب" },
      { en: "SEO fundamentals", ar: "أساسيات تحسين محركات البحث" },
      { en: "Performance", ar: "أداء عالٍ" },
      { en: "CMS-ready structure", ar: "هيكل جاهز لنظام إدارة المحتوى" },
    ],
  },
  {
    title: { en: "Web Applications", ar: "تطبيقات الويب" },
    summary: { en: "Dashboards, SaaS products, portals, and custom web tools.", ar: "لوحات تحكم ومنتجات SaaS وبوابات وأدوات ويب مخصصة." },
    details: {
      en: "Interfaces with real state: authentication flows, dashboards, data tables, forms and multi-step workflows.",
      ar: "واجهات ببيانات حقيقية: تسجيل الدخول، ولوحات التحكم، وجداول البيانات، والنماذج، والخطوات المتعددة.",
    },
    includes: [
      { en: "Dashboards", ar: "لوحات تحكم" },
      { en: "Data tables & filters", ar: "جداول وفلاتر" },
      { en: "Forms & validation", ar: "نماذج مع التحقق" },
      { en: "Component systems", ar: "أنظمة مكونات" },
    ],
  },
  {
    title: { en: "Mobile Applications", ar: "تطبيقات الجوال" },
    summary: { en: "Cross-platform mobile apps with clean, intuitive interfaces.", ar: "تطبيقات جوال لآيفون وأندرويد بواجهات نظيفة وسهلة." },
    details: {
      en: "iOS and Android apps built with React Native and Expo from a single TypeScript codebase.",
      ar: "تطبيقات iOS وأندرويد مبنية بـ React Native وExpo من كود TypeScript واحد.",
    },
    includes: [
      { en: "React Native & Expo", ar: "React Native وExpo" },
      { en: "Native-feeling navigation", ar: "تنقل بإحساس التطبيقات الأصلية" },
      { en: "Dark mode", ar: "الوضع الداكن" },
      { en: "Store-ready builds", ar: "نسخ جاهزة للمتاجر" },
    ],
  },
  {
    title: { en: "Frontend Development", ar: "تطوير الواجهات الأمامية" },
    summary: { en: "Responsive implementation from designs and existing products.", ar: "تحويل التصاميم إلى واجهات متجاوبة، وتطوير المنتجات القائمة." },
    details: {
      en: "Turning Figma designs into accurate, accessible, maintainable code — or improving the front end of an existing product.",
      ar: "تحويل تصاميم Figma إلى كود دقيق وسهل الوصول وقابل للصيانة — أو تحسين واجهة منتج موجود.",
    },
    includes: [
      { en: "Figma to code", ar: "من Figma إلى كود" },
      { en: "Accessibility", ar: "سهولة الوصول" },
      { en: "Design systems", ar: "أنظمة التصميم" },
      { en: "Refactoring", ar: "إعادة هيكلة الكود" },
    ],
  },
  {
    title: { en: "Ecommerce", ar: "المتاجر الإلكترونية" },
    summary: { en: "Modern storefronts and product experiences.", ar: "متاجر حديثة وتجارب منتجات مميزة." },
    details: {
      en: "Storefronts designed around product discovery and a short path to checkout, with mobile shopping treated as the default.",
      ar: "متاجر مصممة حول اكتشاف المنتجات وطريق قصير للدفع، مع اعتبار الشراء من الجوال هو الأساس.",
    },
    includes: [
      { en: "Product catalogues", ar: "كتالوج المنتجات" },
      { en: "Product pages", ar: "صفحات المنتجات" },
      { en: "Cart flows", ar: "السلة والدفع" },
      { en: "Mobile-first UX", ar: "تجربة الجوال أولًا" },
    ],
  },
];

export const workProcess = [
  {
    step: "01",
    title: { en: "Discover", ar: "الاكتشاف" },
    body: { en: "We clarify goals, scope, audience and timeline. You get a clear proposal before any work starts.", ar: "نوضّح الأهداف والنطاق والجمهور والمدة، وتحصل على عرض واضح قبل بدء أي عمل." },
  },
  {
    step: "02",
    title: { en: "Design", ar: "التصميم" },
    body: { en: "Structure and interface direction, reviewed with you early so changes are cheap.", ar: "هيكل الموقع واتجاه الواجهة، نراجعها معًا مبكرًا لتكون التعديلات سهلة." },
  },
  {
    step: "03",
    title: { en: "Build", ar: "التطوير" },
    body: { en: "Clean, typed, responsive code with regular progress updates and preview links.", ar: "كود نظيف ومتجاوب مع تحديثات منتظمة وروابط معاينة." },
  },
  {
    step: "04",
    title: { en: "Launch", ar: "الإطلاق" },
    body: { en: "Testing across devices, deployment, and a handover so you can run it with confidence.", ar: "اختبار على كل الأجهزة، ثم النشر، وتسليم يجعلك تديره بثقة." },
  },
];
