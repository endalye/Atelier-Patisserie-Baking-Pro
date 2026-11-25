export type RecipeCategory =
  | 'Cakes & Cupcakes'
  | 'Cookies, Bars & Biscuits'
  | 'Breads & Yeasted Products'
  | 'Pizzas'
  | 'Pastries & Laminated Doughs'
  | 'Creams, Fillings & Desserts'
  | 'Candies & Confections'
  | 'International Sweets';

export interface RecipeIngredient {
  name: string;
  amount: number | null;
  unit: string;
  rawQuantity: string;
  isFlour?: boolean;
  unitCostPerKgOrL?: number; // USD ($) per kg or L
}

export interface StandardizedRecipe {
  id: string;
  number: number;
  title: string;
  category: RecipeCategory;
  bookSection?: string;
  searchAliases?: string[];
  classification: string;
  yieldText: string;
  portions: number;
  prepTime: string;
  productionTime?: string;
  bakeTime: string;
  ovenTemp: string;
  equipment?: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  qualityStandard: string;
  faultCorrection?: string;
  storage?: string;
  allergens: string[];
  chefNote?: string;
}

export function estimateUnitCost(name: string): number {
  const n = name.toLowerCase();
  if (n.includes('vanilla pod') || n.includes('saffron')) return 140;
  if (n.includes('vanilla')) return 28;
  if (n.includes('truffle')) return 95;
  if (n.includes('butter') && !n.includes('buttermilk') && !n.includes('peanut')) return 7.4;
  if (n.includes('chocolate') || n.includes('cocoa')) return 11.2;
  if (
    n.includes('mascarpone') ||
    n.includes('ricotta') ||
    n.includes('cream cheese') ||
    n.includes('gruyère') ||
    n.includes('mozzarella') ||
    n.includes('parmesan') ||
    n.includes('feta') ||
    n.includes('cheddar') ||
    n.includes('cheese')
  ) {
    return 8.9;
  }
  if (n.includes('cream')) return 4.4;
  if (n.includes('milk') || n.includes('buttermilk') || n.includes('yoghurt')) return 1.35;
  if (n.includes('egg')) return 3.8;
  if (
    n.includes('almond') ||
    n.includes('walnut') ||
    n.includes('pistachio') ||
    n.includes('hazelnut') ||
    n.includes('pecan') ||
    n.includes('nuts') ||
    n.includes('peanut')
  ) {
    return 16.0;
  }
  if (n.includes('flour') || n.includes('semolina')) return 1.05;
  if (n.includes('sugar') || n.includes('honey') || n.includes('glucose') || n.includes('syrup')) {
    return 1.85;
  }
  if (n.includes('yeast')) return 16.5;
  if (n.includes('oil') || n.includes('ghee')) return 4.5;
  if (n.includes('water')) return 0.05;
  if (n.includes('salt')) return 0.75;
  return 4.8;
}

export const ing = (
  name: string,
  amount: number | null,
  unit: string,
  rawQuantity: string,
  opts?: { isFlour?: boolean; cost?: number }
): RecipeIngredient => ({
  name,
  amount,
  unit,
  rawQuantity,
  isFlour: opts?.isFlour ?? false,
  unitCostPerKgOrL: opts?.cost ?? estimateUnitCost(name),
});

export type CompactIngredient =
  | [name: string, amount: number | null, unit: string]
  | [name: string, amount: number | null, unit: string, isFlour: boolean]
  | [name: string, amount: number | null, unit: string, isFlour: boolean, rawQuantity: string];

export interface CompactRecipeInput {
  id: string;
  number: number;
  title: string;
  category: RecipeCategory;
  bookSection: string;
  classification: string;
  yieldText: string;
  portions: number;
  prepTime: string;
  bakeTime: string;
  ovenTemp: string;
  ingredients: CompactIngredient[];
  steps: string[];
  qualityStandard: string;
  storage: string;
  allergens: string[];
  chefNote?: string;
  searchAliases?: string[];
}

export function buildRecipe(input: CompactRecipeInput): StandardizedRecipe {
  return {
    id: input.id,
    number: input.number,
    title: input.title,
    category: input.category,
    bookSection: input.bookSection,
    searchAliases: input.searchAliases,
    classification: input.classification,
    yieldText: input.yieldText,
    portions: input.portions,
    prepTime: input.prepTime,
    bakeTime: input.bakeTime,
    ovenTemp: input.ovenTemp,
    ingredients: input.ingredients.map((item) => {
      const [name, amount, unit, isFlour, rawOverride] = item;
      const rawQuantity =
        rawOverride ?? (amount !== null ? `${amount} ${unit}`.trim() : unit);
      return ing(name, amount, unit, rawQuantity, { isFlour: Boolean(isFlour) });
    }),
    steps: input.steps,
    qualityStandard: input.qualityStandard,
    storage: input.storage,
    allergens: input.allergens,
    chefNote: input.chefNote,
  };
}
