import { StandardizedRecipe } from '../data/recipes';
import { AppLanguage } from './translations';
import {
  RECIPE_TITLES_AM,
  localizeClassificationAm,
  localizeIngredientNameAm,
  localizeStorageAm,
  localizeTempAm,
  localizeTimeAm,
  localizeUnitAm,
  localizeYieldAm,
} from './recipesAm';

export const RECIPE_TITLES_AR: Record<string, string> = {
  // Core Recipes (1-70)
  'victoria-sponge': 'كيك فيكتوريا الإسفنجي الكلاسيكي',
  'angel-food-cake': 'كيك طعام الملائكة (أنجل فود)',
  'pineapple-upside-down-cake': 'كيك الأناناس المقلوب',
  'classic-pound-cake': 'باوند كيك كلاسيكي',
  'coffee-cake-streusel': 'كيك القهوة بطبقة الستريوزل بالقرفة',
  'wacky-cake': 'كيك الشوكولاتة الخالي من البيض والألبان',
  'tres-leches-cake': 'كيك تريس ليتشيز (الحليب الثلاثي)',
  'chocolate-chip-cookies': 'كوكيز رقائق الشوكولاتة الأمريكي',
  'shortbread-fingers': 'بسكويت الشورتبريد بالزبدة',
  'oatmeal-raisin-cookies': 'كوكيز الشوفان والزبيب',
  'fudgy-brownies': 'براونيز الشوكولاتة الغني (فادجي)',
  'lemon-bars': 'مربعات الليمون الحامضة',
  'white-sandwich-bread': 'خبز التوست الأبيض الكلاسيكي',
  'baguette-direct': 'باغيت فرنسي (بالطريقة المباشرة)',
  'wholemeal-bread': 'خبز القمح الكامل الكلاسيكي',
  'soft-bread-rolls': 'لفائف الخبز الطرية',
  'cinnamon-rolls': 'لفائف القرفة (سينامون رولز)',
  'focaccia': 'فوكاشيا إيطالية بزيت الزيتون وإكليل الجبل',
  'brioche': 'خبز البريوش الفرنسي الغني',
  'sourdough-boule': 'خبز الساورودو الحرفي (الخميرة الطبيعية)',
  'neapolitan-pizza-dough': 'عجينة بيتزا نابولي الكلاسيكية',
  'new-york-pizza-dough': 'عجينة بيتزا نيويورك',
  'sicilian-focaccia-pizza': 'بيتزا الفوكاشيا الصقلية',
  'rough-puff-pastry': 'عجينة الباف باستري السريعة',
  'croissants': 'كرواسان بالزبدة المورّقة',
  'danish-pastry-dough': 'عجينة معجنات الدانيش المورّقة',
  'choux-pastry': 'عجينة الشو (بات آ شو)',
  'sweet-shortcrust-pastry': 'عجينة السابليه الحلوة (بات سوكريه)',
  'creme-patissiere': 'كريم باتيسيير (كريمة الحلواني)',
  'creme-anglaise': 'كريم أنجليز (صلصة الكاسترد بالفانيليا)',
  'lemon-curd': 'خثارة الليمون الحامضة (ليمون كيرد)',
  'chocolate-ganache': 'غناش الشوكولاتة الداكنة',
  'italian-meringue': 'الميرانغ الإيطالي',
  'swiss-meringue': 'الميرانغ السويسري',
  'chocolate-mousse': 'موس الشوكولاتة الكلاسيكي',
  'panna-cotta': 'بانا كوتا الفانيليا',
  'creme-brulee': 'كريم بروليه الكلاسيكي',
  'apple-pie': 'فطيرة التفاح الكلاسيكية',
  'lemon-meringue-pie': 'فطيرة الليمون بالميرانغ',
  'baked-cheesecake': 'تشيز كيك مخبوز بالفانيليا',
  'caramel-sauce': 'صلصة الكراميل المملح أو الكلاسيكي',
  'salted-caramels': 'حلوى الكراميل المملح الطرية',
  'peanut-brittle': 'بريتل الفول السوداني المقرمش',
  'chocolate-truffles': 'ترافلز الشوكولاتة الداكنة',
  'vanilla-fudge': 'فادج الفانيليا الكلاسيكي',
  'marshmallows': 'مارشميلو الفانيليا المنزلي',
  'chocolate-bark': 'ألواح الشوكولاتة بالمكسرات والفواكه المجففة',
  'tiramisu': 'تيراميسو إيطالي كلاسيكي',
  'baklava': 'بقلاوة مقرمشة بالمكسرات والقطر',
  'churros': 'تشوروس إسباني مقرمش بالقرفة والسكر',
  'madeleines': 'مادلين فرنسي بالزبدة والليمون',
  'macarons-french': 'ماكارون فرنسي باللوز',
  'cannoli': 'كانولي صقلي بحشوة الريكوتا',
  'vanilla-buttercream': 'كريمة الزبدة بالفانيليا الكلاسيكية',
  'blueberry-muffins': 'مافن التوت الأزرق الكلاسيكي',
  'classic-pizza-sauce': 'صلصة البيتزا الإيطالية الكلاسيكية',
  'classic-quiche-lorraine': 'كيش لورين الكلاسيكي',
  'flaky-shortcrust-pastry': 'عجينة التارت المكسّرة الهشّة',
  'rich-chocolate-fudge-cake': 'كيك فادج الشوكولاتة الغني',
  'creme-chantilly': 'كريم شانتيه (كريمة مخفوقة)',
  'creme-legere': 'كريم ليجير (كريم باتيسيير مخفّف)',
  'creme-diplomate': 'كريم ديبلومات',
  'creme-mousseline': 'كريم موسلين بالزبدة',
  'creme-chiboust': 'كريم شيبوست بالميرانغ الإيطالي',
  'creme-bavaroise': 'كريم بافارواز',
  'creme-damande': 'كريم اللوز (كريم دآماند)',
  'frangipane': 'حشوة الفرانجيبان باللوز',
  'ganache-montee': 'غناش مونتيه (غناش مخفوق)',
  'creme-namelaka': 'كريم ناميلاكا بالشوكولاتة',
  'creme-cremeux': 'كريم كريميو الشوكولاتة',
  'creme-fraiche': 'كريم فريش المخمّرة',
  'mascarpone-cream': 'كريمة الماسكاربوني (كريمة التيراميسو)',
  'lemon-drizzle-cake': 'كيك الليمون بالقطر المقرمش',
  'red-velvet-cake': 'كيك ريد فيلفيت المخملي الأحمر',
  'gingerbread-biscuits': 'بسكويت الزنجبيل المتبّل',
  'ambasha': 'خبز أمباشا الاحتفالي الإثيوبي',
  'himbasha': 'خبز هيمباشا الحلو الإثيوبي',
  'gluten-free-white-sandwich-bread': 'خبز التوست الأبيض الخالي من الغلوتين',
  'gluten-free-chocolate-cake': 'كيك الشوكولاتة الخالي من الغلوتين',
  'vegan-chocolate-cake': 'كيك الشوكولاتة النباتي',
  'pita-bread': 'خبز البيتا المنفوخ (الخبز العربي)',
  'naan-bread': 'خبز النان الهندي باللبن',
  'full-puff-pastry': 'عجينة الباف باستري الكلاسيكية الكاملة',

  // Expanded Breads & Pizza
  'baguette-de-tradition': 'باغيت التقاليد الفرنسي',
  'batard': 'خبز الباتار الفرنسي',
  'ciabatta': 'خبز التشاباتا الإيطالي',
  'focaccia-barese': 'فوكاشيا باريزي بالبطاطا والطماطم',
  'brioche-nanterre': 'بريوش نانتير في القالب',
  'japanese-milk-bread': 'خبز الحليب الياباني (شوكوبان)',
  'pain-de-mie': 'خبز بان دو مي الفرنسي الطري',
  'pain-viennois': 'خبز فيينوا الطري بالحليب',
  'bagels': 'خبز البيغل المسلوق والمخبوز',
  'burger-buns': 'خبز البرغر الطري (بطاطس/بريوش)',
  'soft-dinner-rolls': 'لفائف العشاء الطرية',
  'milk-bread-rolls': 'لفائف خبز الحليب الطرية',
  'pandesal': 'خبز البانديسال الفلبيني الطري',
  'challah': 'خبز الحلة المضفور',
  'zopf': 'خبز التسوبف السويسري المضفور بالزبدة',
  'pulla': 'خبز البولا الفنلندي بالهيل',
  'cozonac': 'خبز الكوزوناك الروماني بالجوز والكاكاو',
  'scali-bread': 'خبز سكالي الإيطالي بالسمسم',
  'cottage-loaf': 'رغيف الكوتيج الإنجليزي المزدوج',
  'bloomer-loaf': 'خبز البلومر البريطاني',
  'barmbrack': 'خبز بارمبراك الأيرلندي بالفواكه المجففة',
  'oatmeal-bread': 'خبز الشوفان والعسل',
  'semolina-bread': 'خبز السميد الإيطالي بالسمسم',
  'potato-bread': 'خبز البطاطا الطري',
  'anadama-bread': 'خبز أناداما بدقيق الذرة والدبس',
  'multigrain-bread': 'خبز الحبوب المتعددة والبذور',
  'dark-rye-bread': 'خبز الجاودار الداكن',
  'pumpernickel': 'خبز البومبرنيكل الألماني الكامل',
  'vollkornbrot': 'خبز فولكورن بروت بالحبوب الكاملة',
  'whole-wheat-baguette': 'باغيت القمح الكامل',
  'sourdough-baguette': 'باغيت الساورودو بالخميرة الطبيعية',
  'sourdough-rye-bread': 'خبز الجاودار والساورودو (ميشبروت)',
  'pane-toscano': 'خبز توسكانا الخالي من الملح',
  'pane-pugliese': 'خبز بوليا الإيطالي عالي الترطيب',
  'pan-de-cristal': 'خبز الكريستال الإسباني فائق الهشاشة',
  'hallulla': 'خبز هالولا التشيلي التقليدي',
  'kubaneh': 'خبز الكوبانة اليمني المورّق',
  'bao-buns': 'خبز الباو المطهو على البخار',
  'soft-pretzels': 'بريتزل طري بالمحلول القلوي',
  'anpan': 'خبز أنبان الياباني بحشوة الفاصوليا الحمراء',
  'melon-pan': 'خبز ميلون بان الياباني بقشرة البسكويت',
  'pineapple-buns': 'خبز الأناناس (بو لو باو)',
  'garlic-bread-knots': 'عقد الخبز بالثوم والأعشاب',
  'ethiopian-honey-bread': 'خبز العسل والحليب الإثيوبي',
  'difo-dabo': 'خبز ديفو دابو الإثيوبي المخبوز على أوراق الموز',
  'khachapuri': 'خاتشابوري أجارولي بالجبن والبيض',
  'khachapuri-imeruli': 'خاتشابوري إيميرولي المحشو بالجبن',
  'turkish-pide': 'بيده تركية بالجبن واللحم',
  'lahmacun': 'لحم بعجين تركي رقيق مقرمش',
  'manakish': 'مناقيش بالزعتر وزيت الزيتون',
  'taboon-bread': 'خبز الطابون الفلسطيني',
  'soft-flour-tortillas': 'تورتيلا الدقيق الطرية',
  'injera': 'إنجيرا مخمّرة بدقيق التيف',
  'pan-pizza-dough': 'عجينة بيتزا الصاج السميكة',
  'thin-crust-pizza-dough': 'عجينة البيتزا رقيقة القشرة',
  'calzone': 'كالزوني إيطالي محشو ومطوي',
  'pizza-bianca': 'بيتزا بيانكا الرومانية البيضاء',
  'detroit-style-pizza': 'بيتزا على طريقة ديترويت',
  'grandma-pie': 'بيتزا غراندما الصقلية الرقيقة',
  'pizza-fritta': 'بيتزا فريتا النابولية المقلية',
  'pizza-margherita': 'بيتزا مارغريتا الكلاسيكية',
  'pizza-marinara': 'بيتزا مارينارا بالثوم والأوريغانو',
  'stromboli': 'سترومبولي ملفوفة بالجبن واللحوم',
  'pizza-capricciosa': 'بيتزا كابريتشوزا بالخرشوف والفطر',
  'pizza-diavola': 'بيتزا ديافولا الحارة',
  'pizza-puttanesca': 'بيتزا بوتانيسكا بالزيتون والكبر',
  'pizza-quattro-formaggi': 'بيتزا الأجبان الأربعة',
  'pizza-boscaiola': 'بيتزا بوسكايولا بالفطر والسجق',
  'sausage-and-kale-pizza': 'بيتزا السجق والكرنب',
  'pizza-al-taglio': 'بيتزا آل تاليو الرومانية المربعة',
  'pizza-funghi': 'بيتزا الفطر البري',
  'pizza-prosciutto-e-rucola': 'بيتزا البروشوتو والجرجير',
  'focaccia-sandwich': 'فوكاشيا ساندويتش (سكياتشاتا)',
  'pizzette': 'بيتزيتا صغيرة للمناسبات',
  'mushroom-truffle-pizza': 'بيتزا الفطر وزيت الكمأة',
  'pizza-salsiccia-e-friarielli': 'بيتزا السجق الإيطالي والخضار الورقية',
  'pissaladiere': 'بيسالاديير بالبصل المكرمل والأنشوجة والزيتون',

  // Expanded Cakes & Dietary
  'almond-flour-cookies': 'كوكيز دقيق اللوز الخالي من الغلوتين',
  'vegan-banana-bread': 'خبز الموز النباتي',
  'dairy-free-scones': 'اسكونز خالي من الألبان',
  'pao-de-queijo': 'باو دي كيجو (خبز الجبن البرازيلي)',
  'orange-polenta-cake': 'كيك البرتقال ودقيق الذرة (البولينتا)',
  'lemon-polenta-cake': 'كيك الليمون ودقيق الذرة',
  'torta-caprese': 'تورتا كابريزي بالشوكولاتة واللوز',
  'flourless-chocolate-cake': 'كيك الشوكولاتة الخالي من الدقيق',
  'almond-and-orange-cake': 'كيك اللوز والبرتقال الكامل',
  'carrot-cake': 'كيك الجزر بالتوابل وكريمة الجبن',
  'coffee-walnut-cake': 'كيك القهوة والجوز',
  'banana-cake': 'كيك الموز الطري',
  'swiss-roll': 'سويسرول المربى والكريمة',
  'rich-fruit-cake': 'كيك الفواكه المجففة الغني',
  'black-forest-cake': 'كيك الغابة السوداء بالكرز والشوكولاتة',
  'opera-cake': 'كيك الأوبرا الفرنسي بالقهوة والغناش',
  'hummingbird-cake': 'كيك الطائر الطنان بالموز والأناناس والبقان',
  'tiramisu-cake': 'كيك التيراميسو بالماسكاربوني',
  'battenberg-cake': 'كيك باتنبرغ بالمرزيبان',
  'sacher-torte': 'زاخر تورت النمساوي بالشوكولاتة والمشمش',
  'madeira-cake': 'كيك ماديرا بالليمون',
  'coconut-cake': 'كيك جوز الهند الكريمي',
  'pistachio-cake': 'كيك الفستق الحلبي',
  'japanese-cotton-cheesecake': 'تشيز كيك القطن الياباني الهش',
  'simnel-cake': 'كيك سيمنل بالمرزيبان والفواكه',
  'lamingtons': 'لامينغتون الأسترالي بالشوكولاتة وجوز الهند',
  'gateau-basque': 'غاتو باسك بحشوة كريمة الباتيسيير',
  'lemon-olive-oil-cake': 'كيك الليمون وزيت الزيتون البكر',
  'dobos-torte': 'دوبوش تورت المجري بالكراميل والشوكولاتة',
  'kladdkaka': 'كلادكاكا (كيك الشوكولاتة السويدي اللزج)',
  'devils-food-cake': 'كيك طعام الشيطان بالشوكولاتة الداكنة',
  'coconut-and-lime-cake': 'كيك جوز الهند والليمون الأخضر',
  'prinsesstarta': 'كيك الأميرة السويدي بالمرزيبان الأخضر',
  'marble-cake': 'كيك الرخام بالفانيليا والشوكولاتة',
  'chiffon-cake': 'كيك الشيفون الخفيف',
  'boston-cream-pie': 'فطيرة بوسطن الكريمية بالغاناش',
  'caramel-layer-cake': 'كيك الطبقات بالكراميل',
  'pecan-layer-cake': 'كيك الطبقات بجوز البقان',
  'parsnip-and-maple-cake': 'كيك الجزر الأبيض وشراب القيقب',
  'guinness-chocolate-cake': 'كيك الشوكولاتة الداكنة بالشعير المحمّص',
  'genoise-sponge': 'إسفنجة الجنواز الفرنسية الكلاسيكية',
  'gateau-moka': 'غاتو موكا بكريمة زبدة القهوة',
  'strawberry-shortcake': 'كيك الفراولة الياباني بالكريمة',
  'chocolate-orange-cake': 'كيك الشوكولاتة والبرتقال',
  'walnut-cake': 'كيك الجوز الكلاسيكي',
  'beetroot-chocolate-cake': 'كيك الشوكولاتة بالشمندر الأحمر',
  'hazelnut-cake': 'كيك البندق الإيطالي (تورتا دي نوتشولي)',
  'white-chocolate-mud-cake': 'كيك الشوكولاتة البيضاء الكثيف',
  'banana-and-walnut-loaf': 'كيك الموز والجوز في القالب',
  'blackberry-and-apple-cake': 'كيك التوت الأسود والتفاح',
  'pear-and-almond-cake': 'كيك الكمثرى واللوز',
  'sernik': 'سيرنيك (تشيز كيك الجبن البولندي)',
  'bienenstich': 'كيك لدغة النحلة باللوز والعسل والكاسترد',
  'bran-muffins': 'مافن النخالة والعسل',
  'classic-scones': 'اسكونز إنجليزي كلاسيكي بالزبدة',
  'cheese-and-herb-scones': 'اسكونز بالجبن والأعشاب',
  'irish-soda-bread': 'خبز الصودا الأيرلندي باللبن الرائب',
  'soda-farls': 'خبز الصودا فارلز على الصاج',
  'cornbread': 'خبز الذرة في المقلاة الحديدية',
  'savoury-cheese-and-chive-muffins': 'مافن مالح بالجبن والثوم المعمر',
  'yorkshire-puddings': 'يوركشاير بودينغ المنتفخ',

  // Expanded Pastry & Cookies
  'eclairs': 'إكلير الشوكولاتة بكريم باتيسيير',
  'filo-apple-cigars': 'أصابع الفيلو المقرمشة بالتفاح والقرفة',
  'palmiers': 'بالمييه (أذان الفيل) بالباف باستري والسكر',
  'hazelnut-and-chocolate-palmiers': 'بالمييه بالبندق والشوكولاتة',
  'kouign-amann': 'كوين أمان البريتوني بالزبدة المكرملة',
  'caneles': 'كانوليه دو بوردو بالفانيليا',
  'croissant-aux-amandes': 'كرواسان محشو بكريمة اللوز (ألموند كرواسان)',
  'mille-feuille': 'ميل فوي (نابليون) بالكريم ديبلومات',
  'paris-brest': 'باري بريست بكريمة البرالين والبندق',
  'apple-strudel': 'فطيرة التفاح النمساوية (آبل شترودل)',
  'beignets': 'بينييه مقلي بالسكر البودرة',
  'vol-au-vent': 'فول أو فان (أكواب باف باستري مجوفة)',
  'croquembouche': 'كروكمبوش (برج البروفيترول بالكراميل)',
  'choux-swans': 'بجع عجينة الشو بالكريمة',
  'puits-damour': 'بوي دامور بالكريم شيبوست المكرمل',
  'bichon-au-citron': 'بيشون أو سيترون بعجينة الباف وخثارة الليمون',
  'chaussons-aux-pommes': 'فطائر التفاح المورّقة (شوسون أو بوم)',
  'cornetti': 'كورنيتي إيطالي بالحمضيات والفانيليا',
  'sfogliatelle': 'سفولياتيلي ريتشي النابولية بالريكوتا',
  'apple-galette': 'غاليت التفاح الريفية',
  'tarte-aux-pommes': 'تارت التفاح الفرنسي الكلاسيكي',
  'friands': 'فرياند فرنسي باللوز والتوت والزبدة البنية',
  'cream-puffs': 'كريم بافس (شو آ لا كريم)',
  'danish-braid': 'ضفيرة الدانيش بالكاسترد والمكسرات',
  'vanilla-slice': 'شريحة الفانيليا بالكاسترد (فانيليا سلايس)',
  'fondant-fancies': 'فوندان فانسيز المغطى بالسكر',
  'mini-fruit-tarts': 'تارت الفواكه المصغّر بالكريم باتيسيير',
  'puff-pastry-pinwheels': 'مراوح الباف باستري الحلوة والمالحة',
  'strawberry-tartlets': 'تارتليت الفراولة الطازجة',
  'chocolate-tartlets': 'تارتليت غناش الشوكولاتة الداكنة',
  'pear-frangipane-tart': 'تارت الكمثرى والفرانجيبان (بوردالو)',
  'galette-des-rois': 'غاليت الملوك بالباف باستري والفرانجيبان',
  'pithiviers': 'بيتيفييه باللوز والزبدة',
  'cheese-straws': 'أعواد الجبن المورّقة المقرمشة',
  'gougeres': 'غوجير (فطائر الشو بالجبن والغرويير)',
  'pain-au-chocolat': 'بان أو شوكولا (شوكولاتين)',
  'pain-aux-raisins': 'لفائف الكاسترد والزبيب المورّقة',
  'chelsea-buns': 'لفائف تشيلسي بالكشمش والقرفة',
  'yeast-doughnuts': 'دونات الخميرة الطرية المقلية',
  'custard-danish-pinwheels': 'دانيش الكاسترد الحلزوني',
  'cruffins': 'كرافن (كرواسان مخبوز في قالب المافن)',
  'kanelbullar': 'لفائف القرفة والهيل السويدية (كانيلبولار)',
  'almond-biscotti': 'بيسكوتي اللوز الإيطالي المقرمش (كانتوتشي)',
  'coconut-macaroons': 'ماكرون جوز الهند المقرمش',
  'blondies': 'بلونديز بالزبدة البنية والشوكولاتة البيضاء',
  'flapjacks': 'ألواح الشوفان بالعسل والقطر الذهبي',
  'snickerdoodles': 'كوكيز سنيكر دودلز بالقرفة',
  'thumbprint-cookies': 'كوكيز المربى ببصمة الإبهام',
  'linzer-cookies': 'بسكويت لينتزر بالبندق ومربى التوت',
  'chocolate-chip-cookie-bars': 'قوالب كوكيز رقائق الشوكولاتة',
  'brown-butter-chocolate-chip-cookies': 'كوكيز رقائق الشوكولاتة بالزبدة البنية',
  'pistachio-and-cranberry-cookies': 'كوكيز الفستق والتوت البري',
  'date-bars': 'مربعات التمر والشوفان المقرمشة',
  'coconut-snowballs': 'كرات الثلج بجوز الهند واللوز',
  'alfajores': 'ألفاخوريس الأرجنتينية بدولسي دي ليتشي',
  'anzac-biscuits': 'بسكويت أنزاك بالشوفان وجوز الهند',
  'viennese-whirls': 'بسكويت فيينا المتموّج بالكريمة والمربى',
  'whoopie-pies': 'ووبي باي بالشوكولاتة وكريمة المارشميلو',
  'tuiles': 'تويل اللوز المقرمش الرقيق',
  'florentines': 'فلورنتين باللوز المقرمش والشوكولاتة',
  'empire-biscuits': 'بسكويت الإمبراطورية الإسكتلندي بالمربى',
  'jam-sandwich-biscuits': 'بسكويت الساندويتش المحشو بالمربى',
  'coconut-and-raspberry-slices': 'شرائح جوز الهند والتوت الأحمر',
  'rocky-road': 'روكي رود بالشوكولاتة والمارشميلو والبسكويت',
  'peanut-butter-cookies': 'كوكيز زبدة الفول السوداني',
  'chocolate-crinkle-cookies': 'كوكيز الشوكولاتة المتشققة بالسكر البودرة',
  'millionaires-shortbread': 'شورتبريد المليونير بالكراميل والشوكولاتة',
  'stroopwafels': 'ستروب وافل الهولندي بالكراميل',
  'speculoos': 'بسكويت سبيكولوس البلجيكي بالتوابل',
  'molasses-crinkle-cookies': 'كوكيز الدبس والزنجبيل المتشققة',
  'chocolate-dipped-shortbread-fingers': 'أصابع الشورتبريد المغطسة بالشوكولاتة',
  'hazelnut-biscotti': 'بيسكوتي البندق المحمّص والشوكولاتة',
  'coconut-chocolate-bars': 'ألواح جوز الهند المغطاة بالشوكولاتة',
  'lemon-shortbread': 'شورتبريد الليمون المنعش',
  'cherry-and-almond-bars': 'قوالب الكرز واللوز بالفرانجيبان',
  'black-and-white-cookies': 'كوكيز الأبيض والأسود النيويوركية',
  'hermit-cookies': 'كوكيز هيرميت بالتوابل والفواكه المجففة',
  'peppermint-bark-cookies': 'كوكيز الشوكولاتة والنعناع',
  'cardamom-shortbread': 'شورتبريد الهيل الفاخر',
  'matcha-white-chocolate-cookies': 'كوكيز الماتشا والشوكولاتة البيضاء',
  'maple-pecan-cookies': 'كوكيز القيقب وجوز البقان',
  'chocolate-oat-cookies': 'كوكيز الشوفان والكاكاو',
  'lemon-ricotta-cookies': 'كوكيز الريكوتا والليمون الطرية',
  'brown-sugar-shortbread': 'شورتبريد بالسكر البني',
  'fruit-and-nut-cookies': 'كوكيز الفواكه المجففة والمكسرات',
  'chocolate-fudge-bars': 'قوالب فادج الشوكولاتة الغنية',
  'coconut-and-lime-bars': 'قوالب جوز الهند والليمون الأخضر',
  'maamoul': 'معمول السميد بالتمر أو المكسرات',
  'ghraybeh': 'غريبة شامية بالسمن والفستق',
  'rugelach': 'روغيلاخ بقشرة الجبن الكريمي والمكسرات',
  'hamantaschen': 'معجنات مثلثة محشوة بالمربى أو الخشخاش',
  'brookie': 'بروكي (طبقات البراوني والكوكي)',

  // Expanded Pies, Desserts & Confections
  'steak-pie': 'فطيرة اللحم البقري المطهو',
  'sausage-rolls': 'لفائف السجق بالأعشاب في الباف باستري',
  'lemon-tart': 'تارت الليمون الفرنسي (تارت أو سيترون)',
  'chocolate-tart': 'تارت الشوكولاتة الداكنة (تارت أو شوكولا)',
  'spinach-and-feta-filo-pie': 'فطيرة السبانخ وجبن الفيتا برقائق الفيلو',
  'tarte-tatin': 'تارت تاتان بالتفاح المكرمل المقلوب',
  'pecan-pie': 'فطيرة جوز البقان بالكراميل',
  'key-lime-pie': 'فطيرة الليمون الأخضر (كي لايم باي)',
  'treacle-tart': 'تارت القطر الذهبي البريطانية',
  'empanadas': 'إمباناداس محشوة باللحم أو الجبن',
  'spanakopita': 'سباناكوبيتا مثلثات السبانخ اليونانية',
  'samosas': 'سمبوسة البطاطس المتبّلة والبازلاء',
  'cornish-pasty': 'فطيرة كورنيش باللحم والخضار',
  'cheese-and-onion-pasties': 'فطائر الجبن والبصل المقرمشة',
  'pigs-in-blankets': 'نقانق ملفوفة بعجينة الباف باستري',
  'tarte-au-citron-meringuee': 'تارت الليمون بالميرانغ المحمّر',
  'raspberry-tart': 'تارت التوت الأحمر بكريم الباتيسيير',
  'cheese-and-bacon-turnovers': 'فطائر مثلثة بالجبن واللحم المدخّن',
  'sausage-plait': 'ضفيرة السجق بالباف باستري',
  'spinach-and-ricotta-rolls': 'لفائف السبانخ وجبن الريكوتا',
  'arancini': 'أرانشيني (كرات الأرز الإيطالية المحشوة المقلية)',
  'tarte-au-sucre': 'تارت السكر البني والكريمة',
  'borek': 'بوريك تركي ملفوف بالجبن والسبانخ',
  'sticky-toffee-pudding': 'بودينغ التمر بصلصة التوفي الساخنة',
  'creme-caramel': 'كريم كراميل كلاسيكي',
  'bread-and-butter-pudding': 'بودينغ البريوش والزبدة بالكاسترد',
  'apple-crumble': 'كرامبل التفاح بالشوفان والزبدة',
  'no-bake-cheesecake': 'تشيز كيك بارد بدون خبز بالفانيليا والتوت',
  'clafoutis': 'كلافوتي الكرز الفرنسي المخبوز',
  'chocolate-fondant': 'فوندان الشوكولاتة بقلب منصهر (لافا كيك)',
  'lemon-posset': 'بوسيت الليمون الكريمي البارد',
  'rice-pudding': 'أرز بالحليب كلاسيكي بالقرفة والفانيليا',
  'floating-islands': 'الجزر العائمة (إيل فلوتانت)',
  'chocolate-marquise': 'ماركيز الشوكولاتة البارد',
  'peach-melba': 'خوخ ميلبا مع الآيس كريم وصلصة التوت',
  'mango-sticky-rice': 'أرز المانغو التايلاندي بحليب جوز الهند',
  'chocolate-budino': 'بودينو الشوكولاتة الإيطالي',
  'butterscotch-pudding': 'بودينغ البترسكوتش بالسكر البني',
  'coffee-panna-cotta': 'بانا كوتا بالقهوة والإسبريسو',
  'peach-cobbler': 'كوبلر الخوخ المتبّل',
  'banana-pudding': 'بودينغ الموز بالكاسترد والبسكويت',
  'chocolate-pot-de-creme': 'بو دو كريم بالشوكولاتة الحريرية',
  'blueberry-clafoutis': 'كلافوتي التوت الأزرق',
  'pouding-chomeur': 'بودينغ شراب القيقب الكيبيكي',
  'pavlova': 'بافلوفا الميرانغ المقرمش بالكريمة والفواكه',
  'eton-mess': 'إيتون ميس بالميرانغ والفراولة والكريمة',
  'banoffee-pie': 'فطيرة البانوفي بالموز والكراميل',
  'chocolate-souffle': 'سوفليه الشوكولاتة الساخن',
  'profiteroles': 'بروفيترول بالآيس كريم وصلصة الشوكولاتة',
  'treacle-sponge-pudding': 'بودينغ الإسفنج بالقطر الذهبي المطهو بالبخار',
  'semifreddo': 'سيميفريدو الفانيليا والعسل واللوز',
  'zabaglione': 'زاباليوني إيطالي مخفوق دافئ',
  'poached-pears-in-red-wine': 'كمثرى مسلوقة بالتوابل وشراب العنب',
  'summer-pudding': 'بودينغ التوت الصيفي البريطاني',
  'rum-baba': 'بابا أو رام المشربة بالقطر والكريمة',
  'mango-cheesecake': 'تشيز كيك المانغو الاستوائي',
  'lemon-syllabub': 'سيليباب الليمون الكريمي المخفوق',
  'coeur-a-la-creme': 'كور آ لا كريم بالجبن الطازج والكريمة',
  'baked-ricotta-cheesecake': 'تشيز كيك الريكوتا الإيطالي المخبوز',
  'apple-charlotte': 'شارلوت التفاح بالبريوش المحمّص',
  'chocolate-bread-and-butter-pudding': 'بودينغ الخبز والزبدة بالشوكولاتة',
  'rhubarb-crumble': 'كرامبل الراوند والزنجبيل',
  'mango-sorbet': 'سوربيه المانغو المنعش الخالي من الألبان',
  'vanilla-ice-cream': 'آيس كريم الفانيليا الفرنسي بالكاسترد',
  'chocolate-semifreddo': 'سيميفريدو الشوكولاتة الداكنة',
  'baked-alaska': 'بيكد ألاسكا بالميرانغ المحمّر',
  'flan': 'فلان الكراميل الإسباني',
  'brigadeiros': 'ترافلز البريغاديرو البرازيلية بالشوكولاتة',
  'loukoumades': 'لقيمات يونانية بالعسل والجوز (عوامات)',
  'cream-cheese-frosting': 'تغطية الجبن الكريمي الكلاسيكية',
  'apricot-glaze': 'طلاء المشمش اللامع (ناباج)',
  'chocolate-glaze': 'طلاء الشوكولاتة اللامع القابل للصب',
  'salted-caramel-sauce': 'صلصة الكراميل المملح',
  'dulce-de-leche': 'دولسي دي ليتشي (كراميل الحليب)',
  'beurre-noisette': 'الزبدة البنية البندقية (بور نوازيت)',
  'caramel-syrup': 'قطر الكراميل الكهرماني للتنكيه',
  'kirsch-syrup': 'قطر التشريب بالكرز للكيك الإسفنجي',
  'toasted-breadcrumbs': 'فتات الخبز المحمّص بالزبدة للشترودل',
  'stabilized-whipped-cream': 'كريمة مخفوقة مثبّتة بالجيلاتين للتزيين',
  'mirror-glaze': 'طلاء المرآة اللامع (غلاساج ميروار)',
  'chocolate-decorations': 'زخارف الشوكولاتة المعدّلة حرارياً',
  'craquelin': 'طبقة الكراكلين المقرمشة لعجينة الشو',
  'praline': 'معجون البرالين بالبندق واللوز',
  'streusel-topping': 'طبقة الستريوزل المقرمشة بالزبدة والسكر',
  'pistachio-paste': 'معجون الفستق الحلبي المركز للحلويات',
  'caramelised-white-chocolate': 'الشوكولاتة البيضاء المكرملة (الشوكولاتة الشقراء)',
  'tahini-halva': 'حلاوة طحينية بالسمسم',
  'turkish-delight': 'راحة الحلقوم التركية بالورد والفستق',
  'nougat': 'نوغا مونتيليمار بالعسل واللوز',
  'dabo-kolo': 'دابو كولو (لقيمات عجين متبّلة إثيوبية مقرمشة)',
  'pastel-de-nata': 'باستيل دي ناتا (تارت الكاسترد البرتغالي)',
  'gulab-jamun': 'غولاب جامون الهندي بقطر الهيل والورد',
  'melktert': 'ميلكتيرت (تارت الحليب والقرفة الجنوب أفريقي)',
  'poffertjes': 'بوفيرتجيس (فطائر هولندية صغيرة بدقيق الحنطة السوداء)',
  'kolache': 'كولاتشي تشيكي محشو بالفاكهة والجبن',
  'medovik': 'كيك العسل الروسي متعدد الطبقات (ميدوفيك)',
  'qatayef': 'قطايف مشوية محشوة بالقشطة أو الجوز',
};

const UNIT_AR: Record<string, string> = {
  g: 'غ',
  kg: 'كغ',
  ml: 'مل',
  L: 'لتر',
  l: 'لتر',
  rings: 'حلقات',
  sheets: 'شرائح',
  cloves: 'فصوص',
  eggs: 'بيض',
  large: 'كبير',
  pcs: 'قطعة',
  piece: 'قطعة',
  pieces: 'قطع',
  sprigs: 'أغصان',
  pinch: 'رشة',
  'to taste': 'حسب الرغبة',
};

export function localizeUnit(unit: string, lang: AppLanguage): string {
  if (lang === 'am') return localizeUnitAm(unit);
  if (lang !== 'ar') return unit;
  return UNIT_AR[unit] || UNIT_AR[unit.toLowerCase()] || unit;
}

export function localizeTemp(temp: string, lang: AppLanguage): string {
  if (lang === 'am') return localizeTempAm(temp);
  if (lang !== 'ar') return temp;
  return temp
    .replace(/°C/g, '°م')
    .replace(/Room temperature/gi, 'درجة حرارة الغرفة')
    .replace(/No bake \(chilled\)/gi, 'بدون خبز (مبرد)')
    .replace(/No bake/gi, 'بدون خبز')
    .replace(/Chilled/gi, 'مبرد')
    .replace(/Stovetop/gi, 'على الموقد')
    .replace(/Steam/gi, 'على البخار')
    .replace(/Fry/gi, 'قلي');
}

export function localizeTime(time: string, lang: AppLanguage): string {
  if (lang === 'am') return localizeTimeAm(time);
  if (lang !== 'ar') return time;
  return time
    .replace(/\bminutes?\b/gi, 'دقيقة')
    .replace(/\bmin\b/gi, 'دقيقة')
    .replace(/\bhours?\b/gi, 'ساعة')
    .replace(/\bhrs?\b/gi, 'ساعة')
    .replace(/\bh\b/gi, 'ساعة')
    .replace(/\bdays?\b/gi, 'أيام')
    .replace(/\bovernight\b/gi, 'ليلة كاملة')
    .replace(/baking \+ cooling/gi, 'خبز + تبريد')
    .replace(/\bchill\b/gi, 'تبريد')
    .replace(/\bproofing\b/gi, 'تخمير')
    .replace(/\bbake\b/gi, 'خبز');
}

export function localizeYield(yieldText: string, lang: AppLanguage): string {
  if (lang === 'am') return localizeYieldAm(yieldText);
  if (lang !== 'ar') return yieldText;
  return yieldText
    .replace(/\bportions?\b/gi, 'حصة')
    .replace(/\bslices?\b/gi, 'شريحة')
    .replace(/\bloaves?\b/gi, 'رغيف')
    .replace(/\bloaf\b/gi, 'رغيف')
    .replace(/\bcookies?\b/gi, 'كوكيز')
    .replace(/\bbiscuits?\b/gi, 'بسكويت')
    .replace(/\bbars?\b/gi, 'قطعة')
    .replace(/\brolls?\b/gi, 'لفة')
    .replace(/\bbuns?\b/gi, 'قطعة خبز')
    .replace(/\btarts?\b/gi, 'تارت')
    .replace(/\btartlets?\b/gi, 'تارتليت')
    .replace(/\bpies?\b/gi, 'فطيرة')
    .replace(/\bcakes?\b/gi, 'كيك')
    .replace(/\bcupcakes?\b/gi, 'كب كيك')
    .replace(/\bmuffins?\b/gi, 'مافن')
    .replace(/\bscones?\b/gi, 'اسكونز')
    .replace(/\bcroissants?\b/gi, 'كرواسان')
    .replace(/\bpizzas?\b/gi, 'بيتزا')
    .replace(/\bpieces?\b/gi, 'قطعة')
    .replace(/\bballs?\b/gi, 'كرة')
    .replace(/\bsquares?\b/gi, 'مربع')
    .replace(/\bpuffs?\b/gi, 'قطعة')
    .replace(/\bfingers?\b/gi, 'أصابع')
    .replace(/\bOne\b/g, 'واحد')
    .replace(/\bTwo\b/g, 'اثنان')
    .replace(/cm/g, 'سم')
    .replace(/\bg\b/g, 'غ')
    .replace(/\bkg\b/g, 'كغ')
    .replace(/\bml\b/g, 'مل');
}

const INGREDIENT_TERMS_AR: [RegExp, string][] = [
  [/^Strong white bread flour$/i, 'دقيق خبز أبيض قوي'],
  [/^Strong white flour$/i, 'دقيق أبيض قوي'],
  [/^Plain flour$/i, 'دقيق أبيض متعدد الاستخدامات'],
  [/^Self-raising flour, sifted$/i, 'دقيق ذاتي التخمير، منخول'],
  [/^Self-raising flour$/i, 'دقيق ذاتي التخمير'],
  [/^Whole-wheat flour$/i, 'دقيق القمح الكامل'],
  [/^Cake flour or plain flour, sifted$/i, 'دقيق كيك أو دقيق أبيض ناعم، منخول'],
  [/^"00" pizza flour$/i, 'دقيق بيتزا إيطالي «00»'],
  [/^Blanched almond flour$/i, 'دقيق لوز مقشّر'],
  [/^Almond flour$/i, 'دقيق اللوز'],
  [/^Ground almonds$/i, 'لوز مطحون'],
  [/^Cornflour$/i, 'نشا الذرة'],
  [/^Unsalted butter, softened$/i, 'زبدة غير مملحة، لينة'],
  [/^Unsalted butter, melted$/i, 'زبدة غير مملحة، مذابة'],
  [/^Unsalted butter, cubed$/i, 'زبدة غير مملحة، مقطّعة مكعبات'],
  [/^Cold unsalted butter, cubed$/i, 'زبدة غير مملحة باردة، مقطّعة مكعبات'],
  [/^Cold unsalted butter block$/i, 'لوح زبدة غير مملحة بارد'],
  [/^Unsalted butter$/i, 'زبدة غير مملحة'],
  [/^Butter \(softened\)$/i, 'زبدة (لينة)'],
  [/^Butter$/i, 'زبدة'],
  [/^Caster sugar$/i, 'سكر ناعم الحبيبات (كاستر)'],
  [/^Icing sugar, sifted$/i, 'سكر بودرة ناعم، منخول'],
  [/^Icing sugar$/i, 'سكر بودرة ناعم'],
  [/^Soft brown sugar$/i, 'سكر بني رطب'],
  [/^Light brown sugar$/i, 'سكر بني فاتح'],
  [/^Brown sugar$/i, 'سكر بني'],
  [/^Granulated sugar$/i, 'سكر أبيض حبيبي'],
  [/^Demerara sugar$/i, 'سكر ديميرارا بني خشن'],
  [/^Sugar$/i, 'سكر'],
  [/^Honey$/i, 'عسل طبيعي'],
  [/^Golden syrup$/i, 'شراب القطر الذهبي'],
  [/^Glucose syrup$/i, 'شراب الغلوكوز'],
  [/^Whole eggs$/i, 'بيض كامل'],
  [/^Eggs, room temperature$/i, 'بيض بدرجة حرارة الغرفة'],
  [/^Eggs \(large\)$/i, 'بيض (حجم كبير)'],
  [/^Eggs$/i, 'بيض'],
  [/^Whole egg$/i, 'بيضة كاملة'],
  [/^Egg$/i, 'بيضة'],
  [/^Egg yolks$/i, 'صفار بيض'],
  [/^Egg yolk$/i, 'صفار بيضة'],
  [/^Egg whites, room temperature$/i, 'بياض بيض بدرجة حرارة الغرفة'],
  [/^Egg whites$/i, 'بياض بيض'],
  [/^Egg wash$/i, 'خليط دهن بالبيض'],
  [/^Whole milk$/i, 'حليب كامل الدسم'],
  [/^Milk, lukewarm$/i, 'حليب دافئ'],
  [/^Milk, cold$/i, 'حليب بارد'],
  [/^Warm milk$/i, 'حليب دافئ'],
  [/^Milk$/i, 'حليب'],
  [/^Buttermilk$/i, 'لبن رائب (باترميلك)'],
  [/^Plant milk$/i, 'حليب نباتي'],
  [/^Double cream$/i, 'كريمة خفق دسمة (35% دسم فأكثر)'],
  [/^Double cream \(cold, 35% fat minimum\)$/i, 'كريمة خفق باردة (35% دسم على الأقل)'],
  [/^Sour cream$/i, 'كريمة حامضة'],
  [/^Cream cheese$/i, 'جبن كريمي'],
  [/^Mascarpone$/i, 'جبن ماسكاربوني'],
  [/^Yoghurt$/i, 'زبادي (لبن)'],
  [/^Baking powder$/i, 'بيكنغ باودر'],
  [/^Baking soda$/i, 'بيكربونات الصوديوم'],
  [/^Cream of tartar$/i, 'كريم الترتار'],
  [/^Instant yeast$/i, 'خميرة فورية'],
  [/^Dried yeast$/i, 'خميرة جافة'],
  [/^Fresh yeast$/i, 'خميرة طازجة'],
  [/^Fine salt$/i, 'ملح ناعم'],
  [/^Sea salt flakes$/i, 'رقائق ملح البحر'],
  [/^Sea salt$/i, 'ملح بحري'],
  [/^Salt$/i, 'ملح'],
  [/^Water, lukewarm$/i, 'ماء فاتر'],
  [/^Lukewarm water \(28–30 °C\)$/i, 'ماء فاتر (28–30 °م)'],
  [/^Warm water$/i, 'ماء دافئ'],
  [/^Cold water$/i, 'ماء بارد'],
  [/^Ice-cold water$/i, 'ماء مثلّج'],
  [/^Hot water$/i, 'ماء ساخن'],
  [/^Water$/i, 'ماء'],
  [/^Vanilla extract$/i, 'خلاصة الفانيليا'],
  [/^Vanilla pod$/i, 'عود فانيليا'],
  [/^Dark chocolate \(70%\), chopped$/i, 'شوكولاتة داكنة (70%)، مفرومة'],
  [/^Dark chocolate \(60–70%\)$/i, 'شوكولاتة داكنة (60–70%)'],
  [/^Dark chocolate \(chopped\)$/i, 'شوكولاتة داكنة مفرومة'],
  [/^Dark chocolate chips$/i, 'رقائق شوكولاتة داكنة'],
  [/^Cocoa powder, sifted$/i, 'بودرة كاكاو خام، منخولة'],
  [/^Unsweetened cocoa powder$/i, 'بودرة كاكاو غير محلاة'],
  [/^Cocoa powder$/i, 'بودرة الكاكاو'],
  [/^Olive oil$/i, 'زيت زيتون'],
  [/^Vegetable oil$/i, 'زيت نباتي'],
  [/^Lemon juice, fresh$/i, 'عصير ليمون طازج'],
  [/^Lemon juice$/i, 'عصير ليمون'],
  [/^Lemon zest$/i, 'بشر قشر الليمون'],
  [/^Ground cinnamon$/i, 'قرفة مطحونة'],
  [/^Cinnamon$/i, 'قرفة'],
  [/^Cardamom, ground$/i, 'هيل مطحون'],
  [/^Ground ginger$/i, 'زنجبيل مطحون'],
  [/^Rolled oats$/i, 'شوفان مجروش'],
  [/^Raisins$/i, 'زبيب'],
  [/^Gelatine sheets \(gold\)$/i, 'أوراق جيلاتين ذهبية'],
  [/^Crème pâtissière$/i, 'كريم باتيسيير'],
  [/^Crème anglaise$/i, 'كريم أنجليز'],
  [/^Ground almonds$/i, 'لوز مطحون'],
  [/^Pistachios, chopped$/i, 'فستق حلبي مفروم'],
  [/^Shortcrust pastry$/i, 'عجينة مكسّرة (شورتكراست)'],
  [/^Filo pastry sheets$/i, 'رقائق عجينة الفيلو'],
  [/^Fresh blueberries$/i, 'توت أزرق طازج'],
  [/^Mozzarella, grated$/i, 'جبنة موزاريلا مبشورة'],
  [/^Gruyère cheese, grated$/i, 'جبن غرويير مبشور'],
  [/^Garlic, minced$/i, 'ثوم مفروم ناعم'],
  [/^Dried oregano$/i, 'أوريغانو مجفف'],
];

export function localizeIngredientName(name: string, lang: AppLanguage): string {
  if (lang === 'am') return localizeIngredientNameAm(name);
  if (lang !== 'ar') return name;

  // Handle section prefixes like "Dough: ", "Filling: ", "Icing: ", "Topping: ", "Syrup: ", "Base: ", "Shells: "
  const prefixMap: Record<string, string> = {
    'Dough:': 'العجين:',
    'Filling:': 'الحشوة:',
    'Icing:': 'التغطية:',
    'Topping:': 'الطبقة العلوية:',
    'Syrup:': 'القطر:',
    'Base:': 'القاعدة:',
    'Shells:': 'الأغلفة:',
    'Streusel:': 'الستريوزل:',
    'Meringue:': 'الميرانغ:',
    'Détrempe:': 'العجينة الأساسية:',
    'Beurrage:': 'لوح الزبدة:',
    'Mascarpone Cream:': 'كريمة الماسكاربوني:',
  };

  let working = name.trim();
  let prefixAr = '';
  for (const [enP, arP] of Object.entries(prefixMap)) {
    if (working.startsWith(enP)) {
      prefixAr = `${arP} `;
      working = working.slice(enP.length).trim();
      break;
    }
  }

  for (const [regex, ar] of INGREDIENT_TERMS_AR) {
    if (regex.test(working)) {
      return `${prefixAr}${ar}`;
    }
  }

  // Fallback word-level culinary translation for remaining ingredients
  let translated = working
    .replace(/Unsalted butter/gi, 'زبدة غير مملحة')
    .replace(/Strong white bread flour/gi, 'دقيق خبز أبيض قوي')
    .replace(/Strong bread flour/gi, 'دقيق خبز قوي')
    .replace(/Bread flour/gi, 'دقيق الخبز')
    .replace(/Whole-wheat flour/gi, 'دقيق القمح الكامل')
    .replace(/Plain flour/gi, 'دقيق أبيض')
    .replace(/Self-raising flour/gi, 'دقيق ذاتي التخمير')
    .replace(/Rye flour/gi, 'دقيق الجاودار')
    .replace(/Semolina/gi, 'سميد')
    .replace(/Cornflour/gi, 'نشا الذرة')
    .replace(/Caster sugar/gi, 'سكر ناعم')
    .replace(/Icing sugar/gi, 'سكر بودرة')
    .replace(/Soft brown sugar/gi, 'سكر بني رطب')
    .replace(/Brown sugar/gi, 'سكر بني')
    .replace(/Dark chocolate/gi, 'شوكولاتة داكنة')
    .replace(/Milk chocolate/gi, 'شوكولاتة بالحليب')
    .replace(/White chocolate/gi, 'شوكولاتة بيضاء')
    .replace(/Cocoa powder/gi, 'بودرة الكاكاو')
    .replace(/Double cream/gi, 'كريمة خفق دسمة')
    .replace(/Heavy cream/gi, 'كريمة ثقيلة')
    .replace(/Whipped cream/gi, 'كريمة مخفوقة')
    .replace(/Sour cream/gi, 'كريمة حامضة')
    .replace(/Cream cheese/gi, 'جبن كريمي')
    .replace(/Whole milk/gi, 'حليب كامل الدسم')
    .replace(/Evaporated milk/gi, 'حليب مبخّر')
    .replace(/Sweetened condensed milk/gi, 'حليب مكثّف محلى')
    .replace(/Buttermilk/gi, 'لبن رائب')
    .replace(/Vanilla extract/gi, 'خلاصة الفانيليا')
    .replace(/Vanilla pod/gi, 'عود فانيليا')
    .replace(/Baking powder/gi, 'بيكنغ باودر')
    .replace(/Baking soda/gi, 'بيكربونات الصوديوم')
    .replace(/Instant yeast/gi, 'خميرة فورية')
    .replace(/Fresh yeast/gi, 'خميرة طازجة')
    .replace(/Sourdough starter/gi, 'بادئ الساورودو')
    .replace(/Egg yolks/gi, 'صفار بيض')
    .replace(/Egg whites/gi, 'بياض بيض')
    .replace(/Whole eggs/gi, 'بيض كامل')
    .replace(/Olive oil/gi, 'زيت زيتون')
    .replace(/Vegetable oil/gi, 'زيت نباتي')
    .replace(/Lemon juice/gi, 'عصير ليمون')
    .replace(/Lemon zest/gi, 'بشر ليمون')
    .replace(/Orange zest/gi, 'بشر برتقال')
    .replace(/Ground cinnamon/gi, 'قرفة مطحونة')
    .replace(/Ground almonds/gi, 'لوز مطحون')
    .replace(/Walnuts/gi, 'جوز')
    .replace(/Pistachios/gi, 'فستق حلبي')
    .replace(/Hazelnuts/gi, 'بندق')
    .replace(/Pecans/gi, 'جوز البقان')
    .replace(/Peanuts/gi, 'فول سوداني')
    .replace(/Fine salt/gi, 'ملح ناعم')
    .replace(/Sea salt/gi, 'ملح بحري')
    .replace(/\bsoftened\b/gi, 'لينة')
    .replace(/\bmelted\b/gi, 'مذاب')
    .replace(/\bsifted\b/gi, 'منخول')
    .replace(/\bchopped\b/gi, 'مفروم')
    .replace(/\bgrated\b/gi, 'مبشور')
    .replace(/\btoasted\b/gi, 'محمّص')
    .replace(/\boptional\b/gi, 'اختياري')
    .replace(/\blukewarm\b/gi, 'فاتر')
    .replace(/\bcold\b/gi, 'بارد')
    .replace(/\bwarm\b/gi, 'دافئ')
    .replace(/\bwater\b/gi, 'ماء')
    .replace(/\bmilk\b/gi, 'حليب')
    .replace(/\bbutter\b/gi, 'زبدة')
    .replace(/\bsugar\b/gi, 'سكر')
    .replace(/\bflour\b/gi, 'دقيق')
    .replace(/\bsalt\b/gi, 'ملح')
    .replace(/\bhoney\b/gi, 'عسل')
    .replace(/\beggs?\b/gi, 'بيض');

  return `${prefixAr}${translated}`;
}

export function getRecipeTitle(recipeOrId: Pick<StandardizedRecipe, 'id' | 'title'> | string, lang: AppLanguage): string {
  if (typeof recipeOrId === 'string') {
    if (lang === 'ar') return RECIPE_TITLES_AR[recipeOrId] || recipeOrId;
    if (lang === 'am') return RECIPE_TITLES_AM[recipeOrId] || recipeOrId;
    return recipeOrId;
  }
  if (lang === 'ar') return RECIPE_TITLES_AR[recipeOrId.id] || recipeOrId.title;
  if (lang === 'am') return RECIPE_TITLES_AM[recipeOrId.id] || recipeOrId.title;
  return recipeOrId.title;
}

export function getRecipeTitleByIndexText(indexTitle: string, matchedRecipe: StandardizedRecipe | undefined, lang: AppLanguage): string {
  if (lang === 'ar' && matchedRecipe && RECIPE_TITLES_AR[matchedRecipe.id]) {
    return RECIPE_TITLES_AR[matchedRecipe.id];
  }
  if (lang === 'am' && matchedRecipe && RECIPE_TITLES_AM[matchedRecipe.id]) {
    return RECIPE_TITLES_AM[matchedRecipe.id];
  }
  return indexTitle;
}

const CLASSIFICATION_AR: Record<string, string> = {
  'Creamed butter cake': 'كيك زبدة مخفوق',
  'Egg-white foam cake': 'كيك رغوة بياض البيض',
  'Skillet or tin cake': 'كيك مقلاة أو قالب',
  'Classic butter loaf': 'باوند كيك كلاسيكي',
  'Yeast bread': 'خبز بالخميرة',
  'Artisan sourdough': 'ساورودو حرفي',
  'Enriched yeast dough': 'عجينة خميرة غنية',
  'Laminated yeast pastry': 'معجنات خميرة مورّقة',
  'Laminated pastry': 'عجينة مورّقة',
  'Choux pastry': 'عجينة الشو',
  'Shortcrust pastry': 'عجينة مكسّرة',
  'Pizza dough': 'عجينة بيتزا',
  'Pizza sauce': 'صلصة بيتزا',
  'Savoury tart': 'تارت مالح',
  'Double-crust fruit pie': 'فطيرة فواكه بطبقتين',
  'Whipped cream': 'كريمة مخفوقة',
  'Pouring custard': 'كاسترد سائل',
  'Cooked custard cream': 'كريمة كاسترد مطبوخة',
  'Cream': 'كريمة حلويات',
  'Icing/filling': 'تغطية / حشوة',
  'Frosting / Glaze': 'تغطية / طلاء',
  'Cake': 'كيك',
  'Cookie': 'كوكيز',
  'Biscuit': 'بسكويت',
  'Regional festive bread': 'خبز احتفالي إقليمي',
  'Gluten-free bread': 'خبز خالٍ من الغلوتين',
  'Gluten-free cake': 'كيك خالٍ من الغلوتين',
  'Vegan cake': 'كيك نباتي',
  'Flatbread': 'خبز مسطح',
  'Set cream dessert': 'حلوى كريمة متماسكة',
  'Baked custard': 'كاسترد مخبوز',
};

export function localizeClassification(classification: string, lang: AppLanguage): string {
  if (lang === 'am') return localizeClassificationAm(classification);
  if (lang !== 'ar') return classification;
  if (CLASSIFICATION_AR[classification]) return CLASSIFICATION_AR[classification];
  return classification
    .replace(/Creamed/gi, 'مخفوق بالزبدة')
    .replace(/Sponge/gi, 'إسفنجي')
    .replace(/Butter/gi, 'بالزبدة')
    .replace(/Chocolate/gi, 'بالشوكولاتة')
    .replace(/Pastry/gi, 'معجنات')
    .replace(/Custard/gi, 'كاسترد')
    .replace(/Bread/gi, 'خبز')
    .replace(/Cake/gi, 'كيك')
    .replace(/Cookie/gi, 'كوكيز')
    .replace(/Tart/gi, 'تارت')
    .replace(/Pie/gi, 'فطيرة');
}

export function localizeStorage(storage: string | undefined, lang: AppLanguage): string | undefined {
  if (!storage) return storage;
  if (lang === 'am') return localizeStorageAm(storage);
  if (lang !== 'ar') return storage;
  return storage
    .replace(/Airtight container/gi, 'وعاء محكم الإغلاق')
    .replace(/Room temperature/gi, 'بدرجة حرارة الغرفة')
    .replace(/Refrigerate/gi, 'يُحفظ مبرداً في الثلاجة')
    .replace(/Refrigerated/gi, 'مبرد')
    .replace(/Keep chilled/gi, 'يُحفظ مبرداً (0–5 °م)')
    .replace(/Cover surface with cling film/gi, 'غطِّ السطح مباشرة بنايلون غذائي ملامس')
    .replace(/Wrap in cling film/gi, 'يُلف بنايلون غذائي')
    .replace(/Freeze/gi, 'يُجمّد')
    .replace(/ambient/gi, 'بدرجة الغرفة')
    .replace(/frozen/gi, 'بالتجميد')
    .replace(/\bdays?\b/gi, 'أيام')
    .replace(/\bhours?\b/gi, 'ساعات')
    .replace(/\bweeks?\b/gi, 'أسابيع')
    .replace(/\bmonths?\b/gi, 'أشهر')
    .replace(/°C/g, '°م');
}

export function getRecipeSearchBlob(recipe: StandardizedRecipe): string {
  const arTitle = RECIPE_TITLES_AR[recipe.id] || '';
  const amTitle = RECIPE_TITLES_AM[recipe.id] || '';
  const arIngredients = recipe.ingredients.map((i) => localizeIngredientName(i.name, 'ar')).join(' ');
  const amIngredients = recipe.ingredients.map((i) => localizeIngredientName(i.name, 'am')).join(' ');
  return `${recipe.title} ${arTitle} ${amTitle} ${recipe.searchAliases?.join(' ') || ''} ${recipe.ingredients.map((i) => i.name).join(' ')} ${arIngredients} ${amIngredients} ${recipe.classification} ${recipe.bookSection || ''}`;
}
