import { AppLanguage } from './translations';

export const RECIPE_TITLES_AM: Record<string, string> = {
  // Core Recipes & Chapter 15 & Featured (1-83)
  'victoria-sponge': 'ክላሲክ ቪክቶሪያ ስፖንጅ ኬክ',
  'angel-food-cake': 'አንጀል ፉድ ኬክ (በእንቁላል ነጭ)',
  'pineapple-upside-down-cake': 'የተገለበጠ የአናናስ ኬክ',
  'classic-pound-cake': 'ክላሲክ ፓውንድ ኬክ',
  'coffee-cake-streusel': 'የቀረፋ ስትሪውሰል ቡና ኬክ',
  'wacky-cake': 'ያለ እንቁላል እና ወተት የቸኮሌት ኬክ (ዋኪ ኬክ)',
  'tres-leches-cake': 'ትሬስ ሌቼስ ኬክ (ባለ ሦስት ወተት ኬክ)',
  'chocolate-chip-cookies': 'የቸኮሌት ቺፕ ኩኪዎች',
  'shortbread-fingers': 'የቅቤ ሾርትብሬድ ጣቶች (ብስኩት)',
  'oatmeal-raisin-cookies': 'የአጃ እና ዘቢብ ኩኪዎች',
  'fudgy-brownies': 'ለስላሳ የቸኮሌት ብራውኒስ (ፋጂ)',
  'lemon-bars': 'የሎሚ ካሬዎች (ሌመን ባርስ)',
  'white-sandwich-bread': 'ክላሲክ ነጭ የሳንድዊች ዳቦ',
  'baguette-direct': 'ፈረንሳይኛ ባጌት (ቀጥታ ዘዴ)',
  'wholemeal-bread': 'ክላሲክ ሙሉ-ስንዴ ዳቦ (ብራውን ዳቦ)',
  'soft-bread-rolls': 'ለስላሳ የዳቦ ጥቅሎች (ሮልስ)',
  'cinnamon-rolls': 'የቀረፋ ጥቅሎች (ሲናሞን ሮልስ)',
  'focaccia': 'የወይራ ዘይት እና ሮዝሜሪ ፎካቻ',
  'brioche': 'የበለጸገ የፈረንሳይ ብሪዮሽ ዳቦ',
  'sourdough-boule': 'አርቲዛን ሳወርዶ ዳቦ (ተፈጥሯዊ እርሾ)',
  'neapolitan-pizza-dough': 'ክላሲክ ኒያፖሊታን የፒዛ ሊጥ',
  'new-york-pizza-dough': 'የኒውዮርክ ስታይል ፒዛ ሊጥ',
  'sicilian-focaccia-pizza': 'የሲሲሊ ፎካቻ ፒዛ (ወፍራም)',
  'rough-puff-pastry': 'ፈጣን ፓፍ ፓስትሪ (Rough Puff)',
  croissants: 'የቅቤ ክሮሳኖች (Croissants)',
  'danish-pastry-dough': 'የዳኒሽ ፓስትሪ ሊጥ (የተነባበረ)',
  'choux-pastry': 'ሹ ፓስትሪ (Choux Pastry)',
  'sweet-shortcrust-pastry': 'ጣፋጭ ሾርትክራስት ፓስትሪ (Pâte Sucrée)',
  'creme-patissiere': 'ክሬም ፓቲሲየር (የፓስትሪ ክሬም)',
  'creme-anglaise': 'ክሬም አንግሌዝ (የቫኒላ ካስታርድ ሶስ)',
  'lemon-curd': 'ክላሲክ የሎሚ ከርድ (Lemon Curd)',
  'chocolate-ganache': 'ጥቁር ቸኮሌት ጋናሽ',
  'italian-meringue': 'ጣሊያናዊ ሜሪንግ',
  'swiss-meringue': 'ስዊስ ሜሪንግ',
  'chocolate-mousse': 'ክላሲክ የቸኮሌት ሙስ',
  'panna-cotta': 'የቫኒላ ፓና ኮታ',
  'creme-brulee': 'ክላሲክ ክሬም ብሩሌ',
  'apple-pie': 'ክላሲክ የፖም ፓይ (Apple Pie)',
  'lemon-meringue-pie': 'የሎሚ ሜሪንግ ፓይ',
  'baked-cheesecake': 'የተጋገረ የቫኒላ ቺዝ ኬክ',
  'caramel-sauce': 'ክላሲክ ወይም ጨዋማ የካራሜል ሶስ',
  'salted-caramels': 'ለስላሳ ጨዋማ ካራሜሎች',
  'peanut-brittle': 'ጥርት ያለ የኦቾሎኒ ብሪትል',
  'chocolate-truffles': 'ጥቁር ቸኮሌት ትራፍሎች',
  'vanilla-fudge': 'ክላሲክ የቫኒላ ፋጅ',
  marshmallows: 'በቤት የተሰራ የቫኒላ ማርሽማሎው',
  'chocolate-bark': 'የለውዝ እና የደረቀ ፍራፍሬ ቸኮሌት ባርክ',
  tiramisu: 'ክላሲክ ጣሊያናዊ ቲራሚሱ',
  baklava: 'ጥርት ያለ የለውዝ እና ማር/ሽሮፕ ባክላቫ',
  churros: 'ስፔናዊ ቹሮስ ከቀረፋ ስኳር ጋር',
  madeleines: 'የፈረንሳይ ቅቤ እና ሎሚ ማደሌንስ',
  'macarons-french': 'ፈረንሳይኛ የአልመንድ ማካሮን',
  cannoli: 'የሲሲሊ ሪኮታ ካኖሊ',
  'vanilla-buttercream': 'ክላሲክ የቫኒላ ቅቤ ክሬም (Buttercream)',
  'blueberry-muffins': 'ክላሲክ የብሉቤሪ ማፊኖች',
  'classic-pizza-sauce': 'ክላሲክ ጣሊያናዊ የፒዛ ሶስ',
  'classic-quiche-lorraine': 'ክላሲክ ኪሽ ሎሬን (Quiche Lorraine)',
  'flaky-shortcrust-pastry': 'ክላሲክ ሾርትክራስት ፓስትሪ (Flaky)',
  'rich-chocolate-fudge-cake': 'የበለጸገ የቸኮሌት ፋጅ ኬክ',
  'creme-chantilly': 'ክሬም ሻንቲይ (የተመታ ክሬም)',
  'creme-legere': 'ክሬም ሌዤር (ቀላል ፓስትሪ ክሬም)',
  'creme-diplomate': 'ክሬም ዲፕሎማት',
  'creme-mousseline': 'ክሬም ሙስሊን (የቅቤ ፓስትሪ ክሬም)',
  'creme-chiboust': 'ክሬም ሺቡስት (ከጣሊያናዊ ሜሪንግ ጋር)',
  'creme-bavaroise': 'ክሬም ባቫሩዋዝ (Bavarian Cream)',
  'creme-damande': 'የአልመንድ ክሬም (Crème d’Amande)',
  frangipane: 'የአልመንድ ፍራንጂፓን (Frangipane)',
  'ganache-montee': 'ጋናሽ ሞንቴ (የተመታ ጋናሽ)',
  'creme-namelaka': 'ክሬም ናሜላካ (የቸኮሌት ክሬም)',
  'creme-cremeux': 'ክሬም ክሬምዩ (Chocolate Crémeux)',
  'creme-fraiche': 'ክሬም ፍሬሽ (የቦካ ክሬም)',
  'mascarpone-cream': 'ማስካርፖኔ ክሬም (የቲራሚሱ ክሬም)',
  'lemon-drizzle-cake': 'የሎሚ ድሪዝል ኬክ (በሽሮፕ)',
  'red-velvet-cake': 'ሬድ ቬልቬት ኬክ',
  'gingerbread-biscuits': 'ቅመማ ቅመም ያለው የዝንጅብል ብስኩት',
  ambasha: 'የኢትዮጵያ የበዓል አምባሻ (Ambasha)',
  himbasha: 'የኢትዮጵያ ጣፋጭ ህምባሻ (Himbasha)',
  'gluten-free-white-sandwich-bread': 'ከግሉተን ነጻ ነጭ የሳንድዊች ዳቦ',
  'gluten-free-chocolate-cake': 'ከግሉተን ነጻ የቸኮሌት ኬክ',
  'vegan-chocolate-cake': 'ቪጋን (ከእንስሳት ተዋጽኦ ነጻ) የቸኮሌት ኬክ',
  'pita-bread': 'የተነፋ የፒታ ዳቦ (Pita Bread)',
  'naan-bread': 'የህንድ ናን ዳቦ በእርጎ (Naan Bread)',
  'full-puff-pastry': 'ክላሲክ ሙሉ ፓፍ ፓስትሪ (Full Puff)',

  // Expanded Breads & Pizza
  'baguette-de-tradition': 'ፈረንሳይኛ ባጌት ደ ትራዲሲዮን',
  batard: 'ባታርድ (Bâtard) የፈረንሳይ ዳቦ',
  ciabatta: 'ቻባታ (Ciabatta) የጣሊያን ዳቦ',
  'focaccia-barese': 'ፎካቻ ባሬዜ (በድንች እና ቲማቲም)',
  'brioche-nanterre': 'ብሪዮሽ ናንቴር (በቆርቆሮ የተጋገረ)',
  'japanese-milk-bread': 'የጃፓን የወተት ዳቦ (ሾኩፓን / Shokupan)',
  'pain-de-mie': 'ፓን ደ ሚ (ለስላሳ የሳንድዊች ዳቦ)',
  'pain-viennois': 'ፓን ቪየኑዋ (ለስላሳ የወተት ዳቦ)',
  bagels: 'ቤግልስ (ተቀቅሎ የተጋገረ ዳቦ)',
  'burger-buns': 'ለስላሳ የበርገር ዳቦ (Burger Buns)',
  'soft-dinner-rolls': 'ለስላሳ የምግብ ጥቅሎች (Dinner Rolls)',
  'milk-bread-rolls': 'የወተት ዳቦ ጥቅሎች',
  pandesal: 'ፓንደሳል (የፊሊፒንስ ለስላሳ ዳቦ)',
  challah: 'የተጎነጎነ ቻላ ዳቦ (Challah)',
  zopf: 'ዞፕፍ (Zopf) የስዊስ የተጎነጎነ ቅቤ ዳቦ',
  pulla: 'ፑላ (Pulla) የፊንላንድ የኮረሪማ ዳቦ',
  cozonac: 'ኮዞናክ (Cozonac) በዋልነት እና ኮኮዋ',
  'scali-bread': 'ስካሊ (Scali) በሰሊጥ የተጎነጎነ ዳቦ',
  'cottage-loaf': 'የእንግሊዝ ኮቴጅ ዳቦ (Cottage Loaf)',
  'bloomer-loaf': 'ብሉመር ዳቦ (Bloomer Loaf)',
  barmbrack: 'ባርምብራክ (የአየርላንድ የደረቀ ፍራፍሬ ዳቦ)',
  'oatmeal-bread': 'የአጃ እና ማር ዳቦ',
  'semolina-bread': 'የሰሞሊና ዳቦ ከሰሊጥ ጋር',
  'potato-bread': 'ለስላሳ የድንች ዳቦ',
  'anadama-bread': 'አናዳማ ዳቦ (በበቆሎ ዱቄት እና ሞላሰስ)',
  'multigrain-bread': 'ባለ ብዙ እህል እና ዘር ዳቦ (Multigrain)',
  'dark-rye-bread': 'ጥቁር የራይ ዳቦ (Dark Rye)',
  pumpernickel: 'የጀርመን ፓምፐርኒከል ዳቦ',
  vollkornbrot: 'ቮልኮርንብሮት (Vollkornbrot) ሙሉ-እህል ዳቦ',
  'whole-wheat-baguette': 'ሙሉ-ስንዴ ባጌት',
  'sourdough-baguette': 'ሳወርዶ ባጌት',
  'sourdough-rye-bread': 'ሳወርዶ የራይ ዳቦ (Mischbrot)',
  'pane-toscano': 'ፓኔ ቶስካኖ (ጨው የሌለበት የቱስካን ዳቦ)',
  'pane-pugliese': 'ፓኔ ፑግሊዬዜ (ከፍተኛ ውሃ ያለው የጣሊያን ዳቦ)',
  'pan-de-cristal': 'ፓን ደ ክሪስታል (ስስ ጥርት ያለ የስፔን ዳቦ)',
  hallulla: 'ሃሉላ (Hallulla) የቺሊ ጠፍጣፋ ዳቦ',
  kubaneh: 'ኩባኔህ (Kubaneh) የተነባበረ ዳቦ',
  'bao-buns': 'ባኦ ባንስ (በእንፋሎት የበሰለ ለስላሳ ዳቦ)',
  'soft-pretzels': 'ለስላሳ ፕሬትዘል (Soft Pretzels)',
  anpan: 'አንፓን (በቀይ ባቄላ ፓስታ የተሞላ የጃፓን ዳቦ)',
  'melon-pan': 'ሜሎን ፓን (ጥርት ያለ የኩኪ ሽፋን ያለው ዳቦ)',
  'pineapple-buns': 'የአናናስ ቅርጽ ዳቦ (Bo Lo Bao)',
  'garlic-bread-knots': 'የነጭ ሽንኩርት እና ቅጠላ ቅጠል የዳቦ ቋጠሮዎች',
  'ethiopian-honey-bread': 'የኢትዮጵያ የማር እና የወተት ዳቦ',
  'difo-dabo': 'ድፎ ዳቦ (በእንሰት/ሙዝ ቅጠል የተጋገረ)',
  khachapuri: 'አጃሩሊ ካቻፑሪ (በአይብ እና እንቁላል)',
  'khachapuri-imeruli': 'ኢሜሩሊ ካቻፑሪ (በአይብ የተሞላ)',
  'turkish-pide': 'የቱርክ ፒዴ (በአይብ እና ስጋ)',
  lahmacun: 'ላህማጁን (ስስ የቱርክ ስጋ ጠፍጣፋ ዳቦ)',
  manakish: 'ማናቂሽ (በዛዓታር እና የወይራ ዘይት)',
  'taboon-bread': 'የታቡን ዳቦ (Taboon Bread)',
  'soft-flour-tortillas': 'ለስላሳ የስንዴ ቶርቲላ',
  injera: 'እንጀራ (በተፈጥሮ የቦካ የጤፍ ሊጥ)',
  'pan-pizza-dough': 'ወፍራም የመጥበሻ/ትሪ ፒዛ ሊጥ (Pan Pizza)',
  'thin-crust-pizza-dough': 'ስስ ቅርፊት የፒዛ ሊጥ',
  calzone: 'ካልዞኔ (የታጠፈ እና የተሞላ ፒዛ)',
  'pizza-bianca': 'ፒዛ ቢያንካ (ነጭ የሮም ፒዛ)',
  'detroit-style-pizza': 'የዲትሮይት ስታይል ፒዛ',
  'grandma-pie': 'ግራንድማ ፓይ (ስስ ካሬ ፒዛ)',
  'pizza-fritta': 'ፒዛ ፍሪታ (የተጠበሰ የኒያፖሊታን ፒዛ)',
  'pizza-margherita': 'ፒዛ ማርጌሪታ (ክላሲክ)',
  'pizza-marinara': 'ፒዛ ማሪናራ (በነጭ ሽንኩርት እና ኦሬጋኖ)',
  stromboli: 'ስትሮምቦሊ (የተጠቀለለ የፒዛ ዳቦ)',
  'pizza-capricciosa': 'ፒዛ ካፕሪቾዛ (በአርቲቾክ እና እንጉዳይ)',
  'pizza-diavola': 'ፒዛ ዲያቮላ (በቅመም ሳላሚ)',
  'pizza-puttanesca': 'ፒዛ ፑታኔስካ (በወይራ እና ኬፐርስ)',
  'pizza-quattro-formaggi': 'ፒዛ ኳትሮ ፎርማጂ (ባለ አራት አይብ)',
  'pizza-boscaiola': 'ፒዛ ቦስካዮላ (በእንጉዳይ እና ሶሴጅ)',
  'sausage-and-kale-pizza': 'የሶሴጅ እና ጎመን (Kale) ፒዛ',
  'pizza-al-taglio': 'ፒዛ አል ታሊዮ (ካሬ የሮም ፒዛ)',
  'pizza-funghi': 'ፒዛ ፉንጊ (የዱር እንጉዳይ ፒዛ)',
  'pizza-prosciutto-e-rucola': 'ፒዛ ፕሮሹቶ እና ሩኮላ',
  'focaccia-sandwich': 'ፎካቻ ሳንድዊች (Schiacciata)',
  pizzette: 'ፒዜቴ (ትንንሽ የድግስ ፒዛዎች)',
  'mushroom-truffle-pizza': 'የእንጉዳይ እና ትራፍል ዘይት ፒዛ',
  'pizza-salsiccia-e-friarielli': 'ፒዛ ሳልሲቻ እና ፍሪያሪዬሊ',
  pissaladiere: 'ፒሳላዲየር (በተጠበሰ ሽንኩርት እና ወይራ)',

  // Expanded Cakes & Dietary
  'almond-flour-cookies': 'ከግሉተን ነጻ የአልመንድ ዱቄት ኩኪዎች',
  'vegan-banana-bread': 'ቪጋን የሙዝ ዳቦ/ኬክ',
  'dairy-free-scones': 'ከወተት ተዋጽኦ ነጻ ስኮኖች',
  'pao-de-queijo': 'ፓዎ ደ ኬዦ (የብራዚል የአይብ ዳቦ)',
  'orange-polenta-cake': 'የብርቱካን እና ፖሌንታ (በቆሎ) ኬክ',
  'lemon-polenta-cake': 'የሎሚ እና ፖሌንታ ኬክ',
  'torta-caprese': 'ቶርታ ካፕሬዜ (የቸኮሌት እና አልመንድ ኬክ)',
  'flourless-chocolate-cake': 'ያለ ዱቄት የተዘጋጀ የቸኮሌት ኬክ',
  'almond-and-orange-cake': 'ሙሉ ብርቱካን እና አልመንድ ኬክ',
  'carrot-cake': 'የካሮት ኬክ በክሬም ቺዝ ፍሮስቲንግ',
  'coffee-walnut-cake': 'የቡና እና ዋልነት ኬክ',
  'banana-cake': 'ለስላሳ የሙዝ ኬክ',
  'swiss-roll': 'ክላሲክ ስዊስ ሮል (በጃም እና ክሬም)',
  'rich-fruit-cake': 'የበለጸገ የደረቀ ፍራፍሬ ኬክ',
  'black-forest-cake': 'ብላክ ፎረስት ኬክ (በቼሪ እና ክሬም)',
  'opera-cake': 'የፈረንሳይ ኦፔራ ኬክ (በቡና እና ጋናሽ)',
  'hummingbird-cake': 'ሃሚንግበርድ ኬክ (በሙዝ፣ አናናስ እና ፔካን)',
  'tiramisu-cake': 'የቲራሚሱ ንብርብር ኬክ',
  'battenberg-cake': 'ባተንበርግ ኬክ (በማርዚፓን)',
  'sacher-torte': 'ዛኸር ቶርቴ (የኦስትሪያ ቸኮሌት እና አፕሪኮት)',
  'madeira-cake': 'ማዴይራ ኬክ በሎሚ',
  'coconut-cake': 'ክሬማዊ የኮኮናት ኬክ',
  'pistachio-cake': 'የፒስታቺዮ ኬክ',
  'japanese-cotton-cheesecake': 'የጃፓን ለስላሳ ኮተን ቺዝ ኬክ',
  'simnel-cake': 'ሲምኔል ኬክ (በማርዚፓን እና ፍራፍሬ)',
  lamingtons: 'ላሚንግተንስ (በቸኮሌት እና ኮኮናት)',
  'gateau-basque': 'ጋቶ ባስክ (በፓስትሪ ክሬም የተሞላ)',
  'lemon-olive-oil-cake': 'የሎሚ እና የወይራ ዘይት ኬክ',
  'dobos-torte': 'ዶቦሽ ቶርቴ (የሃንጋሪ ካራሜል ንብርብር ኬክ)',
  kladdkaka: 'ክላድካካ (የስዊድን ለስላሳ የቸኮሌት ኬክ)',
  'devils-food-cake': 'ዴቭልስ ፉድ ኬክ (ጥቁር ቸኮሌት)',
  'coconut-and-lime-cake': 'የኮኮናት እና ላይም (ሎሚ) ኬክ',
  prinsesstarta: 'ፕሪንሴስቶርታ (የስዊድን ልዕልት ኬክ)',
  'marble-cake': 'ማርብል ኬክ (የቫኒላ እና ቸኮሌት)',
  'chiffon-cake': 'ቀላል የሺፎን ኬክ',
  'boston-cream-pie': 'ቦስተን ክሬም ፓይ (በካስታርድ እና ጋናሽ)',
  'caramel-layer-cake': 'የካራሜል ንብርብር ኬክ',
  'pecan-layer-cake': 'የፔካን ንብርብር ኬክ',
  'parsnip-and-maple-cake': 'የፓርስኒፕ እና ሜፕል ሽሮፕ ኬክ',
  'guinness-chocolate-cake': 'የጠቆረ ብቅል እና ቸኮሌት ኬክ',
  'genoise-sponge': 'ክላሲክ ፈረንሳይኛ ጄንዋዝ ስፖንጅ',
  'gateau-moka': 'ጋቶ ሞካ (የቡና ቅቤ ክሬም ኬክ)',
  'strawberry-shortcake': 'የጃፓን እንጆሪ ሾርትኬክ',
  'chocolate-orange-cake': 'የቸኮሌት እና ብርቱካን ኬክ',
  'walnut-cake': 'ክላሲክ የዋልነት ኬክ',
  'beetroot-chocolate-cake': 'የቀይ ስር እና ቸኮሌት ኬክ',
  'hazelnut-cake': 'የሄዘልነት ኬክ (Torta di Nocciole)',
  'white-chocolate-mud-cake': 'ጥቅጥቅ ያለ ነጭ ቸኮሌት ማድ ኬክ',
  'banana-and-walnut-loaf': 'የሙዝ እና ዋልነት ዳቦ ኬክ',
  'blackberry-and-apple-cake': 'የጥቁር ቤሪ እና ፖም ኬክ',
  'pear-and-almond-cake': 'የፒርስ እና አልመንድ ኬክ',
  sernik: 'ሴርኒክ (የፖላንድ የተጋገረ ቺዝ ኬክ)',
  bienenstich: 'ቢነንሽቲሽ (የንብ ንክሻ የአልመንድ ማር ኬክ)',
  'bran-muffins': 'የስንዴ ፉርሽካ እና ማር ማፊኖች',
  'classic-scones': 'ክላሲክ የእንግሊዝ ቅቤ ስኮኖች',
  'cheese-and-herb-scones': 'የአይብ እና ቅጠላ ቅጠል ስኮኖች',
  'irish-soda-bread': 'የአየርላንድ የሶዳ ዳቦ (በባተርሚልክ)',
  'soda-farls': 'ሶዳ ፋርልስ (በምጣድ የተጋገረ ዳቦ)',
  cornbread: 'የበቆሎ ዳቦ (በብረት መጥበሻ)',
  'savoury-cheese-and-chive-muffins': 'ጨዋማ የአይብ እና ሽንኩርት ቅጠል ማፊኖች',
  'yorkshire-puddings': 'ዮርክሻየር ፑዲንግ',

  // Expanded Pastry & Cookies
  eclairs: 'ኤክሌር (በፓስትሪ ክሬም እና ቸኮሌት)',
  'filo-apple-cigars': 'ጥርት ያሉ የፊሎ ፖም እና ቀረፋ ጥቅሎች',
  palmiers: 'ፓልሚዬርስ (በፓፍ ፓስትሪ እና ስኳር)',
  'hazelnut-and-chocolate-palmiers': 'የሄዘልነት እና ቸኮሌት ፓልሚዬርስ',
  'kouign-amann': 'ኩዊኝ-አማን (በካራሜላይዝድ ቅቤ)',
  caneles: 'ካኔሌ ደ ቦርዶ (በቫኒላ እና ማር/ራም)',
  'croissant-aux-amandes': 'የአልመንድ ክሮሳን (በፍራንጂፓን የተሞላ)',
  'mille-feuille': 'ሚል-ፈይ / ናፖሊዮን (በክሬም ዲፕሎማት)',
  'paris-brest': 'ፓሪስ-ብሬስት (በፕራሊን ሙስሊን ክሬም)',
  'apple-strudel': 'የኦስትሪያ የፖም ሽትሩደል (Apple Strudel)',
  beignets: 'ቤኝዬስ (በአይሲንግ ስኳር የተጠበሰ ሊጥ)',
  'vol-au-vent': 'ቮል-ኦ-ቫን (ባዶ የፓፍ ፓስትሪ ቅርፊቶች)',
  croquembouche: 'ክሮከምቡሽ (የካራሜል ፕሮፊተሮል ማማ)',
  'choux-swans': 'የሹ ፓስትሪ ዝይ ቅርጾች በክሬም',
  'puits-damour': 'ፑዊ ዳሙር (በካራሜላይዝድ ሺቡስት ክሬም)',
  'bichon-au-citron': 'ቢሾን ኦ ሲትሮን (በሎሚ ከርድ)',
  'chaussons-aux-pommes': 'ሾሶን ኦ ፖም (የተነባበረ የፖም ፓስትሪ)',
  cornetti: 'ኮርኔቲ (ጣሊያናዊ የሲትረስ ክሮሳን)',
  sfogliatelle: 'ስፎሊያቴሌ ሪቺ (በሪኮታ የተሞላ የናፕልስ ፓስትሪ)',
  'apple-galette': 'የገጠር ስታይል የፖም ጋሌት',
  'tarte-aux-pommes': 'ክላሲክ የፈረንሳይ የፖም ታርት',
  friands: 'ፍሪያንድስ (በቡናማ ቅቤ፣ አልመንድ እና ቤሪ)',
  'cream-puffs': 'ክሬም ፓፍስ (Choux à la Crème)',
  'danish-braid': 'የተጎነጎነ የዳኒሽ ፓስትሪ በካስታርድ እና ለውዝ',
  'vanilla-slice': 'ቫኒላ ስላይስ (የካስታርድ ፓፍ ፓስትሪ)',
  'fondant-fancies': 'ፎንዳንት ፋንሲስ (በስኳር የተሸፈኑ ትንንሽ ኬኮች)',
  'mini-fruit-tarts': 'ትንንሽ የፍራፍሬ ታርቶች በፓስትሪ ክሬም',
  'puff-pastry-pinwheels': 'የፓፍ ፓስትሪ ፒንዊልስ (ጣፋጭ እና ጨዋማ)',
  'strawberry-tartlets': 'ትኩስ የእንጆሪ ታርትሌቶች',
  'chocolate-tartlets': 'ጥቁር ቸኮሌት ጋናሽ ታርትሌቶች',
  'pear-frangipane-tart': 'የፒርስ እና ፍራንጂፓን ታርት (Bourdaloue)',
  'galette-des-rois': 'ጋሌት ደ ሩዋ (የነገሥታት ፓፍ ፓስትሪ)',
  pithiviers: 'ፒቲቪዬርስ (በአልመንድ ክሬም የተሞላ)',
  'cheese-straws': 'ጥርት ያሉ የአይብ ፓፍ ፓስትሪ እንጨቶች',
  gougeres: 'ጉዤርስ (የግሩዬር አይብ ሹ ፓስትሪ)',
  'pain-au-chocolat': 'ፓን ኦ ሾኮላ (ቸኮሌት የታጠፈበት ፓስትሪ)',
  'pain-aux-raisins': 'ፓን ኦ ሬዛን (የካስታርድ እና ዘቢብ ጥቅል)',
  'chelsea-buns': 'ቼልሲ ባንስ (በቀረፋ እና ደረቅ ወይን)',
  'yeast-doughnuts': 'ለስላሳ የተጠበሱ የእርሾ ዶናቶች',
  'custard-danish-pinwheels': 'የካስታርድ ዳኒሽ ፒንዊልስ',
  cruffins: 'ክራፊንስ (በማፊን ቆርቆሮ የተጋገረ ክሮሳን)',
  kanelbullar: 'ካኔልቡላር (የስዊድን የቀረፋ እና ኮረሪማ ጥቅሎች)',
  'almond-biscotti': 'ጥርት ያለ የአልመንድ ቢስኮቲ (Cantucci)',
  'coconut-macaroons': 'ጥርት ያሉ የኮኮናት ማካሩኖች',
  blondies: 'ብሎንዲስ (በቡናማ ቅቤ እና ነጭ ቸኮሌት)',
  flapjacks: 'ፍላፕጃክስ (የአጃ፣ ቅቤ እና ማር/ሽሮፕ ባሮች)',
  snickerdoodles: 'ስኒከርዱድልስ (የቀረፋ እና ስኳር ኩኪዎች)',
  'thumbprint-cookies': 'የጃም ታምብፕሪንት ኩኪዎች',
  'linzer-cookies': 'ሊንዘር ኩኪዎች (በሄዘልነት እና ራስበሪ ጃም)',
  'chocolate-chip-cookie-bars': 'የቸኮሌት ቺፕ ኩኪ ባሮች',
  'brown-butter-chocolate-chip-cookies': 'የቡናማ ቅቤ ቸኮሌት ቺፕ ኩኪዎች',
  'pistachio-and-cranberry-cookies': 'የፒስታቺዮ እና ክራንቤሪ ኩኪዎች',
  'date-bars': 'የቴምር እና አጃ ባሮች',
  'coconut-snowballs': 'የኮኮናት እና አልመንድ የበረዶ ኳሶች',
  alfajores: 'አልፋሆሬስ (በዱልሴ ደ ሌቼ የተሞሉ ብስኩቶች)',
  'anzac-biscuits': 'አንዛክ ብስኩቶች (በአጃ እና ኮኮናት)',
  'viennese-whirls': 'ቪየኒዝ ዊርልስ (በቅቤ ክሬም እና ጃም)',
  'whoopie-pies': 'ውፒ ፓይስ (በቸኮሌት እና ማርሽማሎው ክሬም)',
  tuiles: 'ቱይልስ (ስስ ጥርት ያሉ የአልመንድ ብስኩቶች)',
  florentines: 'ፍሎረንቲንስ (በካራሜል አልመንድ እና ቸኮሌት)',
  'empire-biscuits': 'የስኮትላንድ ኢምፓየር ብስኩቶች',
  'jam-sandwich-biscuits': 'በጃም የተጣመሩ የሳንድዊች ብስኩቶች',
  'coconut-and-raspberry-slices': 'የኮኮናት እና ራስበሪ ቁርጥራጮች',
  'rocky-road': 'ሮኪ ሮድ (በቸኮሌት፣ ማርሽማሎው እና ብስኩት)',
  'peanut-butter-cookies': 'የኦቾሎኒ ቅቤ ኩኪዎች',
  'chocolate-crinkle-cookies': 'የተሰነጣጠቁ የቸኮሌት ክሪንክል ኩኪዎች',
  'millionaires-shortbread': 'ሚሊየነርስ ሾርትብሬድ (ካራሜል እና ቸኮሌት)',
  stroopwafels: 'ስትሩፕዋፍልስ (የሆላንድ የካራሜል ዋፍል ብስኩት)',
  speculoos: 'ስፔኩሎስ (የቤልጂየም ቅመም ብስኩቶች)',
  'molasses-crinkle-cookies': 'የሞላሰስ እና ዝንጅብል ኩኪዎች',
  'chocolate-dipped-shortbread-fingers': 'በቸኮሌት የተነከሩ የሾርትብሬድ ጣቶች',
  'hazelnut-biscotti': 'የተጠበሰ ሄዘልነት እና ቸኮሌት ቢስኮቲ',
  'coconut-chocolate-bars': 'በቸኮሌት የተሸፈኑ የኮኮናት ባሮች',
  'lemon-shortbread': 'የሎሚ ሾርትብሬድ ብስኩት',
  'cherry-and-almond-bars': 'የቼሪ እና አልመንድ ፍራንጂፓን ባሮች',
  'black-and-white-cookies': 'የኒውዮርክ ጥቁር እና ነጭ ኩኪዎች',
  'hermit-cookies': 'ኸርሚት ኩኪዎች (በቅመማ ቅመም እና ደረቅ ፍራፍሬ)',
  'peppermint-bark-cookies': 'የቸኮሌት እና ፔፐርሚንት ኩኪዎች',
  'cardamom-shortbread': 'የኮረሪማ ሾርትብሬድ ብስኩት',
  'matcha-white-chocolate-cookies': 'የማቻ ሻይ እና ነጭ ቸኮሌት ኩኪዎች',
  'maple-pecan-cookies': 'የሜፕል ሽሮፕ እና ፔካን ኩኪዎች',
  'chocolate-oat-cookies': 'የአጃ እና ኮኮዋ ኩኪዎች',
  'lemon-ricotta-cookies': 'ለስላሳ የሎሚ እና ሪኮታ ኩኪዎች',
  'brown-sugar-shortbread': 'የቡናማ ስኳር ሾርትብሬድ',
  'fruit-and-nut-cookies': 'የደረቀ ፍራፍሬ እና ለውዝ ኩኪዎች',
  'chocolate-fudge-bars': 'የበለጸጉ የቸኮሌት ፋጅ ባሮች',
  'coconut-and-lime-bars': 'የኮኮናት እና ላይም ባሮች',
  maamoul: 'ማዕሙል (በቴምር ወይም ለውዝ የተሞላ የሰሞሊና ብስኩት)',
  ghraybeh: 'ጉራይባ (የቅቤ እና ፒስታቺዮ ብስኩት)',
  rugelach: 'ሩጌላኽ (በክሬም ቺዝ ሊጥ እና ለውዝ)',
  hamantaschen: 'ሃማንታሸን (በጃም የተሞሉ ባለ ሦስት ማዕዘን ፓስትሪዎች)',
  brookie: 'ብሩኪ (የብራውኒ እና ኩኪ ድብልቅ)',

  // Expanded Pies, Desserts & Confections
  'steak-pie': 'የበሬ ስጋ ፓይ (Steak Pie)',
  'sausage-rolls': 'በፓፍ ፓስትሪ የተጠቀለሉ የሶሴጅ ጥቅሎች',
  'lemon-tart': 'የፈረንሳይ ሎሚ ታርት (Tarte au Citron)',
  'chocolate-tart': 'ጥቁር ቸኮሌት ታርት (Tarte au Chocolat)',
  'spinach-and-feta-filo-pie': 'የቆስጣ (ስፒናች) እና ፌታ አይብ ፊሎ ፓይ',
  'tarte-tatin': 'ታርት ታታን (የተገለበጠ ካራሜላይዝድ ፖም ታርት)',
  'pecan-pie': 'የፔካን ለውዝ ካራሜል ፓይ',
  'key-lime-pie': 'ኪ ላይም ፓይ (Key Lime Pie)',
  'treacle-tart': 'ትሪክል ታርት (ወርቃማ ሽሮፕ ታርት)',
  empanadas: 'ኢምፓናዳስ (በስጋ ወይም አይብ የተሞሉ)',
  spanakopita: 'ስፓናኮፒታ (የግሪክ ስፒናች ፊሎ ትሪያንግሎች)',
  samosas: 'ሳምቡሳ (በቅመም ድንች እና አተር የተሞላ)',
  'cornish-pasty': 'ኮርኒሽ ፓስቲ (የስጋ እና አትክልት ፓስትሪ)',
  'cheese-and-onion-pasties': 'ጥርት ያሉ የአይብ እና ሽንኩርት ፓስቲዎች',
  'pigs-in-blankets': 'በፓፍ ፓስትሪ የተጠቀለሉ ሶሴጆች',
  'tarte-au-citron-meringuee': 'የሎሚ ሜሪንግ ታርት',
  'raspberry-tart': 'የራስበሪ እና ፓስትሪ ክሬም ታርት',
  'cheese-and-bacon-turnovers': 'የአይብ እና ቤከን ታርኖቨርስ',
  'sausage-plait': 'የተጎነጎነ የሶሴጅ ፓፍ ፓስትሪ',
  'spinach-and-ricotta-rolls': 'የስፒናች እና ሪኮታ ፓስትሪ ጥቅሎች',
  arancini: 'አራንቺኒ (የተጠበሱ የተሞሉ የጣሊያን ሩዝ ኳሶች)',
  'tarte-au-sucre': 'ታርት ኦ ሱክር (የቡናማ ስኳር እና ክሬም ታርት)',
  borek: 'ቦሬክ (የተጠቀለለ የአይብ እና ስፒናች ፓስትሪ)',
  'sticky-toffee-pudding': 'ስቲኪ ቶፊ ፑዲንግ (የቴምር ኬክ በሞቀ ቶፊ ሶስ)',
  'creme-caramel': 'ክላሲክ ክሬም ካራሜል',
  'bread-and-butter-pudding': 'የብሪዮሽ እና ቅቤ ፑዲንግ (በካስታርድ)',
  'apple-crumble': 'የፖም እና አጃ ክራምብል',
  'no-bake-cheesecake': 'ያለ መጋገር የሚዘጋጅ የቫኒላ እና ቤሪ ቺዝ ኬክ',
  clafoutis: 'ክላፉቲስ (የፈረንሳይ የተጋገረ ቼሪ ካስታርድ)',
  'chocolate-fondant': 'ቸኮሌት ፎንዳንት (የሚፈስ መሃል ያለው / Lava Cake)',
  'lemon-posset': 'ቀዝቃዛ ክሬማዊ የሎሚ ፖሴት',
  'rice-pudding': 'ክላሲክ የሩዝ ፑዲንግ (በቀረፋ እና ቫኒላ)',
  'floating-islands': 'ተንሳፋፊ ደሴቶች (Île Flottante)',
  'chocolate-marquise': 'ቀዝቃዛ ቸኮሌት ማርኪዝ',
  'peach-melba': 'ፒች ሜልባ (ኮክ፣ አይስ ክሬም እና ራስበሪ ሶስ)',
  'mango-sticky-rice': 'የታይላንድ ማንጎ እና ተጣባቂ ሩዝ በኮኮናት ወተት',
  'chocolate-budino': 'የጣሊያን ቸኮሌት ቡዲኖ',
  'butterscotch-pudding': 'የቡናማ ስኳር ባተርስኮች ፑዲንግ',
  'coffee-panna-cotta': 'የኤስፕሬሶ ቡና ፓና ኮታ',
  'peach-cobbler': 'የተቀመመ የኮክ ኮብለር',
  'banana-pudding': 'የሙዝ ፑዲንግ በካስታርድ እና ብስኩት',
  'chocolate-pot-de-creme': 'ሐር መሰል ቸኮሌት ፖ ደ ክሬም',
  'blueberry-clafoutis': 'የብሉቤሪ ክላፉቲስ',
  'pouding-chomeur': 'ፑዲንግ ሾመር (የሜፕል ሽሮፕ ፑዲንግ)',
  pavlova: 'ፓቭሎቫ (ጥርት ያለ ሜሪንግ በክሬም እና ፍራፍሬ)',
  'eton-mess': 'ኢተን ሜስ (ሜሪንግ፣ እንጆሪ እና ክሬም)',
  'banoffee-pie': 'ባኖፊ ፓይ (ሙዝ፣ ካራሜል እና ክሬም)',
  'chocolate-souffle': 'ትኩስ የቸኮሌት ሱፍሌ',
  profiteroles: 'ፕሮፊተሮልስ (በአይስ ክሬም እና ቸኮሌት ሶስ)',
  'treacle-sponge-pudding': 'በእንፋሎት የበሰለ የወርቃማ ሽሮፕ ስፖንጅ ፑዲንግ',
  semifreddo: 'ሴሚፍሬዶ (በማር እና አልመንድ ፕራሊን)',
  zabaglione: 'ዛባሊዮኔ (የሞቀ የተመታ የጣሊያን እንቁላል ክሬም)',
  'poached-pears-in-red-wine': 'በቅመማ ቅመም እና ወይን የተቀቀሉ ፒርሶች',
  'summer-pudding': 'የበጋ ቤሪ ፑዲንግ',
  'rum-baba': 'ባባ ኦ ራም (በሽሮፕ የረጠበ ኬክ በክሬም)',
  'mango-cheesecake': 'የማንጎ ቺዝ ኬክ',
  'lemon-syllabub': 'የሎሚ ሲላባብ (የተመታ ክሬም)',
  'coeur-a-la-creme': 'ከር አ ላ ክሬም (በፍሬሽ አይብ እና ክሬም)',
  'baked-ricotta-cheesecake': 'የተጋገረ የጣሊያን ሪኮታ ቺዝ ኬክ',
  'apple-charlotte': 'የፖም ሻርሎት (በተጠበሰ ብሪዮሽ)',
  'chocolate-bread-and-butter-pudding': 'የቸኮሌት ዳቦ እና ቅቤ ፑዲንግ',
  'rhubarb-crumble': 'የሩባርብ እና ዝንጅብል ክራምብል',
  'mango-sorbet': 'ከወተት ነጻ የማንጎ ሶርቤት',
  'vanilla-ice-cream': 'ክላሲክ የፈረንሳይ ቫኒላ ካስታርድ አይስ ክሬም',
  'chocolate-semifreddo': 'ጥቁር ቸኮሌት ሴሚፍሬዶ',
  'baked-alaska': 'ቤክድ አላስካ (በተጠበሰ ሜሪንግ)',
  flan: 'የስፔን ካራሜል ፍላን (Flan)',
  brigadeiros: 'ብሪጋዴይሮስ (የብራዚል የቸኮሌት ትራፍሎች)',
  loukoumades: 'ሉኩማዴስ (የግሪክ የማር እና ዋልነት ዶናቶች)',
  'cream-cheese-frosting': 'ክላሲክ የክሬም ቺዝ ፍሮስቲንግ',
  'apricot-glaze': 'አንጸባራቂ የአፕሪኮት ግሌዝ (Nappage)',
  'chocolate-glaze': 'አንጸባራቂ የሚፈስ የቸኮሌት ግሌዝ',
  'salted-caramel-sauce': 'ጨዋማ የካራሜል ሶስ',
  'dulce-de-leche': 'ዱልሴ ደ ሌቼ (የወተት ካራሜል)',
  'beurre-noisette': 'በር ኑዋዜት (የተጠበሰ ቡናማ ቅቤ)',
  'caramel-syrup': 'ለማጣፈጫ የሚሆን የካራሜል ሽሮፕ',
  'kirsch-syrup': 'የስፖንጅ ኬክ ማርጠቢያ ሽሮፕ (Kirsch/Cherry Syrup)',
  'toasted-breadcrumbs': 'በቅቤ የተጠበሰ የዳቦ ፍርፋሪ (ለሽትሩደል)',
  'stabilized-whipped-cream': 'በጄላቲን የተረጋጋ የተመታ ክሬም',
  'mirror-glaze': 'አንጸባራቂ የመስታወት ግሌዝ (Mirror Glaze)',
  'chocolate-decorations': 'ቴምፐርድ የቸኮሌት ማስጌጫዎች',
  craquelin: 'ክራኬሊን (ለሹ ፓስትሪ ጥርት ያለ ሽፋን)',
  praline: 'የአልመንድ እና ሄዘልነት ፕራሊን ፓስታ',
  'streusel-topping': 'ጥርት ያለ የቅቤ እና ስኳር ስትሪውሰል',
  'pistachio-paste': 'ንጹህ የፒስታቺዮ ፓስታ (ለፓስትሪ)',
  'caramelised-white-chocolate': 'ካራሜላይዝድ ነጭ ቸኮሌት (Blond Chocolate)',
  'tahini-halva': 'የሰሊጥ ታሂኒ ሃልቫ',
  'turkish-delight': 'ቱርኪሽ ዲላይት (ሎኩም በጽጌረዳ እና ፒስታቺዮ)',
  nougat: 'ኑጋት ደ ሞንቴሊማር (በማር እና አልመንድ)',
  'dabo-kolo': 'ዳቦ ቆሎ (የኢትዮጵያ የተቀመመ ጥርት ያለ ቆሎ)',
  'pastel-de-nata': 'ፓስቴል ደ ናታ (የፖርቱጋል ካስታርድ ታርት)',
  'gulab-jamun': 'ጉላብ ጃሙን (የህንድ ጣፋጭ በኮረሪማ ሽሮፕ)',
  melktert: 'ሜልክተርት (የደቡብ አፍሪካ ወተት እና ቀረፋ ታርት)',
  poffertjes: 'ፖፈርትየስ (የሆላንድ ትንንሽ ፓንኬኮች)',
  kolache: 'ኮላቼ (በፍራፍሬ እና አይብ የተሞላ የቼክ ፓስትሪ)',
  medovik: 'ሜዶቪክ (የሩሲያ ባለ ብዙ ንብርብር የማር ኬክ)',
  qatayef: 'ቃታዬፍ (የተጋገረ ወይም በክሬም እና ለውዝ የተሞላ)',
};

// Strictly preserve international metric units (g, kg, ml, L) for Amharic culinary training.
const UNIT_AM: Record<string, string> = {
  g: 'g',
  kg: 'kg',
  ml: 'ml',
  L: 'L',
  l: 'L',
  rings: 'ቀለበቶች',
  pod: 'ዘንግ',
  sheets: 'ቅጠሎች',
  croissants: 'ክሮሳኖች',
  nuts: 'ፍሬዎች',
  sausages: 'ሶሴጆች',
  peaches: 'ኮክ',
  pears: 'ፒርስ',
  cloves: 'ፍሬዎች',
  eggs: 'እንቁላሎች',
  large: 'ትልቅ',
  pcs: 'ቁርጥራጮች',
  piece: 'ቁርጥራጭ',
  pieces: 'ቁርጥራጮች',
  sprigs: 'ቅርንጫፎች',
  pinch: 'ቁንጥጫ',
  'to taste': 'እንደ ጣዕሙ',
};

export function localizeUnitAm(unit: string): string {
  return UNIT_AM[unit] || UNIT_AM[unit.toLowerCase()] || unit;
}

// Keep °C and °F intact! Only translate descriptive terms.
export function localizeTempAm(temp: string): string {
  return temp
    .replace(/Room temperature/gi, 'የክፍል ሙቀት')
    .replace(/No bake \(chilled\)/gi, 'ያለ መጋገር (ቀዝቃዛ)')
    .replace(/No bake/gi, 'ያለ መጋገር')
    .replace(/Chilled/gi, 'ቀዝቃዛ')
    .replace(/Stovetop/gi, 'በምድጃ/ምጣድ ላይ')
    .replace(/Steam/gi, 'በእንፋሎት')
    .replace(/Fry/gi, 'መጥበስ');
}

export function localizeTimeAm(time: string): string {
  return time
    .replace(/baking \+ cooling/gi, 'መጋገር + ማቀዝቀዝ')
    .replace(/\bminutes?\b/gi, 'ደቂቃ')
    .replace(/\bmin\b/gi, 'ደቂቃ')
    .replace(/\bhours?\b/gi, 'ሰዓት')
    .replace(/\bhrs?\b/gi, 'ሰዓት')
    .replace(/\bh\b/gi, 'ሰዓት')
    .replace(/\bdays?\b/gi, 'ቀናት')
    .replace(/\bweeks?\b/gi, 'ሳምንታት')
    .replace(/\bmonths?\b/gi, 'ወራት')
    .replace(/\bovernight\b/gi, 'ሌሊቱን ሙሉ')
    .replace(/\bchill\b/gi, 'ማቀዝቀዝ')
    .replace(/\bproofing\b/gi, 'ማሳደግ')
    .replace(/\bbake\b/gi, 'መጋገር');
}

// Keep cm, g, kg, ml, L intact!
export function localizeYieldAm(yieldText: string): string {
  return yieldText
    .replace(/\bportions?\b/gi, 'ድርሻዎች')
    .replace(/\bslices?\b/gi, 'ቁርጥራጮች')
    .replace(/\bloaves?\b/gi, 'ዳቦዎች')
    .replace(/\bloaf\b/gi, 'ዳቦ')
    .replace(/\bcookies?\b/gi, 'ኩኪዎች')
    .replace(/\bbiscuits?\b/gi, 'ብስኩቶች')
    .replace(/\bbars?\b/gi, 'ባሮች')
    .replace(/\brolls?\b/gi, 'ጥቅሎች')
    .replace(/\bbuns?\b/gi, 'ባንስ')
    .replace(/\btartlets?\b/gi, 'ትንንሽ ታርቶች')
    .replace(/\btarts?\b/gi, 'ታርቶች')
    .replace(/\bpies?\b/gi, 'ፓዮች')
    .replace(/\bcupcakes?\b/gi, 'ካፕ ኬኮች')
    .replace(/\bcakes?\b/gi, 'ኬኮች')
    .replace(/\bmuffins?\b/gi, 'ማፊኖች')
    .replace(/\bscones?\b/gi, 'ስኮኖች')
    .replace(/\bcroissants?\b/gi, 'ክሮሳኖች')
    .replace(/\bpizzas?\b/gi, 'ፒዛዎች')
    .replace(/\bpieces?\b/gi, 'ቁርጥራጮች')
    .replace(/\bballs?\b/gi, 'ኳሶች')
    .replace(/\bsquares?\b/gi, 'ካሬዎች')
    .replace(/\bpuffs?\b/gi, 'ፓፎች')
    .replace(/\bfingers?\b/gi, 'ጣቶች')
    .replace(/\bOne\b/g, 'አንድ')
    .replace(/\bTwo\b/g, 'ሁለት');
}

const INGREDIENT_TERMS_AM: [RegExp, string][] = [
  [/^Strong white bread flour$/i, 'ጠንካራ ነጭ የዳቦ ዱቄት'],
  [/^Strong white flour$/i, 'ጠንካራ ነጭ ዱቄት'],
  [/^Plain flour$/i, 'መደበኛ ነጭ ዱቄት (All-purpose)'],
  [/^Self-raising flour, sifted$/i, 'ራሱን የሚያነሳ ዱቄት፣ የተነፋ'],
  [/^Self-raising flour$/i, 'ራሱን የሚያነሳ ዱቄት (Self-raising flour)'],
  [/^Whole-wheat flour$/i, 'ሙሉ-ስንዴ ዱቄት (Whole-wheat flour)'],
  [/^Cake flour or plain flour, sifted$/i, 'የኬክ ዱቄት ወይም ለስላሳ ነጭ ዱቄት፣ የተነፋ'],
  [/^"00" pizza flour$/i, 'የጣሊያን «00» የፒዛ ዱቄት'],
  [/^Blanched almond flour$/i, 'የተላጠ የአልመንድ ዱቄት'],
  [/^Almond flour$/i, 'የአልመንድ ዱቄት'],
  [/^Ground almonds$/i, 'የተፈጨ አልመንድ'],
  [/^Cornflour$/i, 'የበቆሎ ዱቄት / ንሻ (Cornflour)'],
  [/^Cornstarch$/i, 'የበቆሎ ንሻ (Cornstarch)'],
  [/^Teff flour$/i, 'የጤፍ ዱቄት'],
  [/^Berbere spice blend.*$/i, 'የበርበሬ ቅመም ድብልቅ'],
  [/^Unsalted butter, softened$/i, 'ጨው የሌለው ቅቤ፣ የለሰለሰ'],
  [/^Unsalted butter, melted$/i, 'ጨው የሌለው ቅቤ፣ የቀለጠ'],
  [/^Unsalted butter, cubed$/i, 'ጨው የሌለው ቅቤ፣ በኩብ የተቆረጠ'],
  [/^Cold unsalted butter, cubed$/i, 'ቀዝቃዛ ጨው የሌለው ቅቤ፣ በኩብ የተቆረጠ'],
  [/^Cold unsalted butter block$/i, 'ቀዝቃዛ ጨው የሌለው የቅቤ ብሎክ'],
  [/^Unsalted butter$/i, 'ጨው የሌለው ቅቤ'],
  [/^Butter \(softened\)$/i, 'ቅቤ (የለሰለሰ)'],
  [/^Butter$/i, 'ቅቤ'],
  [/^Ghee$/i, 'የነጠረ ቅቤ (Ghee)'],
  [/^Caster sugar$/i, 'ደቃቅ ስኳር (Caster sugar)'],
  [/^Icing sugar, sifted$/i, 'አይሲንግ ስኳር (የዱቄት ስኳር)፣ የተነፋ'],
  [/^Icing sugar$/i, 'አይሲንግ ስኳር (የዱቄት ስኳር)'],
  [/^Soft brown sugar$/i, 'ለስላሳ ቡናማ ስኳር'],
  [/^Light brown sugar$/i, 'ፈካ ያለ ቡናማ ስኳር'],
  [/^Dark brown sugar$/i, 'ጠቆር ያለ ቡናማ ስኳር'],
  [/^Brown sugar$/i, 'ቡናማ ስኳር'],
  [/^Granulated sugar$/i, 'መደበኛ ነጭ ስኳር'],
  [/^Demerara sugar$/i, 'ደሜራራ ሻካራ ቡናማ ስኳር'],
  [/^Sugar$/i, 'ስኳር'],
  [/^Honey$/i, 'ተፈጥሯዊ ማር'],
  [/^Golden syrup$/i, 'ወርቃማ ሽሮፕ (Golden syrup)'],
  [/^Glucose syrup$/i, 'የግሉኮስ ሽሮፕ'],
  [/^Whole eggs$/i, 'ሙሉ እንቁላሎች'],
  [/^Eggs, room temperature$/i, 'እንቁላሎች (በክፍል ሙቀት)'],
  [/^Eggs \(large\)$/i, 'እንቁላሎች (ትልልቅ)'],
  [/^Eggs$/i, 'እንቁላሎች'],
  [/^Whole egg$/i, 'ሙሉ እንቁላል'],
  [/^Egg$/i, 'እንቁላል'],
  [/^Egg yolks$/i, 'የእንቁላል አስኳሎች'],
  [/^Egg yolk$/i, 'የእንቁላል አስኳል'],
  [/^Egg whites, room temperature$/i, 'የእንቁላል ነጭ (በክፍል ሙቀት)'],
  [/^Egg whites$/i, 'የእንቁላል ነጭ'],
  [/^Egg wash$/i, 'የእንቁላል መቀቢያ (Egg wash)'],
  [/^Whole milk$/i, 'ሙሉ ወተት'],
  [/^Milk, lukewarm$/i, 'ለብ ያለ ወተት'],
  [/^Milk, cold$/i, 'ቀዝቃዛ ወተት'],
  [/^Warm milk$/i, 'ሞቅ ያለ ወተት'],
  [/^Milk$/i, 'ወተት'],
  [/^Buttermilk$/i, 'ባተርሚልክ (የተገፋ እርጎ/አሬራ)'],
  [/^Plant milk$/i, 'የእፅዋት ወተት'],
  [/^Double cream$/i, 'ወፍራም የመምቻ ክሬም (Double cream, 35%+ ቅባት)'],
  [/^Double cream \(cold, 35% fat minimum\)$/i, 'ቀዝቃዛ ወፍራም ክሬም (ቢያንስ 35% ቅባት)'],
  [/^Sour cream$/i, 'ሳወር ክሬም (ኮምጣጣ ክሬም)'],
  [/^Cream cheese$/i, 'ክሬም ቺዝ (Cream cheese)'],
  [/^Mascarpone$/i, 'ማስካርፖኔ አይብ'],
  [/^Yoghurt$/i, 'እርጎ'],
  [/^Baking powder$/i, 'ቤኪንግ ፓውደር'],
  [/^Baking soda$/i, 'ቤኪንግ ሶዳ'],
  [/^Cream of tartar$/i, 'ክሬም ኦፍ ታርታር'],
  [/^Instant yeast$/i, 'ፈጣን ደረቅ እርሾ (Instant yeast)'],
  [/^Dried yeast$/i, 'ደረቅ እርሾ'],
  [/^Fresh yeast$/i, 'ትኩስ እርሾ'],
  [/^Fine salt$/i, 'ደቃቅ ጨው'],
  [/^Sea salt flakes$/i, 'የባህር ጨው ቅንጣቶች'],
  [/^Sea salt$/i, 'የባህር ጨው'],
  [/^Salt$/i, 'ጨው'],
  [/^Water, lukewarm$/i, 'ለብ ያለ ውሃ'],
  [/^Lukewarm water \(28–30 °C\)$/i, 'ለብ ያለ ውሃ (28–30 °C)'],
  [/^Warm water$/i, 'ሞቅ ያለ ውሃ'],
  [/^Cold water$/i, 'ቀዝቃዛ ውሃ'],
  [/^Ice-cold water$/i, 'በበረዶ የቀዘቀዘ ውሃ'],
  [/^Hot water$/i, 'ሙቅ ውሃ'],
  [/^Water$/i, 'ውሃ'],
  [/^Vanilla extract$/i, 'የቫኒላ ኤክስትራክት'],
  [/^Vanilla pod$/i, 'የቫኒላ ዘንግ'],
  [/^Dark chocolate \(70%\), chopped$/i, 'ጥቁር ቸኮሌት (70%)፣ የተከተፈ'],
  [/^Dark chocolate \(60–70%\)$/i, 'ጥቁር ቸኮሌት (60–70%)'],
  [/^Dark chocolate \(chopped\)$/i, 'ጥቁር ቸኮሌት (የተከተፈ)'],
  [/^Dark chocolate chips$/i, 'ጥቁር የቸኮሌት ቺፕስ'],
  [/^Cocoa powder, sifted$/i, 'የኮኮዋ ዱቄት፣ የተነፋ'],
  [/^Unsweetened cocoa powder$/i, 'ያልጣፈጠ የኮኮዋ ዱቄት'],
  [/^Cocoa powder$/i, 'የኮኮዋ ዱቄት'],
  [/^Olive oil$/i, 'የወይራ ዘይት'],
  [/^Vegetable oil$/i, 'የአትክልት ዘይት'],
  [/^Lemon juice, fresh$/i, 'ትኩስ የሎሚ ጭማቂ'],
  [/^Lemon juice$/i, 'የሎሚ ጭማቂ'],
  [/^Lemon zest$/i, 'የተፈቀፈቀ የሎሚ ልጣጭ'],
  [/^Ground cinnamon$/i, 'የተፈጨ ቀረፋ'],
  [/^Cinnamon$/i, 'ቀረፋ'],
  [/^Cardamom, ground$/i, 'የተፈጨ ኮረሪማ / ሄል'],
  [/^Ground ginger$/i, 'የተፈጨ ዝንጅብል'],
  [/^Rolled oats$/i, 'የተዳመጠ አጃ (Rolled oats)'],
  [/^Raisins$/i, 'ዘቢብ'],
  [/^Gelatine sheets \(gold\)$/i, 'የጄላቲን ቅጠሎች (Gold)'],
  [/^Crème pâtissière$/i, 'ክሬም ፓቲሲየር (የፓስትሪ ክሬም)'],
  [/^Crème anglaise$/i, 'ክሬም አንግሌዝ'],
  [/^Pistachios, chopped$/i, 'የተከተፈ ፒስታቺዮ'],
  [/^Shortcrust pastry$/i, 'ሾርትክራስት ፓስትሪ'],
  [/^Filo pastry sheets$/i, 'የፊሎ ፓስትሪ ቅጠሎች'],
  [/^Fresh blueberries$/i, 'ትኩስ ብሉቤሪ'],
  [/^Mozzarella, grated$/i, 'የተፈቀፈቀ ሞዛሬላ አይብ'],
  [/^Gruyère cheese, grated$/i, 'የተፈቀፈቀ ግሩዬር አይብ'],
  [/^Garlic, minced$/i, 'በደቃቁ የተከተፈ ነጭ ሽንኩርት'],
  [/^Dried oregano$/i, 'ደረቅ ኦሬጋኖ'],
];

export function localizeIngredientNameAm(name: string): string {
  const prefixMap: Record<string, string> = {
    'Dough:': 'ሊጥ:',
    'Filling:': 'መሙያ:',
    'Icing:': 'ሽፋን (Icing):',
    'Topping:': 'የላይኛው ሽፋን:',
    'Syrup:': 'ሽሮፕ:',
    'Base:': 'መሠረት:',
    'Shells:': 'ቅርፊቶች:',
    'Streusel:': 'ስትሪውሰል:',
    'Meringue:': 'ሜሪንግ:',
    'Détrempe:': 'መሠረታዊ ሊጥ (Détrempe):',
    'Beurrage:': 'የቅቤ ንብርብር (Beurrage):',
    'Mascarpone Cream:': 'ማስካርፖኔ ክሬም:',
  };

  let working = name.trim();
  let prefixAm = '';
  for (const [enP, amP] of Object.entries(prefixMap)) {
    if (working.startsWith(enP)) {
      prefixAm = `${amP} `;
      working = working.slice(enP.length).trim();
      break;
    }
  }

  for (const [regex, am] of INGREDIENT_TERMS_AM) {
    if (regex.test(working)) {
      return `${prefixAm}${am}`;
    }
  }

  // Fallback culinary phrase/word translation preserving metric quantities and °C
  const translated = working
    .replace(/Strong white bread flour/gi, 'ጠንካራ ነጭ የዳቦ ዱቄት')
    .replace(/Strong bread flour/gi, 'ጠንካራ የዳቦ ዱቄት')
    .replace(/Bread flour/gi, 'የዳቦ ዱቄት')
    .replace(/Whole-wheat flour/gi, 'ሙሉ-ስንዴ ዱቄት')
    .replace(/Plain flour/gi, 'መደበኛ ነጭ ዱቄት')
    .replace(/Self-raising flour/gi, 'ራሱን የሚያነሳ ዱቄት')
    .replace(/Rye flour/gi, 'የራይ ዱቄት')
    .replace(/Buckwheat flour/gi, 'የባክዊት ዱቄት')
    .replace(/Almond flour/gi, 'የአልመንድ ዱቄት')
    .replace(/Almond meal/gi, 'የተፈጨ አልመንድ')
    .replace(/Semolina/gi, 'ሰሞሊና')
    .replace(/Cornflour/gi, 'የበቆሎ ዱቄት (Cornflour)')
    .replace(/Cornstarch/gi, 'የበቆሎ ንሻ (Cornstarch)')
    .replace(/Unsalted butter/gi, 'ጨው የሌለው ቅቤ')
    .replace(/Brown butter/gi, 'የተጠበሰ ቡናማ ቅቤ')
    .replace(/Caster sugar/gi, 'ደቃቅ ስኳር')
    .replace(/Icing sugar/gi, 'አይሲንግ ስኳር')
    .replace(/Demerara sugar/gi, 'ደሜራራ ስኳር')
    .replace(/Light brown sugar/gi, 'ፈካ ያለ ቡናማ ስኳር')
    .replace(/Dark brown sugar/gi, 'ጠቆር ያለ ቡናማ ስኳር')
    .replace(/Soft brown sugar/gi, 'ለስላሳ ቡናማ ስኳር')
    .replace(/Brown sugar/gi, 'ቡናማ ስኳር')
    .replace(/Granulated sugar/gi, 'ነጭ ስኳር')
    .replace(/Dark chocolate/gi, 'ጥቁር ቸኮሌት')
    .replace(/Milk chocolate/gi, 'የወተት ቸኮሌት')
    .replace(/White chocolate/gi, 'ነጭ ቸኮሌት')
    .replace(/Cocoa powder/gi, 'የኮኮዋ ዱቄት')
    .replace(/Double cream/gi, 'ወፍራም ክሬም')
    .replace(/Heavy cream/gi, 'ወፍራም ክሬም')
    .replace(/Whipped cream/gi, 'የተመታ ክሬም')
    .replace(/Chantilly cream/gi, 'ክሬም ሻንቲይ')
    .replace(/Sour cream/gi, 'ሳወር ክሬም')
    .replace(/Cream cheese/gi, 'ክሬም ቺዝ')
    .replace(/Whole milk/gi, 'ሙሉ ወተት')
    .replace(/Evaporated milk/gi, 'የተነነ ወተት (Evaporated milk)')
    .replace(/Sweetened condensed milk/gi, 'የጣፈጠ የታመቀ ወተት (Condensed milk)')
    .replace(/Coconut milk/gi, 'የኮኮናት ወተት')
    .replace(/Buttermilk/gi, 'ባተርሚልክ')
    .replace(/Vanilla extract/gi, 'የቫኒላ ኤክስትራክት')
    .replace(/Vanilla pod/gi, 'የቫኒላ ዘንግ')
    .replace(/Vanilla bean/gi, 'የቫኒላ ዘንግ')
    .replace(/Baking powder/gi, 'ቤኪንግ ፓውደር')
    .replace(/Baking soda/gi, 'ቤኪንግ ሶዳ')
    .replace(/Cream of tartar/gi, 'ክሬም ኦፍ ታርታር')
    .replace(/Instant yeast/gi, 'ፈጣን እርሾ')
    .replace(/Fresh yeast/gi, 'ትኩስ እርሾ')
    .replace(/Sourdough starter/gi, 'የሳወርዶ እርሾ (Starter)')
    .replace(/Sheet gelatine/gi, 'የጄላቲን ቅጠሎች')
    .replace(/Egg yolks/gi, 'የእንቁላል አስኳሎች')
    .replace(/Egg yolk/gi, 'የእንቁላል አስኳል')
    .replace(/Egg whites/gi, 'የእንቁላል ነጭ')
    .replace(/Whole eggs/gi, 'ሙሉ እንቁላሎች')
    .replace(/Olive oil/gi, 'የወይራ ዘይት')
    .replace(/Vegetable oil/gi, 'የአትክልት ዘይት')
    .replace(/Lemon juice/gi, 'የሎሚ ጭማቂ')
    .replace(/Lime juice/gi, 'የላይም ጭማቂ')
    .replace(/Lemon zest/gi, 'የሎሚ ልጣጭ')
    .replace(/Orange zest/gi, 'የብርቱካን ልጣጭ')
    .replace(/Ground cinnamon/gi, 'የተፈጨ ቀረፋ')
    .replace(/Cinnamon stick/gi, 'የቀረፋ እንጨት')
    .replace(/Ground almonds/gi, 'የተፈጨ አልመንድ')
    .replace(/Almonds/gi, 'አልመንድ')
    .replace(/Walnuts/gi, 'ዋልነት')
    .replace(/Pistachios/gi, 'ፒስታቺዮ')
    .replace(/Hazelnuts/gi, 'ሄዘልነት')
    .replace(/Pecans/gi, 'ፔካን')
    .replace(/Peanuts/gi, 'ኦቾሎኒ')
    .replace(/Rolled oats/gi, 'የተዳመጠ አጃ')
    .replace(/Raisins/gi, 'ዘቢብ')
    .replace(/Strawberries/gi, 'እንጆሪ')
    .replace(/Raspberries/gi, 'ራስበሪ')
    .replace(/Blueberries/gi, 'ብሉቤሪ')
    .replace(/Apples/gi, 'ፖም')
    .replace(/Bananas/gi, 'ሙዝ')
    .replace(/Dates/gi, 'ቴምር')
    .replace(/Fine salt/gi, 'ደቃቅ ጨው')
    .replace(/Sea salt/gi, 'የባህር ጨው')
    .replace(/Maple syrup/gi, 'የሜፕል ሽሮፕ')
    .replace(/Golden syrup/gi, 'ወርቃማ ሽሮፕ')
    .replace(/Glucose syrup/gi, 'የግሉኮስ ሽሮፕ')
    .replace(/Apricot jam/gi, 'የአፕሪኮት ጃም')
    .replace(/Ricotta/gi, 'ሪኮታ አይብ')
    .replace(/Mozzarella/gi, 'ሞዛሬላ')
    .replace(/Rosewater/gi, 'የጽጌረዳ ውሃ')
    .replace(/Cardamom/gi, 'ኮረሪማ')
    .replace(/\bsoftened\b/gi, 'የለሰለሰ')
    .replace(/\bmelted\b/gi, 'የቀለጠ')
    .replace(/\bsifted\b/gi, 'የተነፋ')
    .replace(/\bchopped\b/gi, 'የተከተፈ')
    .replace(/\bgrated\b/gi, 'የተፈቀፈቀ')
    .replace(/\btoasted\b/gi, 'የተጠበሰ')
    .replace(/\boptional\b/gi, 'አማራጭ')
    .replace(/\blukewarm\b/gi, 'ለብ ያለ')
    .replace(/\bcold\b/gi, 'ቀዝቃዛ')
    .replace(/\bwarm\b/gi, 'ሞቅ ያለ')
    .replace(/\bwater\b/gi, 'ውሃ')
    .replace(/\bmilk\b/gi, 'ወተት')
    .replace(/\bbutter\b/gi, 'ቅቤ')
    .replace(/\bsugar\b/gi, 'ስኳር')
    .replace(/\bflour\b/gi, 'ዱቄት')
    .replace(/\bsalt\b/gi, 'ጨው')
    .replace(/\bhoney\b/gi, 'ማር')
    .replace(/\beggs?\b/gi, 'እንቁላል');

  return `${prefixAm}${translated}`;
}

const CLASSIFICATION_AM: Record<string, string> = {
  'Creamed butter cake': 'የተመታ የቅቤ ኬክ',
  'Egg-white foam cake': 'በእንቁላል ነጭ አረፋ ኬክ',
  'Skillet or tin cake': 'የመጥበሻ ወይም ቆርቆሮ ኬክ',
  'Dense butter cake': 'ጥቅጥቅ ያለ የቅቤ ኬክ',
  'Breakfast cake': 'የቁርስ ኬክ',
  'Egg-free, dairy-free chocolate cake': 'ያለ እንቁላል እና ወተት የቸኮሌት ኬክ',
  'Milk-soaked sponge': 'በወተት የረጠበ ስፖንጅ ኬክ',
  'Classic butter loaf': 'ክላሲክ የቅቤ ዳቦ ኬክ',
  'Yeast-leavened bread': 'በእርሾ የቦካ ዳቦ',
  'Yeast bread': 'የእርሾ ዳቦ',
  'Lean dough': 'ቀላል (ስብ የሌለበት) ሊጥ',
  'Bread (whole-wheat)': 'ሙሉ-ስንዴ ዳቦ',
  'Enriched dough': 'የበለጸገ ሊጥ',
  'Enriched sweet dough': 'የበለጸገ ጣፋጭ ሊጥ',
  'Olive oil flatbread': 'የወይራ ዘይት ጠፍጣፋ ዳቦ',
  'Enriched egg dough': 'በእንቁላል የበለጸገ ሊጥ',
  'Bread (sourdough)': 'ሳወርዶ ዳቦ',
  'Artisan sourdough': 'አርቲዛን ሳወርዶ',
  'Enriched yeast dough': 'የበለጸገ የእርሾ ሊጥ',
  'Laminated yeast pastry': 'የተነባበረ የእርሾ ፓስትሪ',
  'Laminated enriched dough': 'የተነባበረ የበለጸገ ሊጥ',
  'Laminated pastry': 'የተነባበረ ፓስትሪ',
  'Pastry (puff)': 'ፓፍ ፓስትሪ',
  'Pastry (choux)': 'ሹ ፓስትሪ',
  'Choux pastry': 'ሹ ፓስትሪ',
  'Shortcrust pastry': 'ሾርትክራስት ፓስትሪ',
  'Short pastry': 'ሾርት ፓስትሪ',
  'Tart base': 'የታርት መሠረት',
  'Pizza dough': 'የፒዛ ሊጥ',
  'Medium-hydration dough': 'መካከለኛ ውሃ ያለው ሊጥ',
  'Pan pizza': 'የመጥበሻ ፒዛ',
  'Pizza sauce': 'የፒዛ ሶስ',
  'Savoury tart': 'ጨዋማ ታርት',
  'Double-crust fruit pie': 'ባለ ሁለት ቅርፊት የፍራፍሬ ፓይ',
  'Sweet pie': 'ጣፋጭ ፓይ',
  'Whipped cream': 'የተመታ ክሬም',
  'Aerated cream': 'አየር የተሞላበት ክሬም',
  'Pouring custard': 'የሚፈስ ካስታርድ',
  'Cooked custard cream': 'የበሰለ ካስታርድ ክሬም',
  'Cooked starch custard': 'በዱቄት የወፈረ የበሰለ ካስታርድ',
  'Egg yolk custard': 'የእንቁላል አስኳል ካስታርድ',
  'Aerated pastry cream': 'አየር የተሞላበት የፓስትሪ ክሬም',
  'Fruit curd': 'የፍራፍሬ ከርድ',
  Cream: 'የፓስትሪ ክሬም',
  'Icing/filling': 'ሽፋን / መሙያ',
  'Filling/glaze': 'መሙያ / ግሌዝ',
  'Frosting / Glaze': 'ፍሮስቲንግ / ግሌዝ',
  Cake: 'ኬክ',
  Cookie: 'ኩኪ',
  'Biscuit/cookie': 'ብስኩት / ኩኪ',
  Biscuit: 'ብስኩት',
  'Chewy drop cookie': 'ለስላሳ ኩኪ',
  'Chocolate bar cookie': 'የቸኮሌት ባር ኩኪ',
  'Quick bread/muffin': 'ፈጣን ዳቦ / ማፊን',
  'Melted-chocolate butter cake': 'የቀለጠ ቸኮሌት እና ቅቤ ኬክ',
  'Regional festive bread': 'ባህላዊ የበዓል ዳቦ',
  'Gluten-free bread': 'ከግሉተን ነጻ ዳቦ',
  'Gluten-free cake': 'ከግሉተን ነጻ ኬክ',
  'Vegan cake': 'ቪጋን ኬክ',
  Flatbread: 'ጠፍጣፋ ዳቦ',
  'Set cream dessert': 'የረጋ ክሬም ጣፋጭ',
  'Dessert (set cream)': 'የረጋ ክሬም ጣፋጭ',
  'Dessert (baked custard)': 'የተጋገረ ካስታርድ ጣፋጭ',
  'Baked custard': 'የተጋገረ ካስታርድ',
  'Cream cheese cake': 'ክሬም ቺዝ ኬክ',
  'Italian coffee dessert': 'ጣሊያናዊ የቡና ጣፋጭ',
  'Layered nut pastry': 'የተነባበረ የለውዝ ፓስትሪ',
  'Fried choux dough': 'የተጠበሰ ሹ ሊጥ',
};

export function localizeClassificationAm(classification: string): string {
  if (CLASSIFICATION_AM[classification]) return CLASSIFICATION_AM[classification];
  return classification
    .replace(/Creamed/gi, 'የተመታ')
    .replace(/Sponge/gi, 'ስፖንጅ')
    .replace(/Butter/gi, 'ቅቤ')
    .replace(/Chocolate/gi, 'ቸኮሌት')
    .replace(/Pastry/gi, 'ፓስትሪ')
    .replace(/Custard/gi, 'ካስታርድ')
    .replace(/Bread/gi, 'ዳቦ')
    .replace(/Cake/gi, 'ኬክ')
    .replace(/Cookie/gi, 'ኩኪ')
    .replace(/Biscuit/gi, 'ብስኩት')
    .replace(/Tart/gi, 'ታርት')
    .replace(/Pie/gi, 'ፓይ')
    .replace(/Dessert/gi, 'ጣፋጭ');
}

// Keep °C, g, kg, ml, L intact!
export function localizeStorageAm(storage: string | undefined): string | undefined {
  if (!storage) return storage;
  return storage
    .replace(/Airtight container/gi, 'አየር በማያስገባ ዕቃ')
    .replace(/Room temperature/gi, 'በክፍል ሙቀት')
    .replace(/Keep refrigerated/gi, 'በማቀዝቀዣ ውስጥ ያቆዩ')
    .replace(/Refrigerate/gi, 'በማቀዝቀዣ ውስጥ ያስቀምጡ')
    .replace(/Refrigerated/gi, 'በማቀዝቀዣ ውስጥ')
    .replace(/Keep chilled/gi, 'ቀዝቃዛ ቦታ ያስቀምጡ (0–5 °C)')
    .replace(/Cover surface with cling film/gi, 'ላዩን በክሊንግ ፊልም ይሸፍኑ')
    .replace(/Wrap in cling film/gi, 'በክሊንግ ፊልም ይጠቅልሉ')
    .replace(/Paper bag/gi, 'በወረቀት ከረጢት')
    .replace(/reheat to/gi, 'እስከ ... ያሙቁ')
    .replace(/Freeze/gi, 'በፍሪዘር ያስቀምጡ')
    .replace(/frozen/gi, 'በፍሪዘር')
    .replace(/ambient/gi, 'በክፍል ሙቀት')
    .replace(/\bup to\b/gi, 'እስከ')
    .replace(/\bdays?\b/gi, 'ቀናት')
    .replace(/\bhours?\b/gi, 'ሰዓታት')
    .replace(/\bweeks?\b/gi, 'ሳምንታት')
    .replace(/\bmonths?\b/gi, 'ወራት');
}
