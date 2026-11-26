import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  Check,
  ChefHat,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import {
  MASTER_INDEX_SECTIONS,
  RECIPE_CATEGORIES,
  RecipeCategory,
  STANDARDIZED_RECIPES,
  StandardizedRecipe,
} from '../data/recipes';
import {
  CustomRecipeItem,
  RecipeBookmarkItem,
  createCustomRecipe,
  deleteOwnerDocument,
  upsertRecipeBookmark,
} from '../lib/kitchenRepository';
import { useAuth } from './AuthContext';
import { useI18n } from '../i18n/I18nContext';
import {
  ALLERGEN_AM,
  ALLERGEN_AR,
  MASTER_SECTION_AM,
  MASTER_SECTION_AR,
  RECIPE_CATEGORY_AM,
  RECIPE_CATEGORY_AR,
} from '../i18n/translations';
import {
  getRecipeSearchBlob,
  getRecipeTitle,
  localizeClassification,
  localizeIngredientName,
  localizeStorage,
  localizeTemp,
  localizeTime,
  localizeUnit,
  localizeYield,
} from '../i18n/recipesAr';
import { localizeRecipeDetail } from '../i18n/coreRecipesAr';

interface RecipesExplorerProps {
  bookmarks: Record<string, RecipeBookmarkItem>;
  customRecipes: CustomRecipeItem[];
  initialCategory?: RecipeCategory | 'All';
  initialRecipeId?: string;
  initialFavoritesOnly?: boolean;
}

const ALL_ALLERGENS = [
  'Wheat',
  'Egg',
  'Milk',
  'Nuts',
  'Peanuts',
  'Almonds',
  'Pistachios',
  'Sesame',
];

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function RecipesExplorer({
  bookmarks,
  customRecipes,
  initialCategory = 'All',
  initialRecipeId,
  initialFavoritesOnly = false,
}: RecipesExplorerProps) {
  const { user, profile, signInWithGoogle } = useAuth();
  const { lang, isRtl, t } = useI18n();
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBookSection, setSelectedBookSection] = useState<string>('All');
  const [sortMode, setSortMode] = useState<'number' | 'alpha'>('number');
  const [searchQuery, setSearchQuery] = useState('');
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(initialFavoritesOnly);

  const [activeRecipeId, setActiveRecipeId] = useState<string>(
    initialRecipeId || STANDARDIZED_RECIPES[0].id
  );
  const [multiplier, setMultiplier] = useState<number>(1);
  const [showBakersPct, setShowBakersPct] = useState<boolean>(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [benchNoteDraft, setBenchNoteDraft] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [savingBookmark, setSavingBookmark] = useState(false);

  // Custom Recipe Modal State (Appendix C)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<RecipeCategory>('Breads & Yeasted Products');
  const [newClassification, setNewClassification] = useState(() => t('defaultCustomClassification'));
  const [newYield, setNewYield] = useState(() => t('defaultCustomYield'));
  const [newPortions, setNewPortions] = useState(10);
  const [newPrepTime, setNewPrepTime] = useState(() => t('defaultCustomPrep'));
  const [newBakeTime, setNewBakeTime] = useState(() => t('defaultCustomBake'));
  const [newOvenTemp, setNewOvenTemp] = useState(() => t('defaultCustomTemp'));
  const [newIngredientsText, setNewIngredientsText] = useState(() =>
    t('defaultCustomIngredients')
  );
  const [newStepsText, setNewStepsText] = useState(() => t('defaultCustomSteps'));
  const [newQualityStandard, setNewQualityStandard] = useState(() => t('defaultCustomQuality'));
  const [newCriticalPoints, setNewCriticalPoints] = useState(() => t('defaultCustomCcp'));
  const [newAllergensText, setNewAllergensText] = useState(() => t('defaultCustomAllergens'));
  const [newShelfLife, setNewShelfLife] = useState(() => t('defaultCustomShelfLife'));
  const [newCostBatch, setNewCostBatch] = useState(3.2);
  const [creatingRecipe, setCreatingRecipe] = useState(false);

  const prevModalDefaultsRef = useRef({
    classification: t('defaultCustomClassification'),
    yieldText: t('defaultCustomYield'),
    prepTime: t('defaultCustomPrep'),
    bakeTime: t('defaultCustomBake'),
    ovenTemp: t('defaultCustomTemp'),
    ingredients: t('defaultCustomIngredients'),
    steps: t('defaultCustomSteps'),
    quality: t('defaultCustomQuality'),
    ccp: t('defaultCustomCcp'),
    allergens: t('defaultCustomAllergens'),
    shelfLife: t('defaultCustomShelfLife'),
  });

  useEffect(() => {
    const prev = prevModalDefaultsRef.current;
    const next = {
      classification: t('defaultCustomClassification'),
      yieldText: t('defaultCustomYield'),
      prepTime: t('defaultCustomPrep'),
      bakeTime: t('defaultCustomBake'),
      ovenTemp: t('defaultCustomTemp'),
      ingredients: t('defaultCustomIngredients'),
      steps: t('defaultCustomSteps'),
      quality: t('defaultCustomQuality'),
      ccp: t('defaultCustomCcp'),
      allergens: t('defaultCustomAllergens'),
      shelfLife: t('defaultCustomShelfLife'),
    };
    setNewClassification((v) => (v === prev.classification ? next.classification : v));
    setNewYield((v) => (v === prev.yieldText ? next.yieldText : v));
    setNewPrepTime((v) => (v === prev.prepTime ? next.prepTime : v));
    setNewBakeTime((v) => (v === prev.bakeTime ? next.bakeTime : v));
    setNewOvenTemp((v) => (v === prev.ovenTemp ? next.ovenTemp : v));
    setNewIngredientsText((v) => (v === prev.ingredients ? next.ingredients : v));
    setNewStepsText((v) => (v === prev.steps ? next.steps : v));
    setNewQualityStandard((v) => (v === prev.quality ? next.quality : v));
    setNewCriticalPoints((v) => (v === prev.ccp ? next.ccp : v));
    setNewAllergensText((v) => (v === prev.allergens ? next.allergens : v));
    setNewShelfLife((v) => (v === prev.shelfLife ? next.shelfLife : v));
    prevModalDefaultsRef.current = next;
  }, [lang, t]);

  const getCategoryLabel = (cat: string) =>
    lang === 'ar'
      ? RECIPE_CATEGORY_AR[cat] || cat
      : lang === 'am'
        ? RECIPE_CATEGORY_AM[cat] || cat
        : cat;

  const getSectionLabel = (sec: string) =>
    lang === 'ar'
      ? MASTER_SECTION_AR[sec] || sec
      : lang === 'am'
        ? MASTER_SECTION_AM[sec] || sec
        : sec;

  const getAllergenLabel = (allergen: string) => {
    if (lang === 'ar') {
      if (ALLERGEN_AR[allergen]) return ALLERGEN_AR[allergen];
      const entry = Object.entries(ALLERGEN_AR).find(
        ([k]) => k.toLowerCase() === allergen.trim().toLowerCase()
      );
      return entry ? entry[1] : allergen;
    }
    if (lang === 'am') {
      if (ALLERGEN_AM[allergen]) return ALLERGEN_AM[allergen];
      const entry = Object.entries(ALLERGEN_AM).find(
        ([k]) => k.toLowerCase() === allergen.trim().toLowerCase()
      );
      return entry ? entry[1] : allergen;
    }
    return allergen;
  };

  // Merge manual + user custom recipes into unified list
  const allRecipes = useMemo(() => {
    const mappedCustom: (StandardizedRecipe & { isCustom?: boolean })[] = customRecipes.map(
      (cr, idx) => ({
        id: cr.id,
        number: 100 + idx + 1,
        title: cr.title,
        category: (RECIPE_CATEGORIES.includes(cr.category as RecipeCategory)
          ? cr.category
          : 'Cakes & Cupcakes') as RecipeCategory,
        classification: cr.classification,
        yieldText: cr.targetYield,
        portions: cr.portions || 1,
        prepTime: cr.prepTime,
        bakeTime: cr.bakeTime,
        ovenTemp: cr.ovenTemp,
        ingredients: cr.ingredients.map((line) => {
          const parts = line.split('|').map((s) => s.trim());
          const name = parts[0] || line;
          const amt = parts[1] ? Number(parts[1]) : null;
          const unit = parts[2] || 'g';
          return {
            name,
            amount: Number.isFinite(amt) ? amt : null,
            unit,
            rawQuantity: amt !== null && Number.isFinite(amt) ? `${amt} ${unit}` : line,
            isFlour:
              name.toLowerCase().includes('flour') ||
              name.includes('دقيق') ||
              name.includes('ዱቄት'),
            unitCostPerKgOrL: 2.5,
          };
        }),
        steps: cr.methodSteps,
        qualityStandard: cr.qualityStandard || t('customDefaultQualityFallback'),
        storage: cr.shelfLife,
        allergens: cr.allergens || [],
        chefNote: cr.criticalControlPoints,
        isCustom: true,
      })
    );
    return [...mappedCustom, ...STANDARDIZED_RECIPES];
  }, [customRecipes, t]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of RECIPE_CATEGORIES) counts[cat] = 0;
    for (const r of allRecipes) {
      counts[r.category] = (counts[r.category] || 0) + 1;
    }
    return counts;
  }, [allRecipes]);

  const filteredRecipes = useMemo(() => {
    const rawQuery = searchQuery.trim();
    const q = normalizeSearch(rawQuery);
    const numQuery = rawQuery.replace(/^#/, '').trim();
    const isNumericQuery = /^\d+$/.test(numQuery);

    const list = allRecipes.filter((r) => {
      if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
      if (selectedBookSection !== 'All' && r.bookSection !== selectedBookSection) return false;
      if (favoritesOnly && !bookmarks[r.id]?.isFavorite) return false;
      if (excludedAllergens.length > 0) {
        const hasExcluded = r.allergens.some((a) =>
          excludedAllergens.some((ex) => {
            const arEx = ALLERGEN_AR[ex];
            const amEx = ALLERGEN_AM[ex];
            return (
              a.toLowerCase().includes(ex.toLowerCase()) ||
              (arEx ? a.includes(arEx) : false) ||
              (amEx ? a.includes(amEx) : false)
            );
          })
        );
        if (hasExcluded) return false;
      }
      if (q) {
        const inNumber = isNumericQuery && String(r.number) === numQuery;
        const inBlob = normalizeSearch(getRecipeSearchBlob(r)).includes(q);
        const inCat = normalizeSearch(getCategoryLabel(r.category)).includes(q);
        if (!inNumber && !inBlob && !inCat) return false;
      }
      return true;
    });

    if (sortMode === 'alpha') {
      return [...list].sort((a, b) =>
        getRecipeTitle(a, lang).localeCompare(getRecipeTitle(b, lang), lang)
      );
    }
    return list;
  }, [
    allRecipes,
    selectedCategory,
    selectedBookSection,
    favoritesOnly,
    excludedAllergens,
    searchQuery,
    bookmarks,
    sortMode,
    lang,
  ]);

  const activeRecipe = useMemo(() => {
    return (
      allRecipes.find((r) => r.id === activeRecipeId) ||
      filteredRecipes[0] ||
      STANDARDIZED_RECIPES[0]
    );
  }, [allRecipes, activeRecipeId, filteredRecipes]);

  const activeDetailAr = useMemo(
    () => localizeRecipeDetail(activeRecipe, lang),
    [activeRecipe, lang]
  );

  const totalFlourWeight = useMemo(() => {
    return activeRecipe.ingredients
      .filter((i) => i.isFlour && i.amount !== null)
      .reduce((sum, i) => sum + (i.amount || 0), 0);
  }, [activeRecipe]);

  const scaledBatchCost = useMemo(() => {
    const customMatch = customRecipes.find((c) => c.id === activeRecipe.id);
    if (customMatch) {
      return customMatch.costPerBatch * multiplier;
    }
    return activeRecipe.ingredients.reduce((sum, item) => {
      if (!item.amount) return sum;
      const unitFactor =
        item.unit === 'g' || item.unit === 'ml' ? item.amount / 1000 : item.amount * 0.05;
      const cost = unitFactor * (item.unitCostPerKgOrL ?? 2.5) * multiplier;
      return sum + cost;
    }, 0);
  }, [activeRecipe, customRecipes, multiplier]);

  const targetFoodCostPct = profile?.targetFoodCostPct ?? 30;
  const scaledPortions = Math.max(1, Math.round(activeRecipe.portions * multiplier));
  const costPerPortion = scaledBatchCost / scaledPortions;
  const suggestedSellPrice = costPerPortion / (targetFoodCostPct / 100);

  const toggleAllergenExclusion = (allergen: string) => {
    setExcludedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  const handleSelectRecipe = (id: string) => {
    setActiveRecipeId(id);
    setCheckedIngredients({});
    setCheckedSteps({});
    setEditingNoteId(null);
    if (window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleFavorite = async (recipeId: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setSavingBookmark(true);
    try {
      const existing = bookmarks[recipeId];
      await upsertRecipeBookmark(
        user.uid,
        recipeId,
        !(existing?.isFavorite ?? false),
        existing?.notes ?? '',
        Boolean(existing)
      );
    } finally {
      setSavingBookmark(false);
    }
  };

  const handleSaveNote = async (recipeId: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setSavingBookmark(true);
    try {
      const existing = bookmarks[recipeId];
      await upsertRecipeBookmark(
        user.uid,
        recipeId,
        existing?.isFavorite ?? false,
        benchNoteDraft,
        Boolean(existing)
      );
      setEditingNoteId(null);
    } finally {
      setSavingBookmark(false);
    }
  };

  const handleCreateCustomRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setCreatingRecipe(true);
    try {
      const ingLines = newIngredientsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const stepLines = newStepsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const allergenList = newAllergensText
        .split(/[،,]/)
        .map((s) => s.trim())
        .filter(Boolean);

      await createCustomRecipe(user.uid, {
        title: newTitle,
        category: newCategory,
        classification: newClassification,
        targetYield: newYield,
        prepTime: newPrepTime,
        bakeTime: newBakeTime,
        ovenTemp: newOvenTemp,
        ingredients: ingLines,
        methodSteps: stepLines,
        criticalControlPoints: newCriticalPoints,
        qualityStandard: newQualityStandard,
        allergens: allergenList,
        shelfLife: newShelfLife,
        portions: newPortions,
        costPerBatch: newCostBatch,
      });
      setShowCreateModal(false);
      setNewTitle('');
    } finally {
      setCreatingRecipe(false);
    }
  };

  const activeBookmark = bookmarks[activeRecipe.id];
  const isCustomActive = customRecipes.some((c) => c.id === activeRecipe.id);
  const displaySteps = activeDetailAr.steps ?? activeRecipe.steps;
  const displayEquipment = activeDetailAr.equipment ?? activeRecipe.equipment;
  const displayQualityStandard = activeDetailAr.qualityStandard ?? activeRecipe.qualityStandard;
  const displayFaultCorrection = activeDetailAr.faultCorrection ?? activeRecipe.faultCorrection;
  const displayStorage =
    activeDetailAr.storage ?? localizeStorage(activeRecipe.storage, lang);
  const displayChefNote = activeDetailAr.chefNote ?? activeRecipe.chefNote;
  const joinDot = ' · ';

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t('recipeBenchTitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('recipeBenchDesc', { count: allRecipes.length })}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              {t('newCustomRecipe')}
            </button>
          ) : (
            <button
              type="button"
              onClick={signInWithGoogle}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Bookmark className="w-4 h-4" />
              {t('signInSaveCustom')}
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchBenchPlaceholder')}
              className="w-full ps-9 pe-8 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label={t('clearSearchAria')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedBookSection}
              onChange={(e) => setSelectedBookSection(e.target.value)}
              aria-label={t('filterSectionAria')}
              className="px-2.5 py-2 text-xs font-medium bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-200"
            >
              <option value="All">{t('allManualSections')}</option>
              {MASTER_INDEX_SECTIONS.map((sec) => (
                <option key={sec} value={sec}>
                  {getSectionLabel(sec)}
                </option>
              ))}
            </select>

            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as 'number' | 'alpha')}
              aria-label={t('sortRecipeAria')}
              className="px-2.5 py-2 text-xs font-medium bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-200"
            >
              <option value="number">{t('sortByNumber', { count: allRecipes.length })}</option>
              <option value="alpha">{t('sortAlpha')}</option>
            </select>

            <button
              type="button"
              onClick={() => setFavoritesOnly((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                favoritesOnly
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  favoritesOnly
                    ? 'fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400'
                    : ''
                }`}
              />
              {t('savedFavoritesBtn')}
            </button>

            {(excludedAllergens.length > 0 ||
              selectedCategory !== 'All' ||
              selectedBookSection !== 'All' ||
              favoritesOnly ||
              searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={() => {
                  setExcludedAllergens([]);
                  setSelectedCategory('All');
                  setSelectedBookSection('All');
                  setFavoritesOnly(false);
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t('resetBtn')}
              </button>
            )}
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('allCategoriesTab', { count: allRecipes.length })}
          </button>
          {RECIPE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {getCategoryLabel(cat)} ({categoryCounts[cat] || 0})
            </button>
          ))}
        </div>

        {/* Allergen Exclusion Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {t('excludeAllergensLabel')}
          </span>
          {ALL_ALLERGENS.map((allergen) => {
            const excluded = excludedAllergens.includes(allergen);
            const allergenDisplay = getAllergenLabel(allergen);
            return (
              <button
                key={allergen}
                type="button"
                onClick={() => toggleAllergenExclusion(allergen)}
                className={`px-2.5 py-1 rounded border transition-colors whitespace-nowrap shrink-0 ${
                  excluded
                    ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 font-medium'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {excluded ? t('noAllergenPrefix', { allergen: allergenDisplay }) : allergenDisplay}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Workspace: Recipe Catalog List + Active Production Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Catalog List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {t('showingCountOfTotal', {
                filtered: filteredRecipes.length,
                total: allRecipes.length,
              })}
            </span>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t('noRecipesMatch')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('noRecipesMatchDesc')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setExcludedAllergens([]);
                  setSelectedCategory('All');
                  setSelectedBookSection('All');
                  setFavoritesOnly(false);
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t('resetAllFilters')}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-[340px] lg:max-h-[760px] overflow-y-auto">
              {filteredRecipes.map((recipe) => {
                const isSelected = recipe.id === activeRecipe.id;
                const isFav = bookmarks[recipe.id]?.isFavorite;
                return (
                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() => handleSelectRecipe(recipe.id)}
                    className={`w-full text-start px-4 py-3.5 transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-50/70 dark:bg-amber-950/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {!('isCustom' in recipe && recipe.isCustom) ? `${recipe.number}. ` : ''}
                        {getRecipeTitle(recipe, lang)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {recipe.bookSection ? `${getSectionLabel(recipe.bookSection)} · ` : ''}
                        {localizeTemp(recipe.ovenTemp, lang)}
                      </p>
                    </div>
                    {isFav && (
                      <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail / Bench Scaler */}
        <div
          ref={detailRef}
          className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-6 space-y-6 min-w-0"
        >
          {/* Recipe Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-xs font-medium text-amber-800 dark:text-amber-400">
                {getCategoryLabel(activeRecipe.category)}
                {activeRecipe.bookSection ? ` · ${getSectionLabel(activeRecipe.bookSection)}` : ''} ·{' '}
                {localizeClassification(activeRecipe.classification, lang)}
              </p>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-1">
                {getRecipeTitle(activeRecipe, lang)}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-mono tabular-nums">
                {t('baseYieldLabel')}: {localizeYield(activeRecipe.yieldText, lang)} ·{' '}
                {t('prepLabel')}: {localizeTime(activeRecipe.prepTime, lang)}
                {activeRecipe.productionTime
                  ? ` · ${t('productionLabel')}: ${localizeTime(activeRecipe.productionTime, lang)}`
                  : ''}{' '}
                · {t('bakeLabel')}: {localizeTime(activeRecipe.bakeTime, lang)} · {t('ovenLabel')}:{' '}
                {localizeTemp(activeRecipe.ovenTemp, lang)}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={savingBookmark}
                onClick={() => handleToggleFavorite(activeRecipe.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  activeBookmark?.isFavorite
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    activeBookmark?.isFavorite
                      ? 'fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400'
                      : ''
                  }`}
                />
                {activeBookmark?.isFavorite ? t('savedBadge') : t('saveBtn')}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
              >
                <Printer className="w-3.5 h-3.5" />
                {t('printSheet')}
              </button>

              {isCustomActive && user && (
                <button
                  type="button"
                  onClick={() => deleteOwnerDocument('customRecipes', activeRecipe.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-red-700 dark:text-red-400 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 rounded-md hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                  title={t('deleteCustomTitle')}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Batch Scaler & Costing Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('batchMultiplier')}
                </span>
                <span className="text-xs font-mono tabular-nums text-amber-800 dark:text-amber-400 font-semibold">
                  {multiplier}× ({t('portionsCount', { count: scaledPortions })})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {[0.5, 1, 2, 3, 5].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMultiplier(m)}
                    className={`px-2.5 py-1.5 text-xs font-mono tabular-nums rounded border transition-colors ${
                      multiplier === m
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {m}×
                  </button>
                ))}
                <input
                  type="number"
                  min="0.25"
                  max="50"
                  step="0.25"
                  value={multiplier}
                  onChange={(e) => setMultiplier(Math.max(0.25, Number(e.target.value) || 1))}
                  className="w-16 px-2 py-1 text-xs font-mono tabular-nums border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  aria-label={t('customMultiplierAria')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t md:border-t-0 md:border-s border-slate-200 dark:border-slate-700 pt-3 md:pt-0 md:ps-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('estBatchCost')}</p>
                <p className="text-sm font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-0.5">
                  ${scaledBatchCost.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('costPerPortionLabel')}
                </p>
                <p className="text-sm font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-0.5">
                  ${costPerPortion.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('menuFcLabel', { pct: targetFoodCostPct })}
                </p>
                <p className="text-sm font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400 mt-0.5">
                  ${suggestedSellPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredient Scaling Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t('ingredientsMiseEnPlace')}
              </h4>
              {totalFlourWeight > 0 && (
                <button
                  type="button"
                  onClick={() => setShowBakersPct((v) => !v)}
                  className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline underline-offset-2"
                >
                  {showBakersPct ? t('hideBakersPct') : t('showBakersPct')}
                </button>
              )}
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-md overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5 w-10 font-medium">{t('colPrep')}</th>
                    <th className="px-3 py-2.5 font-medium">{t('colIngredient')}</th>
                    <th className="px-3 py-2.5 text-end font-medium">{t('colScaledQty')}</th>
                    {showBakersPct && totalFlourWeight > 0 && (
                      <th className="px-3 py-2.5 text-end font-medium">{t('colBakersPct')}</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {activeRecipe.ingredients.map((item, idx) => {
                    const key = `${activeRecipe.id}-ing-${idx}`;
                    const checked = Boolean(checkedIngredients[key]);
                    const scaledVal =
                      item.amount !== null
                        ? Math.round(item.amount * multiplier * 10) / 10
                        : null;
                    const bakersPct =
                      item.amount !== null && totalFlourWeight > 0
                        ? ((item.amount / totalFlourWeight) * 100).toFixed(1)
                        : null;

                    return (
                      <tr
                        key={key}
                        onClick={() =>
                          setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }))
                        }
                        className={`cursor-pointer transition-colors ${
                          checked
                            ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 line-through'
                            : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center justify-center w-4 h-4 rounded border ${
                              checked
                                ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900'
                                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3" />}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-medium">
                          {localizeIngredientName(item.name, lang)}
                        </td>
                        <td
                          className={`px-3 py-2 text-end font-mono tabular-nums ${
                            checked
                              ? 'text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {scaledVal !== null
                            ? `${scaledVal} ${localizeUnit(item.unit, lang)}`
                            : localizeYield(item.rawQuantity, lang)}
                        </td>
                        {showBakersPct && totalFlourWeight > 0 && (
                          <td className="px-3 py-2 text-end font-mono tabular-nums text-xs text-slate-500 dark:text-slate-400">
                            {bakersPct ? `${bakersPct}%` : '—'}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Method Steps */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              {t('productionMethod')}
            </h4>
            <ol className="space-y-2.5">
              {displaySteps.map((step, idx) => {
                const key = `${activeRecipe.id}-step-${idx}`;
                const done = Boolean(checkedSteps[key]);
                return (
                  <li
                    key={key}
                    onClick={() => setCheckedSteps((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                      done
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 line-through'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold text-amber-800 dark:text-amber-400 mt-0.5 shrink-0">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    <span className="text-sm leading-relaxed">{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Quality Standard, Fault Correction, Storage & Declared Allergens */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {displayEquipment && (
              <p>
                <strong className="text-slate-900 dark:text-slate-100">
                  {t('metaEquipment')}
                </strong>{' '}
                {displayEquipment}
              </p>
            )}
            <p>
              <strong className="text-slate-900 dark:text-slate-100">
                {t('metaQualityStandard')}
              </strong>{' '}
              {displayQualityStandard}
            </p>
            {displayFaultCorrection && (
              <p>
                <strong className="text-slate-900 dark:text-slate-100">
                  {t('metaFaultCorrection')}
                </strong>{' '}
                {displayFaultCorrection}
              </p>
            )}
            {displayStorage && (
              <p>
                <strong className="text-slate-900 dark:text-slate-100">
                  {t('metaStorageShelfLife')}
                </strong>{' '}
                {displayStorage}
              </p>
            )}
            {displayChefNote && (
              <p>
                <strong className="text-slate-900 dark:text-slate-100">
                  {t('metaChefNote')}
                </strong>{' '}
                {displayChefNote}
              </p>
            )}
            <p>
              <strong className="text-slate-900 dark:text-slate-100">
                {t('metaDeclaredAllergens')}
              </strong>{' '}
              {activeRecipe.allergens.length > 0
                ? activeRecipe.allergens.map((a) => getAllergenLabel(a)).join(joinDot)
                : t('noneDeclared')}
            </p>
          </div>

          {/* Cloud Kitchen Bench Notes */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t('benchNotesTitle')}
              </h4>
              {user && editingNoteId !== activeRecipe.id && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingNoteId(activeRecipe.id);
                    setBenchNoteDraft(activeBookmark?.notes ?? '');
                  }}
                  className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300"
                >
                  {activeBookmark?.notes ? t('editNote') : t('addNote')}
                </button>
              )}
            </div>

            {editingNoteId === activeRecipe.id ? (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  maxLength={500}
                  value={benchNoteDraft}
                  onChange={(e) => setBenchNoteDraft(e.target.value)}
                  placeholder={t('benchNotesPlaceholder')}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={savingBookmark}
                    onClick={() => handleSaveNote(activeRecipe.id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white"
                  >
                    {savingBookmark ? t('saving') : t('saveNoteCloud')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingNoteId(null)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {activeBookmark?.notes
                  ? activeBookmark.notes
                  : user
                    ? t('noNotesLogged')
                    : t('signInForNotes')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Create Custom Recipe Modal (Appendix C) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-slate-950/70 flex items-center justify-center p-4">
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {t('appendixCTitle')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                aria-label={t('cancel')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomRecipe} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('recipeTitleLabel')}
                  </span>
                  <input
                    required
                    maxLength={120}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={t('recipeTitlePlaceholder')}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('categoryLabel')}
                  </span>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as RecipeCategory)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  >
                    {RECIPE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {getCategoryLabel(c)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('targetYieldLabel')}
                  </span>
                  <input
                    required
                    value={newYield}
                    onChange={(e) => setNewYield(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('portionsLabel')}
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    required
                    value={newPortions}
                    onChange={(e) => setNewPortions(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('ovenTempFieldLabel')}
                  </span>
                  <input
                    value={newOvenTemp}
                    onChange={(e) => setNewOvenTemp(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('batchCostUsdLabel')}
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={newCostBatch}
                    onChange={(e) => setNewCostBatch(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('classificationLabel')}
                  </span>
                  <input
                    required
                    value={newClassification}
                    onChange={(e) => setNewClassification(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('prepTimeLabel')}
                  </span>
                  <input
                    required
                    value={newPrepTime}
                    onChange={(e) => setNewPrepTime(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('bakeTimeLabel')}
                  </span>
                  <input
                    required
                    value={newBakeTime}
                    onChange={(e) => setNewBakeTime(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('ingredientsFormatLabel')}
                </span>
                <textarea
                  rows={4}
                  required
                  value={newIngredientsText}
                  onChange={(e) => setNewIngredientsText(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 text-xs font-mono"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('methodStepsFormatLabel')}
                </span>
                <textarea
                  rows={4}
                  required
                  value={newStepsText}
                  onChange={(e) => setNewStepsText(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 text-sm"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('qualityStandardFieldLabel')}
                  </span>
                  <input
                    value={newQualityStandard}
                    onChange={(e) => setNewQualityStandard(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('allergensFieldLabel')}
                  </span>
                  <input
                    value={newAllergensText}
                    onChange={(e) => setNewAllergensText(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('criticalControlPointsLabel')}
                  </span>
                  <input
                    value={newCriticalPoints}
                    onChange={(e) => setNewCriticalPoints(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('shelfLifeLabel')}
                  </span>
                  <input
                    value={newShelfLife}
                    onChange={(e) => setNewShelfLife(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={creatingRecipe}
                  className="px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white"
                >
                  {creatingRecipe ? t('savingFormula') : t('saveStandardizedRecipe')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
