import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      brand: {
        name: 'ود تميم للمحاصيل',
        nameEnglish: 'Wad Tamim for Crops',
        slogan: 'محاصيل نقية، ثقة خالصة',
        location: 'السودان'
      },
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        products: 'المنتجات والخدمات',
        contact: 'تواصل معنا',
        quote: 'اطلب عرضاً',
        openMenu: 'فتح القائمة',
        closeMenu: 'إغلاق القائمة',
        switchLanguage: 'Switch to English',
        lightMode: 'تفعيل الوضع الفاتح',
        darkMode: 'تفعيل الوضع الداكن'
      },
      common: {
        learnMore: 'اعرف المزيد',
        exploreProducts: 'استكشف منتجاتنا',
        requestQuote: 'اطلب عرضاً',
        inquire: 'استفسر عن هذا المنتج',
        contactUs: 'تواصل معنا',
        viewAll: 'عرض جميع المنتجات',
        readMore: 'اكتشف قصتنا',
        callNow: 'اتصل الآن',
        whatsapp: 'واتساب',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف وواتساب',
        verifiedPhoto: 'صورة حقيقية مقدمة من العميل',
        placeholderLabel: 'لا تتوفر صورة موثقة حالياً',
        placeholderHelp: 'سيتم تحديث الصورة عند توفر أصل موثوق ومعتمد.',
        imageAltOperations: 'أجولة محاصيل معدّة للتوريد بالكميات التجارية',
        imageAltMarket: 'سوق محاصيل سوداني وحركة تداول الأجولة',
        imageAltHibiscus: 'كركديه سوداني مجفف داخل جوال',
        imageAltGum: 'قطع صمغ عربي طبيعية مقدمة من العميل',
        imageAltFrankincense: 'صمغ لبان طبيعي داخل ملعقة خشبية',
        imageAltTasali: 'بذور بطيخ سودانية معروفة بالتسالي',
        imageAltTamarind: 'ثمار عرديب سودانية طبيعية',
        imageAltSesame: 'بذور سمسم سودانية داخل جوال',
        imageAltGudeim: 'ثمار القضيم السودانية الطبيعية',
        skipToContent: 'انتقل إلى المحتوى',
        loading: 'جارٍ الإرسال...'
      },
      home: {
        seoTitle: 'ود تميم للمحاصيل | توريد المحاصيل السودانية',
        seoDescription: 'توريد المحاصيل الزراعية السودانية بالكميات التجارية للأسواق المحلية واستفسارات التصدير.',
        eyebrow: 'توريد محاصيل سودانية',
        heroTitle: 'محاصيل سودانية أصيلة، من أرضنا إلى أسواقكم',
        heroText: 'في ود تميم للمحاصيل، نعمل على توفير المحاصيل الزراعية السودانية للتجار والشركات والمشترين، مع التركيز على التوريد بالكميات التجارية وخدمة الأسواق المحلية وطلبات التصدير.',
        heroNote: 'توريد محلي • كميات تجارية • استفسارات تصدير',
        introKicker: 'من السودان، بكل أصالة',
        introTitle: 'شريك قريب لاحتياجاتكم من المحاصيل',
        introText: 'نربط المشترين بالمحاصيل السودانية المتنوعة عبر تجربة استفسار واضحة ومباشرة، من اختيار المنتج والكمية إلى مناقشة متطلبات التوريد.',
        introQuote: 'نتعامل مع كل طلب بوصفه بداية شراكة تجارية مبنية على الوضوح والثقة.',
        productsKicker: 'مختاراتنا',
        productsTitle: 'محاصيل تلائم أسواقاً متعددة',
        productsText: 'استكشف تشكيلتنا، وأرسل استفساراً بالكميات والمواصفات المطلوبة للحصول على متابعة مخصصة.',
        whyKicker: 'لماذا ود تميم؟',
        whyTitle: 'تجارة زراعية بروح مهنية',
        reasons: {
          source: { title: 'أصل سوداني', text: 'تركيز واضح على المحاصيل الزراعية السودانية والأسواق التي تبحث عنها.' },
          scale: { title: 'كميات تجارية', text: 'استقبال استفسارات التجار والشركات حول الكميات ومتطلبات التوريد.' },
          care: { title: 'تواصل مباشر', text: 'قنوات واضحة عبر الهاتف وواتساب والبريد لمناقشة كل طلب.' },
          flexible: { title: 'محلي وتصدير', text: 'خدمة استفسارات التوريد داخل السودان وطلبات المشترين الدوليين.' }
        },
        wholesaleKicker: 'توريد بالجملة',
        wholesaleTitle: 'الكمية والمواصفات تبدأ من احتياجكم',
        wholesaleText: 'أخبرونا بالمنتج والكمية المطلوبة ونوع الاستفسار. يراجع فريق ود تميم التفاصيل ويتواصل معكم لمناقشة التوفر والخطوة التالية.',
        flow: {
          product: { number: '01', title: 'اختر المحصول', text: 'حدد المنتج الأنسب لطلبك من الكتالوج.' },
          details: { number: '02', title: 'شارك التفاصيل', text: 'أرسل الكمية والاستخدام أو المواصفات المطلوبة.' },
          discuss: { number: '03', title: 'نناقش التوريد', text: 'نتواصل معك لمراجعة الطلب وخيارات المتابعة.' }
        },
        marketsKicker: 'من السوق المحلي إلى طلبات التصدير',
        marketsTitle: 'استفسارات تجارية بوجهة واضحة',
        domesticTitle: 'التوريد المحلي',
        domesticText: 'للشركات والتجار والمشترين داخل السودان الباحثين عن كميات تجارية من المحاصيل.',
        exportTitle: 'استفسارات التصدير',
        exportText: 'للمشترين الدوليين الراغبين في مناقشة المنتجات والكميات والمتطلبات التجارية.',
        galleryKicker: 'من قلب حركة المحاصيل',
        galleryTitle: 'صور حقيقية من التداول والتخزين',
        galleryText: 'مشاهد مقدمة من العميل تُظهر الأجولة وحركة سوق المحاصيل. لا تُستخدم الصور للادعاء بملكية منشآت محددة.',
        ctaTitle: 'لديك طلب محدد؟ لنبدأ بالتفاصيل.',
        ctaText: 'اختر المحصول، أضف الكمية ونوع الاستفسار، وسنستلم طلبك عبر قناة آمنة.'
      },
      about: {
        seoTitle: 'من نحن | ود تميم للمحاصيل',
        seoDescription: 'تعرف على ود تميم للمحاصيل وتركيزها على توريد السلع الزراعية السودانية للمشترين المحليين والدوليين.',
        eyebrow: 'من نحن',
        heroTitle: 'ثقة تبدأ من وضوح المصدر والطلب',
        heroText: 'ود تميم للمحاصيل مورد سوداني يركز على ربط المحاصيل الزراعية المحلية باحتياجات التجار والشركات والمشترين.',
        storyKicker: 'قصتنا',
        storyTitle: 'نعمل من واقع السوق الزراعي السوداني',
        storyText1: 'نركز على توريد مجموعة من المحاصيل السودانية بالكميات التجارية، مع استقبال الطلبات المحلية واستفسارات التصدير.',
        storyText2: 'نؤمن بأن الحوار الواضح حول المنتج والكمية والمواصفات هو الأساس لبناء تعامل تجاري جاد وموثوق.',
        missionTitle: 'مهمتنا',
        missionText: 'تسهيل وصول المشترين إلى المحاصيل السودانية عبر تواصل مهني واستجابة واضحة لاحتياجات التوريد.',
        visionTitle: 'رؤيتنا',
        visionText: 'أن تكون ود تميم اسماً موثوقاً في تجارة المحاصيل السودانية للأسواق المحلية والاستفسارات الدولية.',
        productsTitle: 'ما نقدمه',
        productsText: 'كتالوج من سبعة محاصيل زراعية، مع استقبال الاستفسارات حسب المنتج والكمية والاستخدام المطلوب.',
        commitmentKicker: 'التزامنا للمشترين',
        commitmentTitle: 'تفاصيل صحيحة قبل الوعود',
        commitments: {
          honest: { title: 'وصف صادق', text: 'لا نعرض شهادات أو درجات جودة أو قدرات غير موثقة.' },
          responsive: { title: 'استجابة واضحة', text: 'كل استفسار يتضمن بيانات تساعد على مناقشة الطلب عملياً.' },
          authentic: { title: 'صور أصيلة', text: 'نستخدم صور المنتجات المعتمدة فقط، ونوضح عند غياب الصورة الموثقة.' }
        },
        supplyTitle: 'توريد محلي واستفسارات تصدير',
        supplyText: 'سواء كان طلبكم للسوق السوداني أو استفساراً دولياً، شاركونا المنتج والكمية والتفاصيل لنبدأ المناقشة.',
        ctaTitle: 'تعرفون ما تحتاجونه؟',
        ctaText: 'أرسلوا استفساركم التجاري وسنتابع معكم عبر بيانات الاتصال المقدمة.'
      },
      productsPage: {
        seoTitle: 'المنتجات والخدمات | ود تميم للمحاصيل',
        seoDescription: 'استكشف الصمغ العربي والكركديه والتسالي والسمسم والعرديب والقضيم وصمغ اللبان للاستفسارات التجارية.',
        eyebrow: 'المنتجات والخدمات',
        heroTitle: 'محاصيل سودانية للتوريد التجاري',
        heroText: 'سبعة محاصيل مختارة للتجار والشركات والمشترين. أرسل استفسارك حسب المنتج والكمية دون أسعار ثابتة.',
        catalogKicker: 'كتالوج المحاصيل',
        catalogTitle: 'اختر المنتج المناسب لطلبك',
        catalogText: 'تستخدم المنتجات السبعة صوراً حقيقية مقدمة من العميل ومطابقة لتعيين الأصول المعتمد في دليل الوسائط.',
        photoPending: 'الصورة الموثقة قيد التوفير',
        gumNote: 'الصورة المقدمة تُظهر صمغاً طبيعياً؛ يُرجى تأكيد النوع والدرجة التجارية ضمن الاستفسار.',
        wholesaleTitle: 'استفسارات الكميات التجارية',
        wholesaleText: 'تختلف الكمية والمواصفات والتوفر حسب المنتج والطلب. أرسل التفاصيل للحصول على متابعة مناسبة بدلاً من عرض أسعار قديمة أو غير دقيقة.',
        noPrices: 'لا نعرض أسعاراً ثابتة لأن أسعار المحاصيل قابلة للتغير.'
      },
      products: {
        'gum-arabic': { arName: 'الصمغ العربي', enName: 'Gum Arabic', name: 'الصمغ العربي — Gum Arabic', description: 'صمغ طبيعي من أشجار الأكاسيا، متاح للاستفسارات التجارية مع تأكيد النوع والدرجة المطلوبة.' },
        frankincense: { arName: 'صمغ اللبان', enName: 'Frankincense', name: 'صمغ اللبان — Frankincense', description: 'راتنج عطري طبيعي يُعرض للاستفسارات التجارية حسب الشكل والكمية المطلوبة.' },
        hibiscus: { arName: 'الكركديه', enName: 'Hibiscus', name: 'الكركديه — Hibiscus', description: 'كؤوس كركديه مجففة ذات لون طبيعي، مناسبة لاستفسارات التجار والمشترين بالكميات التجارية.' },
        tasali: { arName: 'التسالي', enName: 'Watermelon Seeds', name: 'التسالي — Watermelon Seeds', description: 'بذور بطيخ سودانية معروفة محلياً بالتسالي، متاحة لمناقشة احتياجات التوريد بالجملة.' },
        tamarind: { arName: 'العرديب', enName: 'Tamarind', name: 'العرديب — Tamarind', description: 'ثمار ولب تمر هندي طبيعي للاستفسارات التجارية حسب الكمية والاستخدام المطلوب.' },
        sesame: { arName: 'السمسم', enName: 'Sesame', name: 'السمسم — Sesame', description: 'بذور سمسم سودانية لاستفسارات التوريد التجاري، مع مناقشة المواصفات المطلوبة لكل سوق.' },
        gudeim: { arName: 'القضيم', enName: 'Gudeim / Grewia Fruit', name: 'القضيم — Gudeim / Grewia Fruit', description: 'ثمار القضيم المرتبطة بأنواع الغروية، متاحة للاستفسار حسب الكمية والشكل المطلوب.' }
      },
      contact: {
        seoTitle: 'تواصل معنا | ود تميم للمحاصيل',
        seoDescription: 'أرسل استفسار توريد محلي أو تصدير إلى ود تميم للمحاصيل عبر النموذج الآمن أو واتساب.',
        eyebrow: 'تواصل معنا',
        heroTitle: 'دعونا نفهم طلبكم التجاري',
        heroText: 'أرسل المنتج والكمية ونوع الاستفسار. لن يُعتبر الإرسال تأكيداً للتوفر أو السعر حتى تتم المراجعة والتواصل.',
        formKicker: 'نموذج الاستفسار',
        formTitle: 'أرسل تفاصيل طلبك',
        formText: 'الحقول المعلّمة بنجمة مطلوبة. تُحفظ الاستفسارات عبر خادم آمن عند اكتمال إعداد Firebase.',
        fullName: 'الاسم الكامل',
        phone: 'رقم الهاتف أو واتساب',
        email: 'البريد الإلكتروني',
        optional: 'اختياري',
        product: 'المنتج',
        chooseProduct: 'اختر منتجاً',
        quantity: 'الكمية المطلوبة',
        quantityPlaceholder: 'مثال: 2 طن أو 50 جوالاً',
        inquiryType: 'نوع الاستفسار',
        domestic: 'توريد محلي',
        export: 'استفسار تصدير',
        message: 'الرسالة أو التفاصيل الإضافية',
        messagePlaceholder: 'اذكر المواصفات أو الوجهة أو الجدول الزمني وأي تفاصيل مهمة.',
        submit: 'إرسال الاستفسار',
        whatsappInstead: 'إرسال التفاصيل عبر واتساب',
        privacy: 'باختيار الإرسال، توافق على استخدام بياناتك للرد على هذا الاستفسار فقط.',
        directKicker: 'تواصل مباشر',
        directTitle: 'نحن قريبون منكم',
        directText: 'يمكنكم الاتصال أو استخدام واتساب أو البريد الإلكتروني لمناقشة استفسار تجاري.',
        businessInfoTitle: 'معلومات الاستفسار',
        businessInfoText: 'يرجى ذكر المنتج والكمية ونوع الطلب لتسهيل المتابعة. لا يمثل التواصل تأكيداً للسعر أو التوفر.',
        successTitle: 'تم حفظ استفسارك',
        successEmailSent: 'تم حفظ الطلب وإرسال إشعار إلى فريق ود تميم. سنتواصل معك عبر البيانات المقدمة.',
        successEmailPending: 'تم حفظ الطلب بنجاح، لكن تعذر إرسال إشعار البريد حالياً. بياناتك محفوظة للمتابعة.',
        errorTitle: 'تعذر إرسال الاستفسار',
        configError: 'خدمة النموذج لم تُضبط بعد. استخدم واتساب أو الهاتف الآن، ثم أكمل إعداد VITE_INQUIRY_ENDPOINT.',
        serverError: 'لم يتم حفظ الاستفسار. يرجى المحاولة مرة أخرى أو استخدام واتساب.',
        requestIdError: 'تعذر بدء الطلب. يرجى تحديث الصفحة والمحاولة مرة أخرى.',
        honeypot: 'اترك هذا الحقل فارغاً',
        website: 'الموقع الإلكتروني',
        validations: {
          nameRequired: 'يرجى إدخال الاسم الكامل.',
          nameLong: 'الاسم أطول من الحد المسموح.',
          phoneRequired: 'يرجى إدخال رقم هاتف أو واتساب صحيح.',
          emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
          productRequired: 'يرجى اختيار المنتج.',
          quantityLong: 'تفاصيل الكمية أطول من الحد المسموح.',
          typeRequired: 'يرجى اختيار نوع الاستفسار.',
          messageRequired: 'يرجى إضافة تفاصيل كافية عن الطلب.',
          messageLong: 'الرسالة أطول من الحد المسموح.'
        },
        whatsappMessage: 'مرحباً ود تميم للمحاصيل،\nالاسم: {{name}}\nالهاتف: {{phone}}\nالمنتج: {{product}}\nالكمية: {{quantity}}\nنوع الاستفسار: {{type}}\nالتفاصيل: {{message}}',
        notProvided: 'غير محدد'
      },
      footer: {
        description: 'توريد المحاصيل الزراعية السودانية بالكميات التجارية للأسواق المحلية واستفسارات التصدير.',
        quickLinks: 'روابط سريعة',
        products: 'محاصيلنا',
        contact: 'بيانات التواصل',
        rights: 'جميع الحقوق محفوظة.',
        note: 'الصور المستخدمة مقدمة من العميل، ولا تدل صور الأجولة على ملكية منشأة محددة.'
      },
      notFound: {
        seoTitle: 'الصفحة غير موجودة | ود تميم للمحاصيل',
        eyebrow: 'خطأ 404',
        title: 'هذه الصفحة ليست في الحصاد',
        text: 'قد يكون الرابط تغير أو لم يعد متاحاً. يمكنكم العودة إلى الرئيسية أو استكشاف المنتجات.',
        home: 'العودة للرئيسية'
      }
    }
  },
  en: {
    translation: {
      brand: { name: 'Wad Tamim for Crops', nameEnglish: 'Wad Tamim for Crops', slogan: 'Pure Crops, Genuine Trust', location: 'Sudan' },
      nav: { home: 'Home', about: 'About Us', products: 'Products & Services', contact: 'Contact Us', quote: 'Request a Quote', openMenu: 'Open menu', closeMenu: 'Close menu', switchLanguage: 'التبديل إلى العربية', lightMode: 'Use light mode', darkMode: 'Use dark mode' },
      common: {
        learnMore: 'Learn More', exploreProducts: 'Explore Our Products', requestQuote: 'Request a Quote', inquire: 'Inquire About This Product', contactUs: 'Contact Us', viewAll: 'View All Products', readMore: 'Discover Our Story', callNow: 'Call Now', whatsapp: 'WhatsApp', email: 'Email', phone: 'Phone & WhatsApp', verifiedPhoto: 'Authentic user-supplied photograph', placeholderLabel: 'Verified photograph not yet available', placeholderHelp: 'This image will be updated when an authentic, approved asset is available.',
        imageAltOperations: 'Crop sacks prepared for commercial supply',
        imageAltMarket: 'Sudanese crop market with sacks in active trade',
        imageAltHibiscus: 'Dried Sudanese hibiscus calyces in a sack',
        imageAltGum: 'Natural Gum Arabic pieces supplied by the customer',
        imageAltFrankincense: 'Natural frankincense resin in a wooden scoop',
        imageAltTasali: 'Sudanese watermelon seeds locally known as tasali',
        imageAltTamarind: 'Natural Sudanese tamarind pods',
        imageAltSesame: 'Sudanese sesame seeds in a sack',
        imageAltGudeim: 'Natural Sudanese Gudeim fruit',
        skipToContent: 'Skip to content', loading: 'Sending...'
      },
      home: {
        seoTitle: 'Wad Tamim for Crops | Sudanese Crop Supply', seoDescription: 'Commercial supply of Sudanese agricultural crops for domestic markets and export inquiries.', eyebrow: 'Sudanese crop supply', heroTitle: 'Authentic Sudanese Crops, From Our Land to Your Markets', heroText: 'At Wad Tamim for Crops, we supply Sudanese agricultural commodities to traders, companies, and buyers, with a focus on commercial quantities, domestic distribution, and export inquiries.', heroNote: 'Domestic supply • Commercial quantities • Export inquiries',
        introKicker: 'Rooted in Sudan', introTitle: 'A close partner for your crop requirements', introText: 'We connect buyers with a diverse range of Sudanese crops through a clear inquiry process—from selecting a product and quantity to discussing supply requirements.', introQuote: 'We approach every inquiry as the start of a commercial relationship built on clarity and trust.',
        productsKicker: 'Our selection', productsTitle: 'Crops for different markets', productsText: 'Explore our range and send the quantity and specifications you need for focused follow-up.', whyKicker: 'Why Wad Tamim', whyTitle: 'Agricultural trade with a professional approach',
        reasons: { source: { title: 'Sudanese origin', text: 'A clear focus on Sudanese crops and the markets seeking them.' }, scale: { title: 'Commercial quantities', text: 'Inquiries from traders and companies about quantities and supply requirements.' }, care: { title: 'Direct communication', text: 'Clear channels by phone, WhatsApp, and email for each request.' }, flexible: { title: 'Domestic & export', text: 'Support for supply inquiries inside Sudan and from international buyers.' } },
        wholesaleKicker: 'Wholesale supply', wholesaleTitle: 'Quantity and specifications start with your needs', wholesaleText: 'Tell us the product, requested quantity, and inquiry type. The Wad Tamim team reviews your details and contacts you to discuss availability and next steps.',
        flow: { product: { number: '01', title: 'Choose a crop', text: 'Select the right product from our catalog.' }, details: { number: '02', title: 'Share the details', text: 'Send the quantity, intended use, or specifications.' }, discuss: { number: '03', title: 'Discuss supply', text: 'We contact you to review the request and next steps.' } },
        marketsKicker: 'From domestic trade to export inquiries', marketsTitle: 'Commercial inquiries with a clear direction', domesticTitle: 'Domestic Supply', domesticText: 'For companies, traders, and buyers inside Sudan seeking commercial crop quantities.', exportTitle: 'Export Inquiries', exportText: 'For international buyers looking to discuss products, quantities, and commercial requirements.', galleryKicker: 'Inside the crop trade', galleryTitle: 'Authentic storage and market photographs', galleryText: 'Customer-supplied scenes showing crop sacks and market activity. These images do not claim ownership of a specific facility.', ctaTitle: 'Have a specific request? Let’s start with the details.', ctaText: 'Choose a crop, add the quantity and inquiry type, and send your request through a secure channel.'
      },
      about: {
        seoTitle: 'About Us | Wad Tamim for Crops', seoDescription: 'Learn about Wad Tamim for Crops and its focus on supplying Sudanese agricultural commodities to local and international buyers.', eyebrow: 'About Us', heroTitle: 'Trust begins with clarity about source and demand', heroText: 'Wad Tamim for Crops is a Sudanese supplier focused on connecting local agricultural commodities with the needs of traders, companies, and buyers.', storyKicker: 'Our story', storyTitle: 'Working from the reality of Sudanese agricultural trade', storyText1: 'We focus on supplying a range of Sudanese crops in commercial quantities while welcoming domestic requests and export inquiries.', storyText2: 'We believe a clear conversation about product, quantity, and specifications is the foundation of serious, reliable trade.', missionTitle: 'Our Mission', missionText: 'Make Sudanese crops easier to source through professional communication and clear responses to supply requirements.', visionTitle: 'Our Vision', visionText: 'To make Wad Tamim a trusted name in Sudanese crop trade for domestic markets and international inquiries.', productsTitle: 'What We Offer', productsText: 'A catalog of seven agricultural commodities with inquiries tailored by product, quantity, and intended use.', commitmentKicker: 'Our commitment to buyers', commitmentTitle: 'Accurate details before promises', commitments: { honest: { title: 'Honest presentation', text: 'We do not claim unverified certifications, grades, or capacities.' }, responsive: { title: 'Clear response', text: 'Every inquiry captures the information needed for a practical discussion.' }, authentic: { title: 'Authentic media', text: 'We use only approved product photos and clearly disclose when one is unavailable.' } }, supplyTitle: 'Domestic Supply & Export Inquiries', supplyText: 'Whether your request is for Sudan or an international market, share the crop, quantity, and details to begin the conversation.', ctaTitle: 'Know what you need?', ctaText: 'Send your commercial inquiry and we will follow up through the contact details you provide.'
      },
      productsPage: { seoTitle: 'Products & Services | Wad Tamim for Crops', seoDescription: 'Explore Gum Arabic, Frankincense, Hibiscus, Watermelon Seeds, Tamarind, Sesame, and Gudeim for commercial inquiries.', eyebrow: 'Products & Services', heroTitle: 'Sudanese crops for commercial supply', heroText: 'Seven selected commodities for traders, companies, and buyers. Send an inquiry by product and quantity without relying on fixed prices.', catalogKicker: 'Crop catalog', catalogTitle: 'Choose the product for your request', catalogText: 'All seven products use authentic customer-supplied photographs matched to the approved media manifest.', photoPending: 'Verified product photograph pending', gumNote: 'The supplied photograph shows Gum Arabic; please confirm the commercial species and grade in your inquiry.', wholesaleTitle: 'Commercial quantity inquiries', wholesaleText: 'Quantity, specifications, and availability vary by product and request. Send your details for relevant follow-up instead of relying on outdated or inaccurate pricing.', noPrices: 'We do not display fixed prices because crop markets change.' },
      products: {
        'gum-arabic': { arName: 'الصمغ العربي', enName: 'Gum Arabic', name: 'Gum Arabic — الصمغ العربي', description: 'Natural acacia gum offered for commercial inquiries, with the required species and grade confirmed during review.' },
        frankincense: { arName: 'صمغ اللبان', enName: 'Frankincense', name: 'Frankincense — صمغ اللبان', description: 'Natural aromatic resin available for commercial inquiries by form and requested quantity.' },
        hibiscus: { arName: 'الكركديه', enName: 'Hibiscus', name: 'Hibiscus — الكركديه', description: 'Naturally colored dried roselle calyces for traders and buyers seeking commercial quantities.' },
        tasali: { arName: 'التسالي', enName: 'Watermelon Seeds', name: 'Watermelon Seeds — التسالي', description: 'Sudanese watermelon seeds, locally known as tasali, for wholesale supply discussions.' },
        tamarind: { arName: 'العرديب', enName: 'Tamarind', name: 'Tamarind — العرديب', description: 'Natural tamarind pods and pulp for commercial inquiries by quantity and intended use.' },
        sesame: { arName: 'السمسم', enName: 'Sesame', name: 'Sesame — السمسم', description: 'Sudanese sesame seeds for commercial supply inquiries with market-specific specifications.' },
        gudeim: { arName: 'القضيم', enName: 'Gudeim / Grewia Fruit', name: 'Gudeim / Grewia Fruit — القضيم', description: 'Gudeim fruit associated with Grewia species, available for inquiries by quantity and requested form.' }
      },
      contact: {
        seoTitle: 'Contact Us | Wad Tamim for Crops', seoDescription: 'Send a domestic supply or export inquiry to Wad Tamim for Crops using the secure form or WhatsApp.', eyebrow: 'Contact Us', heroTitle: 'Let us understand your commercial request', heroText: 'Send the product, quantity, and inquiry type. Submission does not confirm availability or pricing until reviewed.', formKicker: 'Inquiry form', formTitle: 'Send your request details', formText: 'Fields marked with an asterisk are required. Inquiries are stored through a secure server after Firebase configuration is complete.', fullName: 'Full name', phone: 'Phone or WhatsApp number', email: 'Email address', optional: 'Optional', product: 'Product', chooseProduct: 'Choose a product', quantity: 'Requested quantity', quantityPlaceholder: 'Example: 2 tonnes or 50 sacks', inquiryType: 'Inquiry type', domestic: 'Domestic Supply', export: 'Export Inquiry', message: 'Message or additional details', messagePlaceholder: 'Include specifications, destination, timing, or any important details.', submit: 'Send Inquiry', whatsappInstead: 'Send Details on WhatsApp', privacy: 'By submitting, you agree that your details may be used only to respond to this inquiry.', directKicker: 'Direct contact', directTitle: 'We are within reach', directText: 'Call, use WhatsApp, or email us to discuss a commercial inquiry.', businessInfoTitle: 'Inquiry information', businessInfoText: 'Include the crop, quantity, and request type to help us respond. Contact does not confirm price or availability.', successTitle: 'Your inquiry was saved', successEmailSent: 'The request was saved and the Wad Tamim team was notified by email. We will use your contact details to follow up.', successEmailPending: 'The request was saved, but the email notification could not be delivered right now. Your details remain stored for follow-up.', errorTitle: 'We could not send the inquiry', configError: 'The form service is not configured yet. Please use WhatsApp or phone now, then configure VITE_INQUIRY_ENDPOINT.', serverError: 'The inquiry was not saved. Please try again or use WhatsApp.', requestIdError: 'The request could not start. Refresh the page and try again.', honeypot: 'Leave this field empty', website: 'Website', validations: { nameRequired: 'Please enter your full name.', nameLong: 'The name is longer than allowed.', phoneRequired: 'Enter a valid phone or WhatsApp number.', emailInvalid: 'Enter a valid email address.', productRequired: 'Please choose a product.', quantityLong: 'The quantity details are longer than allowed.', typeRequired: 'Please select an inquiry type.', messageRequired: 'Please add enough detail about your request.', messageLong: 'The message is longer than allowed.' }, whatsappMessage: 'Hello Wad Tamim for Crops,\nName: {{name}}\nPhone: {{phone}}\nProduct: {{product}}\nQuantity: {{quantity}}\nInquiry type: {{type}}\nDetails: {{message}}', notProvided: 'Not provided'
      },
      footer: { description: 'Sudanese agricultural crops supplied in commercial quantities for domestic markets and export inquiries.', quickLinks: 'Quick Links', products: 'Our Crops', contact: 'Contact', rights: 'All rights reserved.', note: 'Images are customer supplied; sack photographs do not imply ownership of a particular facility.' },
      notFound: { seoTitle: 'Page Not Found | Wad Tamim for Crops', eyebrow: 'Error 404', title: 'This page is not in the harvest', text: 'The link may have changed or is no longer available. Return home or explore our products.', home: 'Back to Home' }
    }
  }
} as const;

const savedLanguage = localStorage.getItem('wad-tamim-language');
const initialLanguage = savedLanguage === 'en' ? 'en' : 'ar';

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'ar',
  interpolation: { escapeValue: false }
});

export default i18n;
