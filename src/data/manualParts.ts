export interface ManualTable {
  headers: string[];
  rows: string[][];
}

export interface ManualSectionBlock {
  type: 'paragraph' | 'list' | 'ordered' | 'table' | 'callout' | 'subheading' | 'h4' | 'h5' | 'workflow' | 'recipe' | 'code';
  text?: string;
  caption?: string;
  recipeId?: string;
  items?: string[];
  table?: ManualTable;
}

export interface ManualPart {
  id: string;
  label: string;
  title: string;
  pageNumber: number;
  summary: string;
  blocks: ManualSectionBlock[];
}

export interface TocEntry {
  id: string;
  chapter: string;
  subject: string;
  page: number;
  isSub?: boolean;
}

export const FRONT_MATTER_BLOCKS: ManualSectionBlock[] = [
  {
    type: 'subheading',
    text: 'Purpose of this book',
  },
  {
    type: 'paragraph',
    text: 'This textbook develops professional knowledge and practical skills in bakery, pastry, bread and pizza production. It combines culinary theory with standardized recipes, production procedures, quality-control standards, costing methods, food safety and practical training exercises.',
  },
  {
    type: 'list',
    items: [
      'Why ingredients behave differently during preparation and baking.',
      'How to select the correct production method.',
      'How to achieve consistent product quality.',
      'How to calculate recipe quantities and production yields.',
      'How to manage a professional bakery or pastry section.',
      'How to control production costs and selling prices.',
      'How to identify and correct common production faults.',
    ],
  },
  {
    type: 'subheading',
    text: 'Intended readers',
  },
  {
    type: 'ordered',
    items: [
      'Culinary arts students.',
      'Professional chefs and pastry chefs.',
      'Bakery and pastry trainees.',
      'Restaurant and hotel operators.',
      'Bakery business owners.',
      'Culinary instructors and training institutions.',
    ],
  },
  {
    type: 'subheading',
    text: 'Standard recipe format',
  },
  {
    type: 'table',
    table: {
      headers: ['Section', 'Information'],
      rows: [
        ['Recipe name', 'Standard product name'],
        ['Classification', 'Cake, bread, pastry, dessert, etc.'],
        ['Yield', 'Number of portions or finished weight'],
        ['Preparation time', 'Active preparation'],
        ['Production time', 'Mixing, resting, proofing and baking'],
        ['Ingredients', 'Exact metric quantities'],
        ['Equipment', 'Required tools and machinery'],
        ['Method', 'Numbered preparation instructions'],
        ['Temperature', 'Oven temperature in °C'],
        ['Quality standard', 'Expected finished product'],
        ['Fault correction', 'Common problems and solutions'],
        ['Storage', 'Safe storage and handling'],
        ["Chef's notes", 'Professional production tips'],
      ],
    },
  },
];

export const TOC_ENTRIES: TocEntry[] = [
  { id: 'front-matter', chapter: 'Front Matter', subject: 'Purpose, intended readers & standard recipe format', page: 2 },
  { id: 'part-1', chapter: '1', subject: 'Introduction, kitchen organization and equipment', page: 5 },
  { id: 'part-2', chapter: '2', subject: 'Ingredients, measurements and baking science', page: 7 },
  { id: 'part-3', chapter: '3', subject: 'Basic bakery techniques and mixing methods', page: 10 },
  { id: 'part-6', chapter: '4', subject: 'Cakes: sponge, butter, chocolate, fruit and specialty cakes', page: 14 },
  { id: 'ch-5', chapter: '5', subject: 'Cake fillings, creams, icings and decorations', page: 18 },
  { id: 'ch-6', chapter: '6', subject: 'Pastry: shortcrust, puff, choux, filo and Danish pastry', page: 22 },
  { id: 'part-7', chapter: '7', subject: 'Croissants, doughnuts, muffins, cookies and biscuits', page: 26 },
  { id: 'part-4', chapter: '8', subject: 'Bread: white, brown, whole-wheat, sourdough and specialty breads', page: 30 },
  { id: 'part-5', chapter: '9', subject: 'Pizza: dough, sauces, toppings and professional production', page: 35 },
  { id: 'ch-10', chapter: '10', subject: 'Pies, tarts, quiches and savoury bakery products', page: 39 },
  { id: 'part-8', chapter: '11', subject: 'Desserts, puddings and plated pastry', page: 43 },
  { id: 'part-12', chapter: '12', subject: 'Production planning, costing and pricing (USD)', page: 48 },
  { id: 'part-13', chapter: '13', subject: 'Food safety, hygiene, storage and shelf life', page: 52 },
  { id: 'ch-14', chapter: '14', subject: 'Troubleshooting and professional reference charts', page: 56 },
  { id: 'ch-15', chapter: '15', subject: 'Creams and cream-based preparations', page: 60 },
  { id: 'part-11', chapter: 'Appendix', subject: 'Expanded recipe collection (Batches 1–2)', page: 64 },
  { id: 'master-index', chapter: 'Index', subject: 'Master recipe index (439 recipes)', page: 82 },
  { id: 'back-matter', chapter: 'Back Matter', subject: 'Professional practice notes & reference summary', page: 88 },
];

export const MANUAL_PARTS: ManualPart[] = [
  {
    id: 'front-matter',
    label: 'Front Matter',
    title: 'Front Matter & Standard Recipe Format',
    pageNumber: 2,
    summary: 'Textbook purpose, intended professional audience, metric/°C/USD standards, and the 13-part standardized recipe specification.',
    blocks: FRONT_MATTER_BLOCKS,
  },
  {
    id: 'part-1',
    label: 'Chapter 1',
    title: 'Introduction, Kitchen Organization & Equipment',
    pageNumber: 5,
    summary: 'Main bakery product categories, the 10-station bakery workflow, essential equipment, and Classic White Sandwich Bread.',
    blocks: [
      {
        type: 'subheading',
        text: '1.1 Introduction',
      },
      {
        type: 'paragraph',
        text: 'Bakery and pastry production is a specialized branch of culinary arts concerned with preparing products using flour, sugar, fats, eggs, dairy products, raising agents, yeast and other ingredients. It requires technical knowledge, accurate measurements, ingredient selection, temperature control, mixing and handling skills, fermentation management, baking techniques, product presentation, and food safety and hygiene.',
      },
      {
        type: 'subheading',
        text: '1.2 Main bakery and pastry product categories',
      },
      {
        type: 'table',
        table: {
          headers: ['Category', 'Products'],
          rows: [
            ['Cakes', 'Sponge cakes, butter cakes, chocolate cakes, fruit cakes'],
            ['Bread', 'White bread, brown bread, whole-wheat bread, baguettes'],
            ['Pastry', 'Shortcrust, puff pastry, choux pastry, Danish pastry'],
            ['Viennoiserie', 'Croissants, pain au chocolat, Danish pastries'],
            ['Quick breads', 'Muffins, banana bread, soda bread'],
            ['Biscuits and cookies', 'Shortbread, butter cookies, chocolate chip cookies'],
            ['Pizza', 'Neapolitan, New York, pan and thin-crust pizza'],
            ['Savoury bakery', 'Meat pies, sausage rolls, quiches and cheese pastries'],
            ['Desserts', 'Cheesecake, panna cotta, tarts, plated desserts'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '1.3 Organization of a professional bakery',
      },
      {
        type: 'ordered',
        items: [
          'Receiving area — inspect ingredients, verify quantities, check temperatures, reject unsuitable deliveries.',
          'Dry storage — clean, dry, ventilated, protected from pests, labelled, rotated.',
          'Refrigerated storage — cream, butter, milk, eggs, prepared fillings at 0–5°C.',
          'Weighing and preparation area — measuring ingredients, preparing batches.',
          'Mixing area — cake batters, bread doughs, pastry mixtures, creams.',
          'Dough preparation and shaping area — dividing, moulding, rolling, cutting, shaping.',
          'Proofing area — controlled fermentation of yeast-raised products.',
          'Baking area — ovens and associated equipment.',
          'Cooling and finishing area — cooling, filling, glazing, decorating.',
          'Packing and dispatch area — packaging, labelling, preparing for sale.',
        ],
      },
      {
        type: 'workflow',
        caption: 'Illustration 1.1 — Professional bakery workflow',
        items: [
          'Receiving',
          'Storage',
          'Weighing',
          'Mixing',
          'Shaping',
          'Proofing',
          'Baking',
          'Cooling',
          'Finishing',
          'Packing & Sale',
        ],
      },
      {
        type: 'subheading',
        text: '1.4 Essential bakery equipment',
      },
      {
        type: 'table',
        table: {
          headers: ['Equipment', 'Primary Use'],
          rows: [
            ['Digital scale', 'Accurate weighing in grams and kilograms'],
            ['Planetary mixer', 'Cake batters, creams, meringues, small bread doughs'],
            ['Spiral mixer', 'Medium and large bread and pizza dough batches'],
            ['Deck oven', 'Bread, pizza and crusty baked goods'],
            ['Convection oven', 'Cakes, pastries, cookies and biscuits'],
            ['Proofer', 'Controlled temperature and humidity for yeast dough'],
            ['Dough sheeter', 'Rolling puff, croissant and Danish pastry evenly'],
            ['Cooling racks', 'Air circulation around baked products'],
            ['Marble slab', 'Chocolate tempering and pastry rolling'],
            ['Piping bags and nozzles', 'Creams, icing, choux pastry, decoration'],
            ['Dough scraper and bench knife', 'Dividing, scraping and cleaning surfaces'],
            ['Pastry brushes', 'Applying egg wash, glazes and butter'],
            ['Thermometers', 'Checking dough, oven, chocolate and sugar temperatures'],
            ['Baking trays and tins', 'Loaf pans, cake tins, tart rings, perforated sheets'],
          ],
        },
      },
      {
        type: 'recipe',
        recipeId: 'white-sandwich-bread',
      },
    ],
  },
  {
    id: 'part-2',
    label: 'Chapter 2',
    title: 'Ingredients, Measurements & Baking Science',
    pageNumber: 7,
    summary: 'Functions of key ingredients, metric measurement standards & conversions, core baking science, and Flaky Shortcrust Pastry.',
    blocks: [
      {
        type: 'subheading',
        text: '2.1 Function of key ingredients',
      },
      {
        type: 'table',
        table: {
          headers: ['Ingredient', 'Functions'],
          rows: [
            ['Flour', 'Structure (gluten and starch), texture, absorption'],
            ['Water / Liquids', 'Hydration, gluten formation, steam generation, temperature control'],
            ['Yeast', 'Fermentation, gas production, flavour development'],
            ['Salt', 'Strengthens gluten, controls fermentation, enhances flavour'],
            ['Sugar', 'Sweetness, tenderness, browning, moisture retention'],
            ['Fats (butter, oil, margarine)', 'Tenderness, flavour, flakiness, shelf life'],
            ['Eggs', 'Structure, richness, emulsification, leavening, colour'],
            ['Milk / Dairy', 'Flavour, browning, tender crumb, nutrition'],
            ['Baking powder / soda', 'Chemical leavening during mixing and baking'],
            ['Chocolate / Cocoa', 'Flavour, colour, structure (cocoa solids), fat'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '2.2 Measurement standards & conversions',
      },
      {
        type: 'table',
        table: {
          headers: ['Metric Unit', 'Equivalent', 'Practical Note'],
          rows: [
            ['1 kilogram (kg)', '1,000 grams (g)', 'Primary solid unit'],
            ['1 litre (L)', '1,000 millilitres (ml)', 'Primary liquid unit'],
            ['1 teaspoon (metric)', '5 ml', 'Small liquid flavourings'],
            ['1 tablespoon (metric)', '15 ml', 'Standard culinary spoon'],
            ['1 large egg (shelled)', '50–55 g', 'Weigh eggs for large batches'],
          ],
        },
      },
      {
        type: 'callout',
        text: 'Professional recipes always use weight measurements for dry ingredients.',
      },
      {
        type: 'subheading',
        text: '2.3 Baking science fundamentals',
      },
      {
        type: 'list',
        items: [
          'Gluten formation: Glutenin and gliadin proteins hydrate and link during mixing to create an elastic network capable of trapping fermentation gas.',
          'Starch gelatinisation: Between 60°C and 80°C, starch granules absorb moisture, swell and solidify to form the permanent crumb structure.',
          'Protein coagulation: Egg and flour proteins denature and set above 65°C, stabilising cakes, custards and pastries.',
          'Maillard reaction: Above 140°C, amino acids and reducing sugars react to form brown crust colour and roasted aroma.',
          'Caramelisation: Above 160°C, sugars melt and brown independently, adding colour and bittersweet depth.',
        ],
      },
      {
        type: 'recipe',
        recipeId: 'flaky-shortcrust-pastry',
      },
    ],
  },
  {
    id: 'part-3',
    label: 'Chapter 3',
    title: 'Basic Bakery Techniques & Mixing Methods',
    pageNumber: 10,
    summary: 'Seven foundational mixing and dough methods, blind baking control, and Classic Victoria Sponge.',
    blocks: [
      {
        type: 'subheading',
        text: '3.1 Mixing methods',
      },
      {
        type: 'table',
        table: {
          headers: ['Method', 'Key Process', 'Products'],
          rows: [
            ['Creaming method', 'Beat soft fat and sugar until light, add eggs gradually, fold in flour', 'Pound cake, Victoria sponge, cookies'],
            ['Whisking (foaming)', 'Whip eggs and sugar to full ribbon stage, gently fold sifted flour', 'Genoise, Swiss roll, savoiardi'],
            ['All-in-one', 'Combine all ingredients together in a single stage and beat smooth', 'Cupcakes, traybakes'],
            ['Rubbing-in', 'Cut cold fat into flour before adding minimal liquid', 'Shortcrust pastry, scones'],
            ['Melting method', 'Melt fat, sugar and syrup gently before mixing into dry ingredients', 'Gingerbread, brownies, flapjacks'],
            ['Straight dough', 'Mix all bread ingredients at once, knead, bulk-ferment, shape, proof', 'White bread, baguettes, pizza dough'],
            ['Sponge and dough', 'Pre-ferment part of flour, water and yeast before final mix', 'Artisan loaves, brioche, panettone'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '3.2 Blind baking control',
      },
      {
        type: 'ordered',
        items: [
          'Line tin without stretching pastry and chill thoroughly (15–30 minutes).',
          'Line with parchment paper and fill with baking beans or weights.',
          'Bake at 190°C until edges set, remove weights, and dry the base to an even golden colour.',
        ],
      },
      {
        type: 'recipe',
        recipeId: 'victoria-sponge',
      },
    ],
  },
  {
    id: 'part-6',
    label: 'Chapter 4',
    title: 'Cakes: Sponge, Butter, Chocolate, Fruit & Specialty Cakes',
    pageNumber: 14,
    summary: 'Cake doneness diagnostics, common fault correction matrix, and Rich Chocolate Fudge Cake.',
    blocks: [
      {
        type: 'subheading',
        text: '4.1 Doneness Tests',
      },
      {
        type: 'table',
        table: {
          headers: ['Test', 'Method', 'Indicator'],
          rows: [
            ['Skewer', 'Insert into centre', 'Comes out clean'],
            ['Spring-back', 'Press lightly', 'Cake springs back'],
            ['Shrinkage', 'Observe edges', 'Slight pull from tin'],
            ['Sound', 'Listen', 'No sizzling'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '4.2 Common Cake Faults',
      },
      {
        type: 'table',
        table: {
          headers: ['Fault', 'Likely Causes', 'Corrective Action'],
          rows: [
            ['Cake sinks', 'Underbaking, excess leavening, early door opening', 'Verify temperature, time and leavening weight'],
            ['Dense texture', 'Poor aeration, overmixing after flour, cold ingredients', 'Correct creaming/whisking; gentle folding'],
            ['Dry cake', 'Overbaking, excess flour, insufficient liquid/fat', 'Check scale and formula'],
            ['Large tunnels', 'Overmixing or excess leavening', 'Mix only until combined'],
            ['Cracked top', 'Oven too hot, batter too stiff', 'Lower temperature, adjust liquid'],
          ],
        },
      },
      {
        type: 'recipe',
        recipeId: 'rich-chocolate-fudge-cake',
      },
    ],
  },
  {
    id: 'ch-5',
    label: 'Chapter 5',
    title: 'Cake Fillings, Creams, Icings and Decorations',
    pageNumber: 18,
    summary: 'Types of fillings and icings, piping standards, Classic Vanilla Buttercream, and Dark Chocolate Ganache.',
    blocks: [
      {
        type: 'subheading',
        text: '5.1 Types of fillings and icings',
      },
      {
        type: 'table',
        table: {
          headers: ['Type', 'Description', 'Typical use'],
          rows: [
            ['Buttercream', 'Butter, icing sugar, flavouring', 'Filling, crumb coat, piping'],
            ['Whipped cream', 'Double cream whipped to peaks', 'Filling, topping, fresh desserts'],
            ['Ganache', 'Chocolate and cream', 'Glazing, filling, frosting'],
            ['Fruit curd', 'Fruit juice, zest, eggs, sugar, butter', 'Filling, tart topping'],
            ['Royal icing', 'Icing sugar and egg white', 'Decorating, piping'],
            ['Glazes', 'Jam, syrup, chocolate, fondant', 'Finishing, shine, flavour'],
          ],
        },
      },
      {
        type: 'recipe',
        recipeId: 'vanilla-buttercream',
      },
      {
        type: 'recipe',
        recipeId: 'chocolate-ganache',
      },
    ],
  },
  {
    id: 'ch-6',
    label: 'Chapter 6',
    title: 'Pastry: Shortcrust, Puff, Choux, Filo and Danish Pastry',
    pageNumber: 22,
    summary: 'Pastry types and key principles, lamination control, Choux Pastry (Pâte à Choux), and Rough Puff Pastry.',
    blocks: [
      {
        type: 'subheading',
        text: '6.1 Pastry types and key principles',
      },
      {
        type: 'table',
        table: {
          headers: ['Pastry', 'Method', 'Characteristics'],
          rows: [
            ['Shortcrust', 'Rubbing fat into flour; minimal water', 'Crisp, tender, crumbly'],
            ['Puff pastry', 'Laminating dough with butter blocks', 'Many flaky layers, high rise'],
            ['Choux', 'Cooking flour with water and butter; beating in eggs', 'Hollow, crisp shells'],
            ['Filo', 'Very thin stretched sheets layered with fat', 'Delicate, crispy'],
            ['Danish', 'Yeast dough laminated with butter', 'Soft, flaky, enriched'],
          ],
        },
      },
      {
        type: 'recipe',
        recipeId: 'choux-pastry',
      },
      {
        type: 'recipe',
        recipeId: 'rough-puff-pastry',
      },
    ],
  },
  {
    id: 'part-7',
    label: 'Chapter 7',
    title: 'Croissants, Doughnuts, Muffins, Cookies and Biscuits',
    pageNumber: 26,
    summary: 'Viennoiserie, quick breads, cookie spread control, American-Style Chocolate Chip Cookies, and Classic Blueberry Muffins.',
    blocks: [
      {
        type: 'subheading',
        text: '7.1 Viennoiserie, Quick Breads and Cookie Spread',
      },
      {
        type: 'paragraph',
        text: 'Viennoiserie includes croissants, pain au chocolat and Danish pastries, made from laminated yeast dough. Quick breads (muffins, banana bread, soda bread) rely on chemical leaveners and require minimal mixing to avoid toughness.',
      },
      {
        type: 'recipe',
        recipeId: 'chocolate-chip-cookies',
      },
      {
        type: 'recipe',
        recipeId: 'blueberry-muffins',
      },
    ],
  },
  {
    id: 'part-4',
    label: 'Chapter 8',
    title: 'Bread: White, Brown, Whole-Wheat, Sourdough and Specialty Breads',
    pageNumber: 30,
    summary: 'Bread-making stages, fermentation control, Artisan Sourdough Bread, and Whole-Wheat Sandwich Bread.',
    blocks: [
      {
        type: 'subheading',
        text: '8.1 Bread-Making Process',
      },
      {
        type: 'ordered',
        items: [
          'Mixing: Combine ingredients and develop gluten.',
          'Bulk fermentation: Dough rises and develops flavour.',
          'Dividing and shaping: Portion and form loaves.',
          'Proofing: Final rise before baking.',
          'Baking: Oven spring, crust formation, crumb set (95–98 °C internal).',
          'Cooling: Allow to cool completely before slicing.',
        ],
      },
      {
        type: 'recipe',
        recipeId: 'sourdough-boule',
      },
      {
        type: 'recipe',
        recipeId: 'wholemeal-bread',
      },
    ],
  },
  {
    id: 'part-5',
    label: 'Chapter 9',
    title: 'Pizza: Dough, Sauces, Toppings and Professional Production',
    pageNumber: 35,
    summary: 'Pizza styles and hydration principles, Neapolitan Pizza Dough, and Classic Pizza Sauce.',
    blocks: [
      {
        type: 'subheading',
        text: '9.1 Pizza styles and dough principles',
      },
      {
        type: 'table',
        table: {
          headers: ['Style', 'Characteristics', 'Hydration'],
          rows: [
            ['Neapolitan', 'Thin centre, puffy rim, charred spots, soft', '60–65%'],
            ['New York', 'Thin, foldable, crisp bottom', '58–62%'],
            ['Pan', 'Thick, airy, oily bottom', '70–75%'],
            ['Thin-crust', 'Crisp, cracker-like', '55–58%'],
          ],
        },
      },
      {
        type: 'recipe',
        recipeId: 'neapolitan-pizza-dough',
      },
      {
        type: 'recipe',
        recipeId: 'classic-pizza-sauce',
      },
    ],
  },
  {
    id: 'ch-10',
    label: 'Chapter 10',
    title: 'Pies, Tarts, Quiches and Savoury Bakery Products',
    pageNumber: 39,
    summary: 'Savoury pastry discipline, Classic Quiche Lorraine, and Classic Apple Pie.',
    blocks: [
      {
        type: 'recipe',
        recipeId: 'classic-quiche-lorraine',
      },
      {
        type: 'recipe',
        recipeId: 'apple-pie',
      },
    ],
  },
  {
    id: 'part-8',
    label: 'Chapter 11',
    title: 'Desserts, Puddings and Plated Pastry',
    pageNumber: 43,
    summary: 'Set creams, baked custards, Vanilla Bean Panna Cotta, and Classic Crème Brûlée.',
    blocks: [
      {
        type: 'recipe',
        recipeId: 'panna-cotta',
      },
      {
        type: 'recipe',
        recipeId: 'creme-brulee',
      },
    ],
  },
  {
    id: 'part-12',
    label: 'Chapter 12',
    title: 'Production Planning, Costing and Pricing',
    pageNumber: 48,
    summary: 'Production planning, USD ($) costing methodology, Chocolate Fudge Cake costing model, yield management, and menu engineering.',
    blocks: [
      {
        type: 'subheading',
        text: '12.1 Production planning',
      },
      {
        type: 'list',
        items: [
          'Forecast demand based on sales history, seasonality and events.',
          'Prepare production schedules (daily and weekly).',
          'Calculate ingredient requirements using recipe yields.',
          'Manage staff allocation and equipment usage.',
          'Implement batch production to minimise waste.',
        ],
      },
      {
        type: 'subheading',
        text: '12.2 Costing methodology',
      },
      {
        type: 'code',
        text: 'Selling price = (Ingredient cost + Labour cost + Overhead cost + Packaging cost) × (1 + Profit margin)',
      },
      {
        type: 'h4',
        text: 'Example costing table — Chocolate Fudge Cake (Chapter 4) in USD',
      },
      {
        type: 'table',
        table: {
          headers: ['Item', 'Quantity', 'Unit cost (USD)', 'Total (USD)'],
          rows: [
            ['Dark chocolate', '200 g', '$0.010/g', '$2.00'],
            ['Butter', '200 g', '$0.008/g', '$1.60'],
            ['Sugar', '200 g', '$0.001/g', '$0.20'],
            ['Eggs', '4', '$0.25 each', '$1.00'],
            ['Flour', '200 g', '$0.001/g', '$0.20'],
            ['Cocoa', '30 g', '$0.010/g', '$0.30'],
            ['Sour cream', '100 g', '$0.005/g', '$0.50'],
            ['Total ingredient cost', '—', '—', '$5.80'],
            ['Labour (0.5 h × $12.00/h)', '—', '—', '$6.00'],
            ['Overhead (gas, electricity)', '—', '—', '$2.50'],
            ['Packaging', '—', '—', '$1.50'],
            ['Total cost', '—', '—', '$15.80'],
            ['Profit margin (40%)', '—', '—', '$6.32'],
            ['Selling price', '—', '—', '$22.12'],
          ],
        },
      },
      {
        type: 'callout',
        text: 'Adjust unit costs according to local market prices.',
      },
      {
        type: 'subheading',
        text: '12.3 Yield management and waste control',
      },
      {
        type: 'list',
        items: [
          'Track batch yields vs. theoretical yields.',
          'Record waste and analyse causes.',
          'Use leftovers creatively (e.g., stale bread → croutons).',
          'Implement FIFO stock rotation.',
          'Monitor shrinkage during baking and cooling.',
        ],
      },
      {
        type: 'subheading',
        text: '12.4 Menu engineering',
      },
      {
        type: 'table',
        table: {
          headers: ['Category', 'Popularity', 'Profitability', 'Action'],
          rows: [
            ['Stars', 'High', 'High', 'Promote and maintain quality'],
            ['Plowhorses', 'High', 'Low', 'Reduce costs or increase price'],
            ['Puzzles', 'Low', 'High', 'Promote to increase sales'],
            ['Dogs', 'Low', 'Low', 'Remove from menu'],
          ],
        },
      },
    ],
  },
  {
    id: 'part-13',
    label: 'Chapter 13',
    title: 'Food Safety, Hygiene, Storage and Shelf Life',
    pageNumber: 52,
    summary: 'Personal hygiene, critical storage temperatures, cross-contamination prevention, shelf-life matrix, HACCP principles, and sanitation.',
    blocks: [
      {
        type: 'subheading',
        text: '13.1 Personal hygiene',
      },
      {
        type: 'list',
        items: [
          'Wash hands thoroughly before handling food.',
          'Wear clean uniform, apron and hair covering.',
          'Do not handle food when ill (especially gastrointestinal illness).',
          'Keep fingernails short and clean; no jewellery.',
          'Cover cuts with waterproof dressings.',
        ],
      },
      {
        type: 'subheading',
        text: '13.2 Temperature control',
      },
      {
        type: 'table',
        table: {
          headers: ['Product type', 'Safe storage temperature', 'Danger zone'],
          rows: [
            ['Chilled products', '0–5°C', '5–63°C'],
            ['Frozen products', '−18°C or below', '—'],
            ['Hot holding', 'Above 63°C', '5–63°C'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '13.3 Cross-contamination prevention',
      },
      {
        type: 'list',
        items: [
          'Use separate cutting boards for raw meat and ready-to-eat foods.',
          'Clean and sanitise work surfaces between tasks.',
          'Store raw foods below cooked/ready-to-eat foods in refrigerators.',
          'Use colour-coded equipment.',
          'Store cleaning chemicals away from food.',
        ],
      },
      {
        type: 'subheading',
        text: '13.4 Shelf life of bakery products',
      },
      {
        type: 'table',
        table: {
          headers: ['Product', 'Room temp', 'Refrigerated', 'Frozen'],
          rows: [
            ['Bread (yeast)', '2–3 days', 'Not recommended', '3 months'],
            ['Cakes (butter/sponge)', '3–4 days', '7 days (cream-filled)', '3 months'],
            ['Pastry (uncooked)', '—', '3 days', '1 month'],
            ['Cookies/biscuits', '1–2 weeks', '—', '6 months'],
            ['Custard/fresh cream fillings', '—', '2–3 days', 'Not recommended'],
          ],
        },
      },
      {
        type: 'callout',
        text: 'Always verify local food-safety regulations; this is professional guidance, not a substitute for official requirements.',
      },
      {
        type: 'subheading',
        text: '13.5 HACCP principles (overview)',
      },
      {
        type: 'ordered',
        items: [
          'Conduct hazard analysis.',
          'Determine critical control points (CCPs).',
          'Establish critical limits.',
          'Monitor CCPs.',
          'Establish corrective actions.',
          'Verify procedures.',
          'Keep records.',
        ],
      },
      {
        type: 'subheading',
        text: '13.6 Cleaning and sanitation',
      },
      {
        type: 'list',
        items: [
          'Follow a cleaning schedule for all equipment and surfaces.',
          'Use food-safe sanitisers at correct dilution.',
          'Allow surfaces to air-dry before use.',
          'Clean as you go during production.',
          'Deep clean at the end of each production day.',
        ],
      },
    ],
  },
  {
    id: 'ch-14',
    label: 'Chapter 14',
    title: 'Troubleshooting and Professional Reference Charts',
    pageNumber: 56,
    summary: 'Diagnostic tables for bread, cake, and pastry faults, oven conversions, Baker’s %, imperial-metric conversions, hydration guide, and yield scaling.',
    blocks: [
      {
        type: 'subheading',
        text: '14.1 Common bread faults',
      },
      {
        type: 'table',
        table: {
          headers: ['Fault', 'Cause', 'Correction'],
          rows: [
            ['Dense, heavy loaf', 'Under-proofing; weak flour; insufficient kneading', 'Increase proof time; use strong flour; knead longer'],
            ['Large holes (tunnelling)', 'Over-proofing; uneven shaping', 'Reduce proof time; shape evenly'],
            ['Pale crust', 'Oven too cool; no steam', 'Increase temperature; add steam'],
            ['Soggy bottom', 'Under-baked; too much water', 'Bake longer; reduce hydration'],
            ['Split crust', 'Insufficient scoring; oven spring too strong', 'Score deeper; adjust proofing'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '14.2 Common cake faults',
      },
      {
        type: 'table',
        table: {
          headers: ['Fault', 'Cause', 'Correction'],
          rows: [
            ['Cracked top', 'Oven too hot; over-mixing', 'Lower temperature; fold gently'],
            ['Sinking centre', 'Under-baked; over-proofing; too much leavening', 'Bake longer; reduce leavening'],
            ['Dry crumb', 'Over-baking; too little fat', 'Reduce baking time; add fat'],
            ['Uneven rise', 'Hot spots in oven; uneven batter', 'Rotate tins; level batter'],
            ['Sticky top', 'Too much sugar; under-baking', 'Reduce sugar; bake until skewer comes clean'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '14.3 Pastry faults',
      },
      {
        type: 'table',
        table: {
          headers: ['Fault', 'Cause', 'Correction'],
          rows: [
            ['Tough pastry', 'Over-working; too much water', 'Handle lightly; reduce water'],
            ['Shrinkage', 'Dough stretched during rolling; insufficient resting', 'Rest dough 30 min before baking'],
            ['Soggy base', 'Under-baked; wet filling', 'Blind bake longer; seal base'],
            ['Butter leaking from puff pastry', 'Butter too warm; dough too warm', 'Chill dough and butter between folds'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '14.4 Oven temperature conversion chart',
      },
      {
        type: 'table',
        table: {
          headers: ['Celsius (°C)', 'Fahrenheit (°F)', 'Gas mark', 'Description'],
          rows: [
            ['110', '225', '¼', 'Very cool'],
            ['140', '275', '1', 'Cool'],
            ['160', '325', '3', 'Moderate'],
            ['180', '350', '4', 'Moderate'],
            ['200', '400', '6', 'Hot'],
            ['220', '425', '7', 'Very hot'],
            ['240', '475', '9', 'Extremely hot'],
          ],
        },
      },
      {
        type: 'subheading',
        text: "14.5 Baker's percentage reference",
      },
      {
        type: 'code',
        text: "Baker's % = (Ingredient weight ÷ Flour weight) × 100",
      },
      {
        type: 'paragraph',
        text: 'Example: Flour 1000 g, water 650 g, salt 18 g, yeast 10 g → Hydration = 65%, Salt = 1.8%, Yeast = 1%',
      },
      {
        type: 'subheading',
        text: '14.6 Metric conversion quick reference',
      },
      {
        type: 'table',
        table: {
          headers: ['Imperial', 'Metric'],
          rows: [
            ['1 oz', '28 g'],
            ['1 lb', '454 g'],
            ['1 fl oz', '30 ml'],
            ['1 pint', '568 ml'],
            ['1 quart', '946 ml'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '14.7 Dough hydration guide',
      },
      {
        type: 'table',
        table: {
          headers: ['Hydration %', 'Dough type', 'Character'],
          rows: [
            ['55–58%', 'Bagels, thin-crust pizza', 'Stiff, firm'],
            ['60–65%', 'Sandwich bread, Neapolitan pizza', 'Standard, easy to handle'],
            ['68–75%', 'Ciabatta, focaccia, sourdough', 'Open crumb, slack dough'],
            ['75–85%', 'High-hydration artisan breads', 'Very open crumb, challenging'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '14.8 Scaling recipe yields',
      },
      {
        type: 'code',
        text: 'Scaling factor = Desired yield ÷ Original yield',
      },
      {
        type: 'list',
        items: [
          'Scaling up by more than 3× may require adjustments to mixing time, proofing and baking.',
          'Leavening agents, salt and spices should be scaled carefully.',
          'Pan sizes and oven capacity must be considered.',
        ],
      },
    ],
  },
  {
    id: 'ch-15',
    label: 'Chapter 15',
    title: 'Creams and Cream-Based Preparations',
    pageNumber: 60,
    summary: 'Aerated and custard cream families, temperature/hygiene/gelatine rules, 15-cream holding matrix, and all 15 standardized cream recipes.',
    blocks: [
      {
        type: 'subheading',
        text: '15.1 Introduction',
      },
      {
        type: 'paragraph',
        text: 'Creams are among the most important components in professional patisserie. They are used as fillings, toppings, sauces, dessert bases and decorative elements. Creams fall into two families: whipped/aerated creams and cooked/custard-based creams.',
      },
      {
        type: 'subheading',
        text: '15.2 Professional rules for creams',
      },
      {
        type: 'list',
        items: [
          'Temperature control: Custards must be cooked to 82–84°C or fully boiled to be safe. Creams must be chilled rapidly and kept at 0–5°C.',
          'Hygiene: Creams are high-risk foods. Use pasteurised dairy, sanitise equipment, and never hold finished creams above 5°C for more than 2 hours.',
          'Gelatine: Use gold-strength sheet gelatine (approx. 2 g per sheet). Soak in cold water, squeeze, dissolve in warm liquid at 60–70°C. Never boil gelatine.',
          'Whipping: Cream whips best at 4–8°C with a chilled bowl.',
          'Flavour timing: Add alcohol, citrus juice and strong flavours at the end of production.',
          'Storage: Cool in shallow trays, cover with cling film touching the surface, refrigerate immediately.',
        ],
      },
      {
        type: 'subheading',
        text: '15.3 Cream reference table',
      },
      {
        type: 'table',
        table: {
          headers: ['Cream', 'Base', 'Typical use', 'Holding time (0–5°C)'],
          rows: [
            ['Crème Chantilly', 'Whipped cream', 'Topping, filling, dessert', '4–6 hours'],
            ['Crème Anglaise', 'Egg yolk custard', 'Sauce, dessert base', '2 days'],
            ['Crème Pâtissière', 'Custard + starch', 'Filling, tart base', '2 days'],
            ['Crème Légère', 'Pastry cream + whipped cream', 'Light filling', '1 day'],
            ['Crème Diplomate', 'Pastry cream + whipped cream + gelatine', 'Layered cakes, entremets', '2 days'],
            ['Crème Mousseline', 'Pastry cream + butter', 'Filling, macarons', '3 days'],
            ['Crème Chiboust', 'Pastry cream + Italian meringue', 'Saint-Honoré', '1 day'],
            ['Crème Bavaroise', 'Crème anglaise + whipped cream + gelatine', 'Moulded desserts', '2 days'],
            ["Crème d'Amande", 'Butter, sugar, almonds, eggs', 'Tart base, croissant filling', '3 days'],
            ['Frangipane', "Crème d'amande + pastry cream", 'Galette, tart filling', '2 days'],
            ['Ganache Montée', 'Ganache + whipped cream', 'Topping, filling', '3 days'],
            ['Crème Namelaka', 'Chocolate + milk + cream + glucose + gelatine', 'Entremets, tart filling', '2 days'],
            ['Crème Crémeux', 'Custard + chocolate + gelatine', 'Tart filling, entremets', '2 days'],
            ['Crème Fraîche', 'Fermented cream', 'Savoury cooking, dessert', '2 weeks'],
            ['Mascarpone Cream', 'Mascarpone + whipped cream', 'Tiramisu, dessert filling', '2 days'],
          ],
        },
      },
      {
        type: 'subheading',
        text: '15.4 Safety notes',
      },
      {
        type: 'list',
        items: [
          'All creams containing egg, dairy or gelatine are high-risk foods.',
          'Cool creams in a shallow tray within 90 minutes, then refrigerate at 0–5°C.',
          'Use within the holding times in the reference table.',
          'Never refreeze thawed creams or re-use cream left at room temperature.',
          'Verify local food-safety requirements before commercial use.',
        ],
      },
      { type: 'recipe', recipeId: 'creme-chantilly' },
      { type: 'recipe', recipeId: 'creme-anglaise' },
      { type: 'recipe', recipeId: 'creme-patissiere' },
      { type: 'recipe', recipeId: 'creme-legere' },
      { type: 'recipe', recipeId: 'creme-diplomate' },
      { type: 'recipe', recipeId: 'creme-mousseline' },
      { type: 'recipe', recipeId: 'creme-chiboust' },
      { type: 'recipe', recipeId: 'creme-bavaroise' },
      { type: 'recipe', recipeId: 'creme-damande' },
      { type: 'recipe', recipeId: 'frangipane' },
      { type: 'recipe', recipeId: 'ganache-montee' },
      { type: 'recipe', recipeId: 'creme-namelaka' },
      { type: 'recipe', recipeId: 'creme-cremeux' },
      { type: 'recipe', recipeId: 'creme-fraiche' },
      { type: 'recipe', recipeId: 'mascarpone-cream' },
    ],
  },
  {
    id: 'part-11',
    label: 'Appendix',
    title: 'Expanded Recipe Collection — Batches 1 & 2',
    pageNumber: 64,
    summary: 'Expanded specialty cakes, biscuits, Ethiopian festive breads, gluten-free & vegan formulations, flatbreads, laminated puff pastry, and set desserts.',
    blocks: [
      {
        type: 'subheading',
        text: 'Batch 1 — Cakes, Cookies & Bars',
      },
      { type: 'h4', text: 'Cakes' },
      { type: 'recipe', recipeId: 'lemon-drizzle-cake' },
      { type: 'recipe', recipeId: 'red-velvet-cake' },
      { type: 'h4', text: 'Cookies and Bars' },
      { type: 'recipe', recipeId: 'shortbread-fingers' },
      { type: 'recipe', recipeId: 'gingerbread-biscuits' },
      {
        type: 'subheading',
        text: 'Batch 2 — Regional Breads, Gluten-Free & Vegan, Flatbreads, Pastries & Desserts',
      },
      { type: 'h4', text: 'Regional and Specialty Breads' },
      { type: 'recipe', recipeId: 'ambasha' },
      { type: 'recipe', recipeId: 'himbasha' },
      { type: 'h4', text: 'Gluten-Free and Vegan Bakery' },
      { type: 'recipe', recipeId: 'gluten-free-white-sandwich-bread' },
      { type: 'recipe', recipeId: 'gluten-free-chocolate-cake' },
      { type: 'recipe', recipeId: 'vegan-chocolate-cake' },
      { type: 'h4', text: 'Breads' },
      { type: 'recipe', recipeId: 'pita-bread' },
      { type: 'recipe', recipeId: 'naan-bread' },
      { type: 'h4', text: 'Pastries' },
      { type: 'recipe', recipeId: 'sweet-shortcrust-pastry' },
      { type: 'recipe', recipeId: 'full-puff-pastry' },
      { type: 'h4', text: 'Desserts' },
      { type: 'recipe', recipeId: 'panna-cotta' },
    ],
  },
  {
    id: 'master-index',
    label: 'Master Index',
    title: 'Master Recipe Index',
    pageNumber: 82,
    summary: 'All 439 recipes across Core Chapters 1–14, Chapter 15 (Creams), and Expanded Batches 1–10, organized by section count and 16 culinary categories.',
    blocks: [
      {
        type: 'paragraph',
        text: 'All recipes in this book, listed alphabetically and by category.',
      },
      {
        type: 'subheading',
        text: 'Recipe Count Summary',
      },
      {
        type: 'table',
        table: {
          headers: ['Section', 'Recipes'],
          rows: [
            ['Core chapters 1–14', '18'],
            ['Chapter 15 (Creams)', '15'],
            ['Batch 1', '40'],
            ['Batch 2', '44'],
            ['Batch 3', '42'],
            ['Batch 4', '40'],
            ['Batch 5', '40'],
            ['Batch 6', '40'],
            ['Batch 7', '40'],
            ['Batch 8', '40'],
            ['Batch 9', '40'],
            ['Batch 10', '40'],
            ['Total', '439'],
          ],
        },
      },
      {
        type: 'subheading',
        text: 'Alphabetical Recipe Index',
      },
      {
        type: 'callout',
        text: 'Full index delivered in a separate document. Use the category index below for navigation.',
      },
      {
        type: 'subheading',
        text: 'Recipe Index by Category',
      },
      { type: 'h4', text: 'Yeast Breads' },
      {
        type: 'paragraph',
        text: 'Classic White Sandwich Bread · Artisan Sourdough Bread · Whole-Wheat Sandwich Bread · Classic Baguette · Baguette de Tradition · Bâtard · Ciabatta · Focaccia · Focaccia Barese · Brioche · Brioche Nanterre · Japanese Milk Bread · Pain de Mie · Pain Viennois · Bagels · Burger Buns · Soft Dinner Rolls · Milk Bread Rolls · Pandesal · Challah · Zopf · Pulla · Cozonac · Scali Bread · Cottage Loaf · Bloomer Loaf · Barmbrack · Oatmeal Bread · Semolina Bread · Potato Bread · Anadama Bread · Multigrain Bread · Dark Rye Bread · Pumpernickel · Vollkornbrot · Whole Wheat Baguette · Sourdough Baguette · Sourdough Rye Bread · Pane Toscano · Pane Pugliese · Pan de Cristal · Hallulla · Kubaneh · Bao Buns · Soft Pretzels · Anpan · Melon Pan · Pineapple Buns · Garlic Bread Knots',
      },
      { type: 'h4', text: 'Regional and Festive Breads' },
      {
        type: 'paragraph',
        text: 'Ambasha · Himbasha · Ethiopian Honey Bread · Difo Dabo · Khachapuri · Khachapuri Imeruli · Turkish Pide · Lahmacun · Manakish · Taboon Bread',
      },
      { type: 'h4', text: 'Flatbreads' },
      {
        type: 'paragraph',
        text: 'Pita Bread · Naan Bread · Soft Flour Tortillas · Taboon Bread · Lahmacun · Manakish · Injera',
      },
      { type: 'h4', text: 'Gluten-Free and Vegan Bakery' },
      {
        type: 'paragraph',
        text: 'Gluten-Free White Sandwich Bread · Gluten-Free Chocolate Cake · Almond Flour Cookies · Vegan Chocolate Cake · Vegan Banana Bread · Dairy-Free Scones · Pão de Queijo · Orange Polenta Cake · Lemon Polenta Cake · Torta Caprese · Flourless Chocolate Cake · Almond and Orange Cake',
      },
      { type: 'h4', text: 'Cakes' },
      {
        type: 'paragraph',
        text: "Classic Victoria Sponge · Rich Chocolate Fudge Cake · Lemon Drizzle Cake · Red Velvet Cake · Carrot Cake · Coffee Walnut Cake · Banana Cake · Baked Vanilla Cheesecake · Classic Pound Cake · Swiss Roll · Flourless Chocolate Cake · Rich Fruit Cake · Angel Food Cake · Pineapple Upside-Down Cake · Black Forest Cake · Opera Cake · Hummingbird Cake · Tiramisu Cake · Streusel Coffee Cake · Battenberg Cake · Sacher Torte · Madeira Cake · Coconut Cake · Pistachio Cake · Japanese Cotton Cheesecake · Torta Caprese · Simnel Cake · Lamingtons · Gâteau Basque · Lemon Olive Oil Cake · Dobos Torte · Kladdkaka · Devil's Food Cake · Coconut and Lime Cake · Prinsesstårta · Marble Cake · Chiffon Cake · Boston Cream Pie · Caramel Layer Cake · Pecan Layer Cake · Parsnip and Maple Cake · Guinness Chocolate Cake · Génoise Sponge · Gâteau Moka · Strawberry Shortcake · Chocolate Orange Cake · Walnut Cake · Beetroot Chocolate Cake · Hazelnut Cake · White Chocolate Mud Cake · Banana and Walnut Loaf · Blackberry and Apple Cake · Pear and Almond Cake · Tres Leches Cake · Sernik · Bienenstich",
      },
      { type: 'h4', text: 'Creams (Chapter 15)' },
      {
        type: 'paragraph',
        text: "Crème Chantilly · Crème Anglaise · Crème Pâtissière · Crème Légère · Crème Diplomate · Crème Mousseline · Crème Chiboust · Crème Bavaroise · Crème d'Amande · Frangipane · Ganache Montée · Crème Namelaka · Crème Crémeux · Crème Fraîche · Mascarpone Cream",
      },
      { type: 'h4', text: 'Pastry' },
      {
        type: 'paragraph',
        text: "Flaky Shortcrust Pastry · Sweet Shortcrust Pastry · Rough Puff Pastry · Full Puff Pastry · Choux Pastry · Éclairs · Danish Pastry Dough · Filo Apple Cigars · Palmiers · Hazelnut and Chocolate Palmiers · Kouign-Amann · Canelés · Croissant aux Amandes · Mille-Feuille · Paris-Brest · Apple Strudel · Cannoli · Beignets · Vol-au-Vent · Croquembouche · Choux Swans · Puits d'Amour · Bichon au Citron · Chaussons aux Pommes · Cornetti · Sfogliatelle · Apple Galette · Tarte aux Pommes · Friands · Cream Puffs · Danish Braid · Vanilla Slice · Fondant Fancies · Mini Fruit Tarts · Puff Pastry Pinwheels · Strawberry Tartlets · Chocolate Tartlets · Pear Frangipane Tart · Galette des Rois · Pithiviers · Cheese Straws · Gougères",
      },
      { type: 'h4', text: 'Viennoiserie and Sweet Rolls' },
      {
        type: 'paragraph',
        text: 'Butter Croissants · Pain au Chocolat · Pain aux Raisins · Cinnamon Rolls · Chelsea Buns · Yeast Doughnuts · Custard Danish Pinwheels · Danish Braid · Cruffins · Cornetti · Kanelbullar',
      },
      { type: 'h4', text: 'Quick Breads, Muffins and Scones' },
      {
        type: 'paragraph',
        text: 'Classic Blueberry Muffins · Bran Muffins · Classic Scones · Cheese and Herb Scones · Dairy-Free Scones · Vegan Banana Bread · Irish Soda Bread · Soda Farls · Cornbread · Savoury Cheese and Chive Muffins · Yorkshire Puddings',
      },
      { type: 'h4', text: 'Cookies, Biscuits and Bars' },
      {
        type: 'paragraph',
        text: "American-Style Chocolate Chip Cookies · Oatmeal Raisin Cookies · Shortbread · Gingerbread Biscuits · Almond Biscotti · Almond Flour Cookies · Coconut Macaroons · French Macarons · Fudgy Brownies · Blondies · Flapjacks · Snickerdoodles · Thumbprint Cookies · Linzer Cookies · Madeleines · Lemon Bars · Chocolate Chip Cookie Bars · Brown Butter Chocolate Chip Cookies · Pistachio and Cranberry Cookies · Date Bars · Coconut Snowballs · Alfajores · Anzac Biscuits · Viennese Whirls · Whoopie Pies · Tuiles · Florentines · Empire Biscuits · Jam Sandwich Biscuits · Coconut and Raspberry Slices · Rocky Road · Peanut Butter Cookies · Chocolate Crinkle Cookies · Millionaire's Shortbread · Stroopwafels · Speculoos · Molasses Crinkle Cookies · Chocolate-Dipped Shortbread Fingers · Hazelnut Biscotti · Coconut Chocolate Bars · Lemon Shortbread · Cherry and Almond Bars · Black and White Cookies · Hermit Cookies · Peppermint Bark Cookies · Cardamom Shortbread · Matcha White Chocolate Cookies · Maple Pecan Cookies · Chocolate Oat Cookies · Lemon Ricotta Cookies · Brown Sugar Shortbread · Fruit and Nut Cookies · Chocolate Fudge Bars · Coconut and Lime Bars · Maamoul · Ghraybeh · Rugelach · Hamantaschen · Brookie",
      },
      { type: 'h4', text: 'Pizza' },
      {
        type: 'paragraph',
        text: 'Neapolitan Pizza Dough · New York Pizza Dough · Pan Pizza Dough · Thin-Crust Pizza Dough · Classic Pizza Sauce · Calzone · Pizza Bianca · Detroit-Style Pizza · Sicilian Pizza · Grandma Pie · Pizza Fritta · Pizza Margherita · Pizza Marinara · Stromboli · Pizza Capricciosa · Pizza Diavola · Pizza Puttanesca · Pizza Quattro Formaggi · Pizza Boscaiola · Sausage and Kale Pizza · Focaccia Barese · Pizza al Taglio · Pizza Funghi · Pizza Prosciutto e Rucola · Focaccia Sandwich · Pizzette · Mushroom Truffle Pizza · Pizza Salsiccia e Friarielli · Pissaladière',
      },
      { type: 'h4', text: 'Pies, Tarts and Savoury Bakery' },
      {
        type: 'paragraph',
        text: 'Classic Apple Pie · Classic Quiche Lorraine · Steak Pie · Sausage Rolls · Lemon Tart · Chocolate Tart · Spinach and Feta Filo Pie · Cheese and Herb Scones · Tarte Tatin · Pecan Pie · Key Lime Pie · Treacle Tart · Empanadas · Spanakopita · Samosas · Cornish Pasty · Cheese and Onion Pasties · Pigs in Blankets · Cheese Straws · Tarte au Citron Meringuée · Raspberry Tart · Lemon Meringue Pie · Bichon au Citron · Cheese and Bacon Turnovers · Sausage Plait · Spinach and Ricotta Rolls · Arancini · Tarte au Sucre · Tarte aux Pommes · Apple Galette · Strawberry Tartlets · Chocolate Tartlets · Pear Frangipane Tart · Mini Fruit Tarts · Borek',
      },
      { type: 'h4', text: 'Desserts and Puddings' },
      {
        type: 'paragraph',
        text: 'Classic Crème Brûlée · Chocolate Mousse · Tiramisu · Sticky Toffee Pudding · Crème Caramel · Bread and Butter Pudding · Apple Crumble · No-Bake Cheesecake · Baked Vanilla Cheesecake · Clafoutis · Chocolate Fondant · Lemon Posset · Rice Pudding · Floating Islands · Chocolate Marquise · Peach Melba · Mango Sticky Rice · Chocolate Budino · Butterscotch Pudding · Coffee Panna Cotta · Peach Cobbler · Banana Pudding · Chocolate Pot de Crème · Blueberry Clafoutis · Pouding Chômeur · Pavlova · Eton Mess · Banoffee Pie · Chocolate Soufflé · Profiteroles · Treacle Sponge Pudding · Semifreddo · Zabaglione · Poached Pears in Red Wine · Summer Pudding · Rum Baba · Mango Cheesecake · Lemon Syllabub · Coeur à la Crème · Baked Ricotta Cheesecake · Apple Charlotte · Chocolate Bread and Butter Pudding · Rhubarb Crumble · Mango Sorbet · Vanilla Ice Cream · Chocolate Semifreddo · Baked Alaska · Flan · Brigadeiros · Loukoumades',
      },
      { type: 'h4', text: 'Sauces, Glazes and Components' },
      {
        type: 'paragraph',
        text: 'Classic Pizza Sauce · Pastry Cream · Frangipane · Lemon Curd · Dark Chocolate Ganache · Cream Cheese Frosting · Apricot Glaze · Chocolate Glaze · Crème Anglaise · Salted Caramel Sauce · Dulce de Leche · Beurre Noisette · Caramel Syrup · Kirsch Syrup · Toasted Breadcrumbs · Italian Meringue · Stabilized Whipped Cream · Mirror Glaze · Chocolate Decorations · Craquelin · Praline · Streusel Topping · Pistachio Paste · Caramelised White Chocolate',
      },
      { type: 'h4', text: 'Confection' },
      {
        type: 'paragraph',
        text: 'Tahini Halva · Turkish Delight · Marshmallows · Nougat · Dulce de Leche · Rocky Road · Coconut Chocolate Bars · Brigadeiros · Caramelised White Chocolate',
      },
      { type: 'h4', text: 'International Specialties' },
      {
        type: 'paragraph',
        text: 'Injera · Dabo Kolo · Ambasha · Himbasha · Ethiopian Honey Bread · Difo Dabo · Pastel de Nata · Gulab Jamun · Melktert · Bao Buns · Bienenstich · Kanelbullar · Sernik · Poffertjes · Melon Pan · Anpan · Pineapple Buns · Cozonac · Kolache · Rugelach · Hamantaschen · Brioche Nanterre · Medovik · Qatayef',
      },
    ],
  },
  {
    id: 'back-matter',
    label: 'Back Matter',
    title: 'Back Matter',
    pageNumber: 88,
    summary: 'Professional practice standards, food-safety verification notes, and final metric/temperature/USD reference summary.',
    blocks: [
      {
        type: 'subheading',
        text: 'Professional practice notes',
      },
      {
        type: 'list',
        items: [
          'Always verify local food-safety regulations and adapt recipes and processes accordingly.',
          'Keep production records for quality control and traceability.',
          'Train staff regularly on hygiene, equipment and recipe standards.',
          'Maintain equipment and calibrate thermometers and scales.',
          'Review costs and selling prices regularly.',
        ],
      },
      {
        type: 'subheading',
        text: 'Professional reference summary',
      },
      {
        type: 'table',
        table: {
          headers: ['Topic', 'Reference'],
          rows: [
            ['Measurement standard', 'Metric; weight for dry ingredients'],
            ['Temperature standard', 'Degrees Celsius (°C)'],
            ['Costing currency', 'United States Dollar (USD)'],
            ['Danger zone', '5–63°C'],
            ['Chilled storage', '0–5°C'],
            ['Frozen storage', '−18°C or below'],
            ['Hot holding', 'Above 63°C'],
            ["Baker's %", '(Ingredient ÷ Flour) × 100'],
          ],
        },
      },
      {
        type: 'callout',
        text: 'This manuscript is a professional reference and training resource. Food-safety requirements must be verified against local regulations before implementation.',
      },
    ],
  },
];
