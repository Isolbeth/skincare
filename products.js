var products = [
    // ========== SPF ЗАЩИТА ==========
    {
        brand: "SKIN 1004",
        name: "Madagascar Centella Hyalu-Cica Water-Fit Sun Serum",
        category: "sunscreen",
        skinType: "все типы",
        description: "Химические фильтры нового поколения (обновление раз в 6 часов). Лёгкая текстура, впитывается без следа.",
        details: "Впитывается, пропадает ощущение SPF на лице",
        art: "369794345",
        volume: "50 мл",
        image: "https://i.pinimg.com/1200x/e9/82/50/e9825008e14be1331a99988d587b762f.jpg"
    },
    {
        brand: "Axis-Y",
        name: "Крем с SPF 50 физик солнцезащитный для лица",
        category: "sunscreen",
        skinType: "чувствительная, нормальная",
        description: "Физические фильтры (обновлять каждые 2-3 часа).",
        details: "Для проблемной кожи",
        art: "977964686",
        volume: "50 мл",
        image: "https://img-edg.joomcdn.net/600b7976e04d0c360a523de880676450255bd67e_original.jpeg"
    },
    {
        brand: "Geodemika",
        name: "Солнцезащитный крем для лица с пептидами 50 SPF",
        category: "sunscreen",
        skinType: "сухая, нормальная",
        description: "Старые химические фильтры (обновление раз в 2-3 часа). С пептидами в составе.",
        details: "Многие покупатели отмечали жжение глаз",
        art: "473278353",
        volume: "50 мл",
        image: "https://i.letu.ru/common/img/pim/2026/06/EX_ebf1c95a-1dbd-4d0e-b432-7754e4d1336c.jpg"
    },
    {
        brand: "La Roche-Posay",
        name: "Флюид для лица солнцезащитный SPF 50+",
        category: "sunscreen",
        skinType: "жирная",
        description: "Химические фильтры нового поколения (обновление раз в 6 часов). Лёгкий флюид для жирной кожи.",
        details: "Не применять для проблемной и чувствительной кожи. В составе спирт на втором месте",
        art: "7463999",
        volume: "50 мл",
        image: "https://avatars.mds.yandex.net/i?id=292e4ddbd45bfacb4a1b292d4d482200_l-4080029-images-thumbs&n=13"
    },

    // ========== КРЕМЫ ==========
    {
        brand: "Bioderma",
        name: "Atoderm Ultra Крем питательный для лица и тела",
        category: "cream",
        skinType: "сухая, повреждённая, чувствительная",
        description: "Интенсивно питает и восстанавливает сухую и повреждённую кожу лица и тела.",
        details: "Для атопиков, для людей на ретиноидах идеальный вариант",
        art: "833815224",
        volume: "200 мл",
        image: "https://basket-38.wbbasket.ru/vol8338/part833815/833815224/images/big/6.webp"
    },
    {
        brand: "Maskoholic",
        name: "Крем для лица увлажняющий флюид c гиалуроновой кислотой",
        category: "cream",
        skinType: "жирная, комбинированная",
        description: "Лёгкий увлажняющий флюид с гиалуроновой кислотой для жирной и комбинированной кожи.",
        details: "Гиалуроновая кислота, лёгкая текстура",
        art: "151980593",
        volume: "50 мл",
        image: "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/3454274e-72c0-4b2b-8fa0-f67e276e5ea2"
    },
    {
        brand: "Ла-Кри",
        name: "Эмульсия для лица и тела",
        category: "cream",
        skinType: "сухая, нормальная, чувствительная",
        description: "Эмульсия для ухода за сухой и нормальной кожей лица и тела.",
        details: "Для системных ретиноидов",
        art: "214923323",
        volume: "200 мл",
        image: "https://basket-12.wbbasket.ru/vol1690/part169047/169047538/images/big/1.webp"
    },
    {
        brand: "Innisfree",
        name: "Крем для лица увлажняющий с экстрактом семян зелёного чая",
        category: "cream",
        skinType: "комбинированная, жирная",
        description: "Увлажняющий крем с экстрактом семян зелёного чая, подходит для комбинированной и жирной кожи.",
        details: "Экстракт семян зелёного чая",
        art: "178638600",
        volume: "50 мл",
        image: "https://a.lmcdn.ru/img600x866/M/P/MP002XU00GT0_29925418_1_v4.jpg"
    },

    // ========== ПЕНКИ / ГЕЛИ ДЛЯ УМЫВАНИЯ ==========
    {
        brand: "Geodemika",
        name: "Энзимная пенка для умывания лица увлажняющая уходовая",
        category: "foam",
        skinType: "нормальная, жирная",
        description: "Энзимная пенка для бережного очищения и увлажнения.",
        details: "Бюджетная пенка",
        art: "235906781",
        volume: "150 мл",
        image: "https://www.letu.ru/common/img/pim/2024/12/GT_64489b96-380d-413e-99d8-475608d57dc7.png"
    },
    {
        brand: "Le Santi",
        name: "Гель для умывания лица и тела очищающий",
        category: "foam",
        skinType: "сухая, чувствительная",
        description: "Крем-гель для умывания лица и тела.",
        details: "На системных ретиноидах",
        art: "110372560",
        volume: "200 мл",
        image: "https://www.letu.ru/common/img/pim/2025/02/GT_edc87325-258c-45ac-825c-776c6ab32374.jpg"
    },
    {
        brand: "Round Lab",
        name: "Пенка для умывания лица увлажняющая",
        category: "foam",
        skinType: "все типы, чувствительная",
        description: "Пенка с глубинной морской водой для мягкого очищения.",
        details: "Бюджетная пенка",
        art: "169849321",
        volume: "150 мл",
        image: "https://usmall.ru/image/1182/30/95/7ffc8ce81fac5541278dd1d51ac78919.png"
    },
    {
        brand: "Bioderma",
        name: "Сенсибио Гель для лица очищающий",
        category: "foam",
        skinType: "жирная, комбинированная, нормальная",
        description: "Очищающий гель для жирной и комбинированной кожи.",
        details: "Многие пользователи жалуются на чрезмерную сухость после использования геля",
        art: "77213945",
        volume: "500 мл",
        image: "https://samson-pharma.ru/er-pics/images/goods/417265/main"
    },

    // ========== МИЦЕЛЛЯРНАЯ ВОДА / ГИДРОФИЛЬНОЕ МАСЛО ==========
    {
        brand: "Eveline",
        name: "Гиалуроновая мицеллярная вода Facemed+ 3в1",
        category: "micellar",
        skinType: "чувствительная, сухая",
        description: "Прекрасный вариант за свою цену. Мягко очищает и увлажняет.",
        details: "Гиалуроновая кислота",
        art: "502811621",
        volume: "400 мл",
        image: "https://basket-27.wbbasket.ru/vol5028/part502811/502811621/images/big/1.webp"
    },
    {
        brand: "Bioderma",
        name: "Sensibio H2O AR Мицеллярная вода для кожи лица с покраснениями",
        category: "micellar",
        skinType: "чувствительная, сухая",
        description: "Мицеллярная вода для кожи, склонной к покраснениям.",
        details: "Более дорогой аналог",
        art: "833815058",
        volume: "250 мл",
        image: "https://avatars.mds.yandex.net/i?id=da01a55e3db86e2d1a4185eaec770da9_l-8244520-images-thumbs&n=13"
    },
    {
        brand: "SKIN 1004",
        name: "Гидрофильное масло для лица с центеллой Centella",
        category: "oilcleanser",
        skinType: "сухая",
        description: "Гидрофильное масло с центеллой азиатской. Тщательно смывать!",
        details: "Центелла азиатская",
        art: "162009551",
        volume: "200 мл",
        image: "https://basket-11.wbbasket.ru/vol1620/part162009/162009551/images/big/5.webp"
    }
];