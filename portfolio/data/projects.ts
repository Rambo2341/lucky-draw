/**
 * Portfolio projects, in English and Arabic.
 *
 * To add a project, append an object to `projects`. The home grid, /work,
 * the case study, the sitemap and structured data update automatically.
 *
 * Links:
 * - `livePath`  a site hosted inside this portfolio (e.g. "/demos/velora");
 *               the visitor's language is appended automatically.
 * - `liveUrl`   an external deployment (https://…).
 * - `githubUrl` / `appDemoUrl` optional.
 * Leave any of them empty and its button is hidden. Never put "#" here.
 */
import type { L } from "@/lib/i18n";

export type ProjectStatus = "Personal Project" | "Concept Project";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "desktop" | "mobile";
};

export type ProjectFeature = { title: L; body: L };
export type ProjectChallenge = { challenge: L; solution: L };

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: L;
  status: ProjectStatus;
  year: number;
  platform: "web" | "mobile";
  bilingual?: boolean;
  featured: boolean;
  shortDescription: L;
  description: L;
  technologies: string[];
  visual: "velora" | "nova" | "flowfin" | "orbit";
  thumbnail?: ProjectImage;
  images?: ProjectImage[];
  livePath?: string;
  liveUrl?: string;
  githubUrl?: string;
  appDemoUrl?: string;
  caseStudy: {
    overview: L;
    goal: L;
    designDirection: L;
    developmentApproach: L;
    features: ProjectFeature[];
    responsive: L;
    challenges: ProjectChallenge[];
    result: L;
  };
};

export const projects: Project[] = [
  {
    slug: "velora-estates",
    number: "01",
    name: "Velora Estates",
    category: { en: "Luxury Real Estate Platform", ar: "منصة عقارات فاخرة" },
    status: "Concept Project",
    year: 2026,
    platform: "web",
    bilingual: true,
    featured: true,
    shortDescription: {
      en: "A working, bilingual (Arabic/English) luxury property platform for the Gulf, with search, filters, favourites and viewing requests.",
      ar: "منصة عقارات فاخرة للخليج تعمل بالكامل بالعربية والإنجليزية، فيها بحث وفلاتر ومفضلة وحجز معاينات.",
    },
    description: {
      en: "A fully working luxury real-estate website for the Gulf market, in Arabic and English, where every page and control can be tried: search, filters, favourites and a validated viewing request.",
      ar: "موقع عقارات فاخر لسوق الخليج يعمل بالكامل بالعربية والإنجليزية، ويمكن تجربة كل صفحاته وأزراره: البحث والفلاتر والمفضلة وطلب المعاينة.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    visual: "velora",
    livePath: "/demos/velora",
    liveUrl: "",
    githubUrl: "",
    caseStudy: {
      overview: {
        en: "Velora Estates is a complete concept website for a fictional luxury agency with desks in Riyadh, Jeddah, Dubai and Kuwait City. Eight pages — Home, Residences, Property, Set aside, Locations, Agents, About and Contact — all work, in Arabic and English.",
        ar: "فيلورا للعقارات موقع تجريبي متكامل لوكالة عقارات فاخرة افتراضية لها مكاتب في الرياض وجدة ودبي ومدينة الكويت. ثماني صفحات — الرئيسية والعقارات وصفحة العقار والمحفوظة والمدن والوكلاء ومن نحن وتواصل — كلها تعمل بالعربية والإنجليزية.",
      },
      goal: {
        en: "The goal of this personal project was to prove, in a form a real-estate client can click through, that a premium bilingual property platform can be calm and editorial while search, filters, favourites and viewing requests stay fast and obvious.",
        ar: "هدف هذا المشروع الشخصي أن يثبت — بشكل يستطيع عميل العقار تجربته بنفسه — أن منصة عقارات فاخرة بلغتين يمكن أن تكون هادئة وأنيقة، مع بقاء البحث والفلاتر والمفضلة وطلبات المعاينة سريعة وواضحة.",
      },
      designDirection: {
        en: "The site is designed as a private agency's concierge stationery: white card stock, black letterpress ink, sand-coloured fields and an embossed V monogram. Each listing is issued as a keycard with a serial number and a perforated stub; favourites are cards set aside in a holder; a viewing request issues a numbered appointment card.",
        ar: "صُمّم الموقع كأدوات مكتبية لكونسيرج وكالة خاصة: بطاقات بيضاء، وحبر أسود بطابع الطباعة البارزة، ومساحات بلون الرمل، وشعار V محفور. كل عقار يصدر كبطاقة برقم تسلسلي وطرف قابل للقطع، والمفضلة بطاقات محفوظة في حافظة، وطلب المعاينة يصدر بطاقة موعد مرقّمة.",
      },
      developmentApproach: {
        en: "Built with the Next.js App Router in TypeScript and statically generated for both languages. Listings, agents and cities are typed bilingual data, so filtering and sorting are pure functions over one source of truth. Filter state lives in the URL, favourites and appointments persist in the browser, and Arabic pages render right-to-left with their own typefaces.",
        ar: "مبني بـ Next.js App Router وTypeScript، ومولّد مسبقًا للغتين. العقارات والوكلاء والمدن بيانات ثنائية اللغة ومحددة الأنواع، فالفلترة والترتيب دوال مباشرة على مصدر بيانات واحد. حالة الفلاتر محفوظة في الرابط، والمفضلة والمواعيد محفوظة في المتصفح، والصفحات العربية تُعرض من اليمين لليسار بخطوطها الخاصة.",
      },
      features: [
        {
          title: { en: "Concierge search", ar: "بحث بأسلوب الكونسيرج" },
          body: { en: "A request written as a sentence — type, city, buy or rent, budget — that opens the filtered collection.", ar: "طلب مكتوب كجملة — النوع والمدينة والشراء أو الإيجار والميزانية — يفتح النتائج مفلترة مباشرة." },
        },
        {
          title: { en: "Filters & sorting", ar: "فلاتر وترتيب" },
          body: { en: "City, type, purpose, budget and bedrooms, with a live count, an empty state and shareable URLs.", ar: "المدينة والنوع والغرض والميزانية وغرف النوم، مع عدّاد مباشر وحالة فارغة وروابط قابلة للمشاركة." },
        },
        {
          title: { en: "Set aside", ar: "حفظ العقارات" },
          body: { en: "Favourites saved in the browser, with the header holder counting cards as you add them.", ar: "مفضلة محفوظة في المتصفح، وحافظة في الأعلى تعدّ البطاقات كلما أضفت واحدة." },
        },
        {
          title: { en: "Property pages", ar: "صفحات العقارات" },
          body: { en: "Gallery with keyboard navigation, spec sheet, features, location and the responsible agent.", ar: "معرض صور يعمل بلوحة المفاتيح، وجدول مواصفات، ومزايا، وموقع، والوكيل المسؤول." },
        },
        {
          title: { en: "Schedule a viewing", ar: "حجز معاينة" },
          body: { en: "Validated date, time, name, phone and email; issues a numbered appointment card instantly.", ar: "تاريخ ووقت واسم وجوال وبريد مع التحقق منها، وتصدر بطاقة موعد مرقّمة فورًا." },
        },
        {
          title: { en: "Arabic & English", ar: "عربي وإنجليزي" },
          body: { en: "Every string written in both languages, full RTL layout, local currencies (SAR, AED, KWD).", ar: "كل نص مكتوب باللغتين، وتخطيط كامل من اليمين لليسار، وعملات محلية (ريال، درهم، دينار)." },
        },
      ],
      responsive: {
        en: "On desktop the filters sit in a sticky bar above a three-column grid and the spec sheet and viewing form stay beside the gallery. On phones the filters fold into one button with an active-filter count, cards stack full-width and the viewing form follows the property details.",
        ar: "على سطح المكتب تبقى الفلاتر في شريط ثابت فوق شبكة من ثلاثة أعمدة، وتبقى المواصفات ونموذج المعاينة بجانب الصور. على الجوال تُطوى الفلاتر في زر واحد يعرض عدد الفلاتر النشطة، وتظهر البطاقات بعرض كامل، ويأتي نموذج المعاينة بعد تفاصيل العقار.",
      },
      challenges: [
        {
          challenge: { en: "Budgets are hard to compare across SAR, AED and KWD.", ar: "صعوبة مقارنة الميزانيات بين الريال والدرهم والدينار." },
          solution: {
            en: "Prices always show in local currency, while budget filters compare a US-dollar equivalent using fixed peg rates, stated beside the results.",
            ar: "الأسعار تظهر دائمًا بالعملة المحلية، بينما تقارن فلاتر الميزانية ما يعادلها بالدولار بأسعار صرف ثابتة، مع توضيح ذلك بجانب النتائج.",
          },
        },
        {
          challenge: { en: "Arabic and English need different typography, not just mirrored layouts.", ar: "العربية والإنجليزية تحتاجان طباعة مختلفة، لا مجرد عكس للتخطيط." },
          solution: {
            en: "Each language has its own display and body faces, line heights and letter-spacing, switched with the document direction.",
            ar: "لكل لغة خطوطها للعناوين والنصوص، وارتفاع أسطرها وتباعد حروفها، وتتبدل تلقائيًا مع اتجاه الصفحة.",
          },
        },
      ],
      result: {
        en: "A property platform a client can actually use: open a residence, filter the collection, set cards aside and request a viewing, in either language. The listings, agents and images are fictional and labelled as such.",
        ar: "منصة عقارية يستطيع العميل استخدامها فعلًا: يفتح عقارًا، ويفلتر النتائج، ويحفظ البطاقات، ويطلب معاينة، بأي من اللغتين. العقارات والوكلاء والصور افتراضية ومذكور ذلك بوضوح.",
      },
    },
  },
  {
    slug: "nova-commerce",
    number: "02",
    name: "Nova Commerce",
    category: { en: "Premium Ecommerce Website", ar: "متجر إلكتروني فاخر" },
    status: "Concept Project",
    year: 2026,
    platform: "web",
    featured: true,
    shortDescription: {
      en: "A modern storefront designed around product discovery, fast navigation and clean mobile shopping.",
      ar: "متجر حديث مصمم حول اكتشاف المنتجات والتصفح السريع وتجربة شراء نظيفة على الجوال.",
    },
    description: {
      en: "A modern ecommerce experience designed around product discovery, conversion, fast navigation, and clean mobile shopping.",
      ar: "تجربة تجارة إلكترونية حديثة مصممة حول اكتشاف المنتجات والتحويل والتصفح السريع والشراء السلس من الجوال.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    visual: "nova",
    liveUrl: "",
    githubUrl: "",
    caseStudy: {
      overview: {
        en: "Nova Commerce is a concept storefront for a contemporary lifestyle brand. It focuses on the parts of ecommerce that decide whether a visitor buys: finding the right product quickly, understanding it, and checking out without friction.",
        ar: "نوفا كوميرس متجر تجريبي لعلامة أسلوب حياة عصرية. يركّز على ما يحدد قرار الشراء: الوصول للمنتج المناسب بسرعة، وفهمه، وإتمام الدفع بلا عوائق.",
      },
      goal: {
        en: "The goal of this personal project was to build a storefront structure that stays fast and clear across a large catalogue, with a mobile experience that feels designed rather than squeezed.",
        ar: "هدف هذا المشروع الشخصي بناء هيكل متجر يبقى سريعًا وواضحًا مع كتالوج كبير، وتجربة جوال مصممة لها خصيصًا لا مجرد نسخة مصغّرة.",
      },
      designDirection: {
        en: "Neutral backgrounds that let product photography lead, a strict type scale, and a single accent colour reserved for purchase actions so the path to checkout is always visually obvious.",
        ar: "خلفيات محايدة تترك الصدارة لصور المنتجات، وسلّم خطوط منضبط، ولون مميز واحد مخصص لأزرار الشراء ليبقى طريق الدفع واضحًا دائمًا.",
      },
      developmentApproach: {
        en: "Structured as a Next.js App Router project with typed product and collection models. Catalogue pages are statically generated, the cart is client state with optimistic updates, and filters are URL-driven so any result set can be linked.",
        ar: "مهيكل كمشروع Next.js App Router بنماذج منتجات ومجموعات محددة الأنواع. صفحات الكتالوج مولّدة مسبقًا، والسلة حالة في المتصفح بتحديث فوري، والفلاتر في الرابط ليمكن مشاركة أي نتائج.",
      },
      features: [
        { title: { en: "Product catalogue", ar: "كتالوج المنتجات" }, body: { en: "Responsive product grid with quick price and variant information.", ar: "شبكة منتجات متجاوبة مع السعر والخيارات بنظرة سريعة." } },
        { title: { en: "Collections", ar: "المجموعات" }, body: { en: "Curated collection pages with editorial headers.", ar: "صفحات مجموعات منسقة بعناوين تحريرية." } },
        { title: { en: "Search & filters", ar: "بحث وفلاتر" }, body: { en: "Instant search with category, price and size filters.", ar: "بحث فوري مع فلاتر الفئة والسعر والمقاس." } },
        { title: { en: "Product page", ar: "صفحة المنتج" }, body: { en: "Gallery, variant selection, sizing and delivery information above the fold.", ar: "صور واختيار الخيارات والمقاسات ومعلومات التوصيل في أعلى الصفحة." } },
        { title: { en: "Cart", ar: "السلة" }, body: { en: "Slide-over cart with quantity controls and a running total.", ar: "سلة جانبية مع التحكم بالكميات والمجموع مباشرة." } },
        { title: { en: "Mobile navigation", ar: "تنقل الجوال" }, body: { en: "Bottom-anchored actions and a full-screen category menu.", ar: "أزرار أسفل الشاشة وقائمة فئات بملء الشاشة." } },
      ],
      responsive: {
        en: "Desktop uses a four-column grid with a sticky filter rail. Tablet shifts to three columns with filters in a drawer. Mobile uses two columns, a sticky ‘Add to bag’ bar on product pages and a slide-up cart that never hides the total.",
        ar: "سطح المكتب يستخدم شبكة من أربعة أعمدة مع فلاتر ثابتة. التابلت ثلاثة أعمدة والفلاتر في درج. الجوال عمودان، وشريط «أضف للسلة» ثابت في صفحة المنتج، وسلة منزلقة لا تخفي المجموع أبدًا.",
      },
      challenges: [
        {
          challenge: { en: "Filter-heavy pages easily become slow and hard to share.", ar: "الصفحات الكثيرة الفلاتر تصبح بطيئة وصعبة المشاركة." },
          solution: { en: "Filters are encoded in the URL and resolved on the server, so pages load pre-filtered and remain linkable.", ar: "الفلاتر محفوظة في الرابط وتُعالج على الخادم، فتُحمّل الصفحة مفلترة ويمكن مشاركتها." },
        },
        {
          challenge: { en: "Mobile product pages often bury the purchase action.", ar: "صفحات المنتجات على الجوال غالبًا تُخفي زر الشراء." },
          solution: { en: "A compact sticky purchase bar keeps price, variant and ‘Add to bag’ visible while scrolling.", ar: "شريط شراء ثابت ومضغوط يُبقي السعر والخيار وزر «أضف للسلة» ظاهرًا أثناء التمرير." },
        },
      ],
      result: {
        en: "A storefront structure that prioritises clarity and speed, with a mobile shopping flow designed from the start rather than adapted at the end.",
        ar: "هيكل متجر يقدّم الوضوح والسرعة، مع تجربة شراء على الجوال مصممة من البداية لا معدّلة في النهاية.",
      },
    },
  },
  {
    slug: "flowfin",
    number: "03",
    name: "Flowfin",
    category: { en: "Mobile Finance Application", ar: "تطبيق مالي للجوال" },
    status: "Concept Project",
    year: 2026,
    platform: "mobile",
    featured: true,
    shortDescription: {
      en: "A personal finance app for tracking spending and understanding daily money habits at a glance.",
      ar: "تطبيق مالي شخصي لتتبع المصاريف وفهم عاداتك المالية اليومية بنظرة واحدة.",
    },
    description: {
      en: "A modern personal finance mobile application focused on tracking spending, understanding financial activity, and simple daily money management.",
      ar: "تطبيق جوال حديث للمالية الشخصية يركّز على تتبع المصاريف وفهم الحركة المالية وإدارة المال اليومية ببساطة.",
    },
    technologies: ["React Native", "Expo", "TypeScript"],
    visual: "flowfin",
    liveUrl: "",
    githubUrl: "",
    appDemoUrl: "",
    caseStudy: {
      overview: {
        en: "Flowfin is a concept mobile app that helps people understand where their money goes. Instead of dense spreadsheets, it surfaces a few clear numbers and lets the details unfold when needed.",
        ar: "فلوفِن تطبيق جوال تجريبي يساعد الناس على فهم أين تذهب أموالهم. بدل الجداول المزدحمة، يعرض أرقامًا قليلة وواضحة ويترك التفاصيل تظهر عند الحاجة.",
      },
      goal: {
        en: "The goal of this personal project was to design a finance app that someone could open for five seconds a day and come away knowing whether they are on track.",
        ar: "هدف هذا المشروع الشخصي تصميم تطبيق مالي يفتحه المستخدم خمس ثوانٍ يوميًا ويعرف منه إن كان يسير على الطريق الصحيح.",
      },
      designDirection: {
        en: "Dark-first interface with a single accent for positive balance, large numerals and soft category colours. Every screen answers one question before offering more detail.",
        ar: "واجهة داكنة أولًا بلون مميز واحد للرصيد الإيجابي، وأرقام كبيرة، وألوان هادئة للفئات. كل شاشة تجيب عن سؤال واحد قبل أن تعرض تفاصيل أكثر.",
      },
      developmentApproach: {
        en: "Planned as a cross-platform React Native app with Expo and TypeScript. Screens share a small design-token layer, charts are drawn from typed transaction data, and dark mode is driven by system settings.",
        ar: "مخطط كتطبيق React Native متعدد المنصات باستخدام Expo وTypeScript. الشاشات تتشارك طبقة صغيرة من رموز التصميم، والرسوم البيانية مبنية من بيانات عمليات محددة الأنواع، والوضع الداكن يتبع إعدادات الجهاز.",
      },
      features: [
        { title: { en: "Dashboard", ar: "لوحة رئيسية" }, body: { en: "Current balance, monthly spend and budget progress on one screen.", ar: "الرصيد الحالي ومصروف الشهر وتقدّم الميزانية في شاشة واحدة." } },
        { title: { en: "Expenses", ar: "المصروفات" }, body: { en: "Quick add flow with amount, category and note in three taps.", ar: "إضافة سريعة للمبلغ والفئة والملاحظة بثلاث نقرات." } },
        { title: { en: "Categories", ar: "الفئات" }, body: { en: "Spending grouped by category with colour-coded progress.", ar: "المصاريف مجمعة حسب الفئة مع تقدّم ملوّن." } },
        { title: { en: "Charts", ar: "رسوم بيانية" }, body: { en: "Weekly and monthly spending trends that are readable at phone size.", ar: "اتجاهات الصرف الأسبوعية والشهرية بوضوح على شاشة الجوال." } },
        { title: { en: "Transactions", ar: "العمليات" }, body: { en: "Searchable history grouped by day.", ar: "سجل قابل للبحث مجمّع حسب اليوم." } },
        { title: { en: "Dark mode", ar: "الوضع الداكن" }, body: { en: "Designed dark-first, with a matching light theme.", ar: "مصمم داكنًا أولًا، مع وضع فاتح متناسق." } },
      ],
      responsive: {
        en: "Layouts are built for phone widths from 360px upward, with safe-area handling for notches and home indicators, and touch targets of at least 44px throughout.",
        ar: "التخطيطات مبنية لعرض الجوال من 360 بكسل فأكثر، مع مراعاة النتوء وشريط الرئيسية، وأهداف لمس لا تقل عن 44 بكسل.",
      },
      challenges: [
        {
          challenge: { en: "Finance data is dense and can feel stressful.", ar: "البيانات المالية كثيفة وقد تسبب التوتر." },
          solution: { en: "Progressive disclosure: one headline number per screen, with breakdowns one tap away.", ar: "إظهار تدريجي: رقم رئيسي واحد في كل شاشة، والتفاصيل على بعد نقرة." },
        },
        {
          challenge: { en: "Charts are hard to read on small screens.", ar: "الرسوم البيانية صعبة القراءة على الشاشات الصغيرة." },
          solution: { en: "Simplified bar charts with direct labels instead of legends, and a highlighted current period.", ar: "أعمدة مبسطة بتسميات مباشرة بدل وسيلة الإيضاح، مع إبراز الفترة الحالية." },
        },
      ],
      result: {
        en: "A focused mobile experience that makes daily money checks quick and calm. The screens on this page are rendered live in code.",
        ar: "تجربة جوال مركّزة تجعل متابعة المال اليومية سريعة وهادئة. الشاشات في هذه الصفحة معروضة مباشرة بالكود.",
      },
    },
  },
  {
    slug: "orbit",
    number: "04",
    name: "Orbit",
    category: { en: "SaaS Dashboard", ar: "لوحة تحكم SaaS" },
    status: "Concept Project",
    year: 2026,
    platform: "web",
    featured: true,
    shortDescription: {
      en: "A productivity SaaS dashboard exploring complex UI architecture, analytics, tables and filtering.",
      ar: "لوحة تحكم SaaS للإنتاجية تستكشف بنية واجهات معقدة وتحليلات وجداول وفلاتر.",
    },
    description: {
      en: "A clean productivity SaaS dashboard demonstrating complex UI architecture, analytics, navigation, tables, filtering, and responsive application design.",
      ar: "لوحة تحكم SaaS نظيفة للإنتاجية تُظهر بنية واجهات معقدة وتحليلات وتنقلًا وجداول وفلاتر وتصميم تطبيق متجاوب.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    visual: "orbit",
    liveUrl: "",
    githubUrl: "",
    caseStudy: {
      overview: {
        en: "Orbit is a concept dashboard for a team productivity tool. It is an exercise in the kind of interface most SaaS products need: navigation, analytics, data tables and filters that remain usable as data grows.",
        ar: "أوربِت لوحة تحكم تجريبية لأداة إنتاجية للفرق. تمرين على نوع الواجهات التي يحتاجها معظم منتجات SaaS: تنقل وتحليلات وجداول بيانات وفلاتر تبقى سهلة الاستخدام مع نمو البيانات.",
      },
      goal: {
        en: "The goal of this personal project was to design a dashboard architecture that stays readable with real-world data volumes and adapts properly to tablet and mobile.",
        ar: "هدف هذا المشروع الشخصي تصميم بنية لوحة تحكم تبقى مقروءة مع حجم بيانات حقيقي، وتتكيف جيدًا مع التابلت والجوال.",
      },
      designDirection: {
        en: "Quiet neutral surfaces, a compact but legible type scale, and colour used only for status and data. Density is adjustable without breaking alignment.",
        ar: "أسطح محايدة هادئة، وسلّم خطوط مضغوط لكنه مقروء، واللون مستخدم فقط للحالات والبيانات. يمكن تغيير الكثافة دون كسر المحاذاة.",
      },
      developmentApproach: {
        en: "Structured as a Next.js App Router application with a shared layout shell, typed data models and composable table, filter and chart components that can be reused across views.",
        ar: "مهيكل كتطبيق Next.js App Router بإطار تخطيط مشترك، ونماذج بيانات محددة الأنواع، ومكونات جداول وفلاتر ورسوم قابلة لإعادة الاستخدام بين الشاشات.",
      },
      features: [
        { title: { en: "Analytics overview", ar: "نظرة تحليلية" }, body: { en: "Key metrics with period comparison and a trend chart.", ar: "مؤشرات رئيسية مع مقارنة الفترات ورسم للاتجاه." } },
        { title: { en: "Navigation", ar: "التنقل" }, body: { en: "Collapsible sidebar with sections, search and keyboard access.", ar: "شريط جانبي قابل للطي بأقسام وبحث ودعم لوحة المفاتيح." } },
        { title: { en: "Data tables", ar: "جداول البيانات" }, body: { en: "Sortable columns, status badges and row selection.", ar: "أعمدة قابلة للترتيب، وشارات حالة، وتحديد الصفوف." } },
        { title: { en: "Filtering", ar: "الفلترة" }, body: { en: "Combined filters for status, owner and date, shown as removable chips.", ar: "فلاتر مركبة للحالة والمسؤول والتاريخ تظهر كشارات قابلة للإزالة." } },
        { title: { en: "Responsive shell", ar: "إطار متجاوب" }, body: { en: "Sidebar becomes a drawer on tablet and a bottom bar on mobile.", ar: "الشريط الجانبي يصبح درجًا على التابلت وشريطًا سفليًا على الجوال." } },
      ],
      responsive: {
        en: "At 1280px and up the sidebar is always visible. At tablet widths it collapses to icons, and on mobile tables transform into stacked cards so no data requires horizontal scrolling.",
        ar: "من 1280 بكسل فأكثر يظهر الشريط الجانبي دائمًا. على التابلت يُطوى إلى أيقونات، وعلى الجوال تتحول الجداول إلى بطاقات متراصة فلا تحتاج أي بيانات للتمرير الأفقي.",
      },
      challenges: [
        {
          challenge: { en: "Wide data tables break on small screens.", ar: "الجداول العريضة تنكسر على الشاشات الصغيرة." },
          solution: {
            en: "Tables switch to a card layout below 768px, keeping the most important columns and moving the rest into a detail view.",
            ar: "تتحول الجداول إلى بطاقات تحت 768 بكسل، مع إبقاء الأعمدة الأهم ونقل الباقي إلى صفحة التفاصيل.",
          },
        },
        {
          challenge: { en: "Dashboards drift into visual noise as features grow.", ar: "لوحات التحكم تصبح مزدحمة بصريًا مع زيادة المزايا." },
          solution: { en: "A small component system with strict spacing and colour rules keeps new views consistent.", ar: "نظام مكونات صغير بقواعد صارمة للمسافات والألوان يُبقي الشاشات الجديدة متناسقة." },
        },
      ],
      result: {
        en: "A dashboard foundation that demonstrates structured, scalable front-end architecture and careful responsive design.",
        ar: "أساس للوحة تحكم يُظهر بنية واجهات منظمة وقابلة للتوسع وتصميمًا متجاوبًا مدروسًا.",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/** The live site for a project in the visitor's language: internal demo first, then an external URL. */
export function liveHref(p: Project, locale: "en" | "ar"): string | undefined {
  if (p.livePath) return `${p.livePath}/${locale}`;
  return p.liveUrl || undefined;
}
