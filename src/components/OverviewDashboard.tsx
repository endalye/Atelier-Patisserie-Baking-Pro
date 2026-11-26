import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChefHat,
  ClipboardList,
  FlaskConical,
  Plus,
  Search,
  Sparkles,
  Star,
  Thermometer,
  X,
} from 'lucide-react';
import {
  RECIPE_CATEGORIES,
  RecipeCategory,
  STANDARDIZED_RECIPES,
  StandardizedRecipe,
  findRecipeByIndexTitle,
} from '../data/recipes';
import {
  CustomRecipeItem,
  ProductionLogItem,
  ProductionStatus,
  RecipeBookmarkItem,
  SensoryEvaluationItem,
  TempCategory,
  TemperatureLogItem,
  createProductionLog,
  createSensoryEvaluation,
  createTemperatureLog,
  evaluateTemperatureStatus,
  updateProductionLogStatus,
  upsertRecipeBookmark,
} from '../lib/kitchenRepository';
import { useAuth } from './AuthContext';
import { useI18n } from '../i18n/I18nContext';
import { RECIPE_CATEGORY_AM, RECIPE_CATEGORY_AR } from '../i18n/translations';
import {
  RECIPE_TITLES_AR,
  getRecipeSearchBlob,
  getRecipeTitle,
  localizeTemp,
  localizeYield,
} from '../i18n/recipesAr';
import { RECIPE_TITLES_AM } from '../i18n/recipesAm';

export type WorkspaceSection =
  | 'overview'
  | 'recipes'
  | 'manual'
  | 'operations'
  | 'calculators';

export type OperationsTab = 'production' | 'temperature' | 'sensory';

interface OverviewDashboardProps {
  onNavigate: (section: WorkspaceSection) => void;
  onOpenRecipe: (category?: RecipeCategory | 'All', recipeId?: string, favoritesOnly?: boolean) => void;
  onOpenOperations: (tab: OperationsTab) => void;
  productionLogs: ProductionLogItem[];
  temperatureLogs: TemperatureLogItem[];
  sensoryEvaluations: SensoryEvaluationItem[];
  customRecipes: CustomRecipeItem[];
  bookmarks: Record<string, RecipeBookmarkItem>;
}

type TimeframeFilter = 'all' | 'today' | '7d';
type ActivityFilter = 'all' | 'batches' | 'temps' | 'sensory';
type QuickLogMode = 'none' | 'batch' | 'temp' | 'sensory';
type QuickCalcMode = 'ddt' | 'cost' | 'convert';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function nowTimeStr(): string {
  return new Date().toTimeString().slice(0, 5);
}

function isWithinDays(dateStr: string, days: number): boolean {
  if (!dateStr) return false;
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1));
  return parsed >= cutoff;
}

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function findLinkedRecipe(title: string): StandardizedRecipe | undefined {
  const direct = findRecipeByIndexTitle(title);
  if (direct) return direct;
  const trimmed = title.trim();
  if (!trimmed) return undefined;
  return STANDARDIZED_RECIPES.find(
    (r) => RECIPE_TITLES_AR[r.id] === trimmed || RECIPE_TITLES_AM[r.id] === trimmed
  );
}

export function OverviewDashboard({
  onNavigate,
  onOpenRecipe,
  onOpenOperations,
  productionLogs,
  temperatureLogs,
  sensoryEvaluations,
  customRecipes,
  bookmarks,
}: OverviewDashboardProps) {
  const { user, profile, signInWithGoogle } = useAuth();
  const { lang, isRtl, t } = useI18n();
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [benchImgFailed, setBenchImgFailed] = useState(false);

  // Command search state
  const [quickQuery, setQuickQuery] = useState('');

  // Dashboard filters
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('all');
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');

  // Inline Quick Log Forms
  const [quickLogMode, setQuickLogMode] = useState<QuickLogMode>('none');
  const [batchProduct, setBatchProduct] = useState(() => t('defaultBatchProduct'));
  const [batchSize, setBatchSize] = useState(() => t('defaultBatchSize'));
  const [batchTime, setBatchTime] = useState(nowTimeStr());
  const [batchOperator, setBatchOperator] = useState(
    () => profile?.displayName || t('defaultChefName')
  );
  const [savingQuickLog, setSavingQuickLog] = useState(false);

  const [probeEquipment, setProbeEquipment] = useState(() => t('defaultProbeEquipment'));
  const [probeCategory, setProbeCategory] = useState<TempCategory>('chilled');
  const [probeTempC, setProbeTempC] = useState(3.2);
  const [probeAction, setProbeAction] = useState('');
  const [probeInitials, setProbeInitials] = useState('HB');

  const [sensoryProduct, setSensoryProduct] = useState(() => t('defaultSensoryProduct'));
  const [sensoryScores, setSensoryScores] = useState({
    appearance: 5,
    colour: 5,
    texture: 4,
    flavour: 5,
    aroma: 5,
  });
  const [sensoryNotes, setSensoryNotes] = useState('');

  const prevDefaultsRef = useRef({
    batchProduct: t('defaultBatchProduct'),
    batchSize: t('defaultBatchSize'),
    batchOperator: t('defaultChefName'),
    probeEquipment: t('defaultProbeEquipment'),
    sensoryProduct: t('defaultSensoryProduct'),
  });

  useEffect(() => {
    const prev = prevDefaultsRef.current;
    const nextDefaults = {
      batchProduct: t('defaultBatchProduct'),
      batchSize: t('defaultBatchSize'),
      batchOperator: t('defaultChefName'),
      probeEquipment: t('defaultProbeEquipment'),
      sensoryProduct: t('defaultSensoryProduct'),
    };
    setBatchProduct((v) => (v === prev.batchProduct ? nextDefaults.batchProduct : v));
    setBatchSize((v) => (v === prev.batchSize ? nextDefaults.batchSize : v));
    if (!profile?.displayName) {
      setBatchOperator((v) => (v === prev.batchOperator ? nextDefaults.batchOperator : v));
    }
    setProbeEquipment((v) => (v === prev.probeEquipment ? nextDefaults.probeEquipment : v));
    setSensoryProduct((v) => (v === prev.sensoryProduct ? nextDefaults.sensoryProduct : v));
    prevDefaultsRef.current = nextDefaults;
  }, [lang, profile?.displayName, t]);

  // Interactive Category Spotlights
  const [expandedCategory, setExpandedCategory] = useState<RecipeCategory | null>(null);

  // Interactive Mini Science & Costing Workbench
  const [quickCalcMode, setQuickCalcMode] = useState<QuickCalcMode>('ddt');
  const [ddtTarget, setDdtTarget] = useState(25);
  const [ddtFlour, setDdtFlour] = useState(20);
  const [ddtRoom, setDdtRoom] = useState(22);
  const [ddtFriction, setDdtFriction] = useState(6);

  const [costBatch, setCostBatch] = useState(3.4);
  const [costPortions, setCostPortions] = useState(12);
  const [costTargetPct, setCostTargetPct] = useState(profile?.targetFoodCostPct ?? 30);

  const [convCelsius, setConvCelsius] = useState(190);
  const [convGrams, setConvGrams] = useState(500);

  // Unified formula list (manual + custom)
  const allFormulasCount = STANDARDIZED_RECIPES.length + customRecipes.length;

  const searchResults = useMemo(() => {
    const raw = quickQuery.trim();
    if (!raw) return [];
    const q = normalizeSearch(raw);
    const numQuery = raw.replace(/^#/, '').trim();
    const isNum = /^\d+$/.test(numQuery);

    const matches: StandardizedRecipe[] = [];
    for (const r of STANDARDIZED_RECIPES) {
      const hit =
        (isNum && String(r.number) === numQuery) ||
        normalizeSearch(getRecipeSearchBlob(r)).includes(q);
      if (hit) {
        matches.push(r);
        if (matches.length >= 6) break;
      }
    }
    return matches;
  }, [quickQuery]);

  // Filtered operational records by Timeframe
  const scopedProduction = useMemo(() => {
    if (timeframe === 'today') return productionLogs.filter((l) => l.date === todayIso());
    if (timeframe === '7d') return productionLogs.filter((l) => isWithinDays(l.date, 7));
    return productionLogs;
  }, [productionLogs, timeframe]);

  const scopedTemps = useMemo(() => {
    if (timeframe === 'today') return temperatureLogs.filter((l) => l.date === todayIso());
    if (timeframe === '7d') return temperatureLogs.filter((l) => isWithinDays(l.date, 7));
    return temperatureLogs;
  }, [temperatureLogs, timeframe]);

  const scopedSensory = useMemo(() => {
    if (timeframe === 'today') return sensoryEvaluations.filter((l) => l.batchDate === todayIso());
    if (timeframe === '7d') return sensoryEvaluations.filter((l) => isWithinDays(l.batchDate, 7));
    return sensoryEvaluations;
  }, [sensoryEvaluations, timeframe]);

  // Derived KPI metrics
  const scheduledCount = scopedProduction.filter((p) => p.status === 'scheduled').length;
  const inProgressCount = scopedProduction.filter((p) => p.status === 'in_progress').length;
  const completedCount = scopedProduction.filter((p) => p.status === 'completed').length;
  const activeBatches = scheduledCount + inProgressCount;

  const nominalTemps = scopedTemps.filter((tItem) => tItem.status === 'nominal').length;
  const alertTemps = scopedTemps.filter((tItem) => tItem.status !== 'nominal').length;
  const tempCompliancePct =
    scopedTemps.length > 0 ? Math.round((nominalTemps / scopedTemps.length) * 100) : 100;

  const avgSensory =
    scopedSensory.length > 0
      ? (scopedSensory.reduce((s, e) => s + e.overall, 0) / scopedSensory.length).toFixed(1)
      : '—';

  const favoriteRecipes = useMemo(() => {
    return STANDARDIZED_RECIPES.filter((r) => bookmarks[r.id]?.isFavorite);
  }, [bookmarks]);

  const categoryBreakdown = useMemo(() => {
    return RECIPE_CATEGORIES.map((cat) => {
      const manualItems = STANDARDIZED_RECIPES.filter((r) => r.category === cat);
      const customCount = customRecipes.filter((c) => c.category === cat).length;
      const total = manualItems.length + customCount;
      return {
        category: cat,
        count: total,
        pct: Math.round((total / Math.max(1, allFormulasCount)) * 100),
        sample: manualItems.slice(0, 4),
      };
    });
  }, [customRecipes, allFormulasCount]);

  // Live preview evaluations
  const liveProbeStatus = evaluateTemperatureStatus(probeCategory, probeTempC);
  const liveSensoryOverall = (
    (sensoryScores.appearance +
      sensoryScores.colour +
      sensoryScores.texture +
      sensoryScores.flavour +
      sensoryScores.aroma) /
    5
  ).toFixed(1);
  const requiredWaterTemp = ddtTarget * 3 - (ddtFlour + ddtRoom + ddtFriction);
  const portionCost = costPortions > 0 ? costBatch / costPortions : 0;
  const menuPrice = costTargetPct > 0 ? portionCost / (costTargetPct / 100) : 0;

  const getCategoryLabel = (cat: string) =>
    lang === 'ar'
      ? RECIPE_CATEGORY_AR[cat] || cat
      : lang === 'am'
        ? RECIPE_CATEGORY_AM[cat] || cat
        : cat;

  const getTempZoneLabel = (zone: TempCategory) => {
    switch (zone) {
      case 'chilled':
        return t('zoneShortChilled');
      case 'frozen':
        return t('zoneShortFrozen');
      case 'chocolate':
        return t('zoneShortChocolate');
      case 'ambient':
        return t('zoneShortAmbient');
      case 'proofer':
        return t('zoneShortProofer');
      case 'oven':
        return t('zoneShortOven');
    }
  };

  const getTempStatusLabel = (status: 'nominal' | 'warning' | 'critical') => {
    if (status === 'nominal') return t('statusNominal');
    if (status === 'warning') return t('statusWarning');
    return t('statusCritical');
  };

  const degUnit = lang === 'ar' ? '°م' : '°C';
  const degFUnit = lang === 'ar' ? '°ف' : '°F';
  const arrowChar = isRtl ? '←' : '→';

  const handleQuickBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setSavingQuickLog(true);
    try {
      await createProductionLog(user.uid, {
        date: todayIso(),
        product: batchProduct,
        batchSize,
        startTime: batchTime || nowTimeStr(),
        endTime: '',
        actualYield: '',
        operator: batchOperator || profile?.displayName || t('roleBaker'),
        status: 'scheduled',
        notes: t('loggedFromDashboard'),
      });
      setQuickLogMode('none');
    } finally {
      setSavingQuickLog(false);
    }
  };

  const handleQuickTempSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setSavingQuickLog(true);
    try {
      await createTemperatureLog(user.uid, {
        date: todayIso(),
        time: nowTimeStr(),
        equipment: probeEquipment,
        category: probeCategory,
        temperatureC: probeTempC,
        correctiveAction: probeAction,
        initials: probeInitials || 'HB',
      });
      setProbeAction('');
      setQuickLogMode('none');
    } finally {
      setSavingQuickLog(false);
    }
  };

  const handleQuickSensorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setSavingQuickLog(true);
    try {
      await createSensoryEvaluation(user.uid, {
        recipeTitle: sensoryProduct,
        batchDate: todayIso(),
        evaluator: profile?.displayName || t('defaultOpsEvaluator'),
        appearance: sensoryScores.appearance,
        colour: sensoryScores.colour,
        texture: sensoryScores.texture,
        flavour: sensoryScores.flavour,
        aroma: sensoryScores.aroma,
        comments: sensoryNotes,
      });
      setSensoryNotes('');
      setQuickLogMode('none');
    } finally {
      setSavingQuickLog(false);
    }
  };

  const handleAdvanceStatus = async (item: ProductionLogItem, nextStatus: ProductionStatus) => {
    const nowTime = nowTimeStr();
    await updateProductionLogStatus(
      item.id,
      nextStatus,
      nextStatus === 'completed' && !item.actualYield ? item.batchSize : item.actualYield,
      nextStatus === 'completed' ? nowTime : item.endTime,
      item.notes
    );
  };

  const handleToggleFavorite = async (recipeId: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    const existing = bookmarks[recipeId];
    await upsertRecipeBookmark(
      user.uid,
      recipeId,
      !(existing?.isFavorite ?? false),
      existing?.notes ?? '',
      Boolean(existing)
    );
  };

  const featuredStaples = useMemo(() => {
    const ids = [
      'croissants',
      'sourdough-boule',
      'neapolitan-pizza-dough',
      'creme-patissiere',
      'victoria-sponge',
    ];
    return ids
      .map((id) => STANDARDIZED_RECIPES.find((r) => r.id === id))
      .filter((r): r is StandardizedRecipe => Boolean(r));
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero & Instant Formula Command Search */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-xs font-medium text-amber-800 dark:text-amber-400">
              {t('heroEyebrow', {
                kitchen: profile?.kitchenName || t('heroEyebrowDefaultKitchen'),
              })}
            </p>
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2 leading-tight [text-wrap:balance]">
              {t('heroTitle')}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed max-w-xl">
              {t('heroSubtitlePre')}{' '}
              <span className="font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
                {allFormulasCount}
              </span>{' '}
              {t('heroSubtitlePost')}
            </p>

            {/* Instant Formula Search Bar */}
            <div className="mt-5 relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchResults[0]) {
                    onOpenRecipe(searchResults[0].category, searchResults[0].id);
                  } else if (quickQuery.trim()) {
                    onOpenRecipe('All');
                  }
                }}
              >
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={quickQuery}
                    onChange={(e) => setQuickQuery(e.target.value)}
                    placeholder={t('quickSearchPlaceholder', { count: allFormulasCount })}
                    className="w-full ps-10 pe-24 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-950 transition-colors"
                    aria-label={t('quickSearchAria')}
                  />
                  {quickQuery && (
                    <button
                      type="button"
                      onClick={() => setQuickQuery('')}
                      className="absolute end-16 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      aria-label={t('clearQuickSearch')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {t('openButton')}
                  </button>
                </div>
              </form>

              {quickQuery.trim() !== '' && (
                <div className="mt-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2">
                      <span>{t('noMatchingFormula', { query: quickQuery })}</span>
                      <button
                        type="button"
                        onClick={() => onOpenRecipe('All')}
                        className="font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
                      >
                        {t('browseAllCount', { count: allFormulasCount })} {arrowChar}
                      </button>
                    </div>
                  ) : (
                    searchResults.map((recipe) => {
                      const isFav = Boolean(bookmarks[recipe.id]?.isFavorite);
                      return (
                        <div
                          key={recipe.id}
                          className="px-3.5 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => onOpenRecipe(recipe.category, recipe.id)}
                            className="flex-1 text-start min-w-0"
                          >
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                              <span className="font-mono text-xs text-amber-800 dark:text-amber-400 me-1.5">
                                #{recipe.number}
                              </span>
                              {getRecipeTitle(recipe, lang)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-mono tabular-nums">
                              {getCategoryLabel(recipe.category)} ·{' '}
                              {localizeTemp(recipe.ovenTemp, lang)} ·{' '}
                              {localizeYield(recipe.yieldText, lang)}
                            </p>
                          </button>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => void handleToggleFavorite(recipe.id)}
                              className="p-2 text-slate-400 hover:text-amber-500 rounded"
                              aria-label={isFav ? t('removeFromFavorites') : t('saveFavorite')}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  isFav ? 'fill-amber-500 text-amber-500' : ''
                                }`}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenRecipe(recipe.category, recipe.id)}
                              className="px-2.5 py-1.5 text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
                            >
                              {t('benchLink')} {arrowChar}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-6">
            <button
              type="button"
              onClick={() => onOpenRecipe('All')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              {t('openRecipeBench')}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('manual')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <BookOpen className="w-4 h-4" />
              {t('readTrainingManual')}
            </button>
            {!user && (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
              >
                {t('signInSyncCloud')}
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[200px] sm:min-h-[240px] bg-slate-100 dark:bg-slate-800">
          {!heroImgFailed ? (
            <img
              src="/src/assets/images/artisan_bakery_hero_1795100648606.jpg"
              alt={t('heroImgAlt')}
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-500 dark:text-slate-400">
              <ChefHat className="w-10 h-10 mb-2 text-amber-800 dark:text-amber-400" />
              <span className="text-xs font-medium">{t('heroImgFallback')}</span>
            </div>
          )}
        </div>
      </section>

      {/* Timeframe Control & Interactive 4-Column KPI Strip */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('telemetryHeading')}
          </h2>
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg self-start sm:self-auto">
            {(
              [
                { id: 'all', label: t('tfAll') },
                { id: '7d', label: t('tf7d') },
                { id: 'today', label: t('tfToday') },
              ] as { id: TimeframeFilter; label: string }[]
            ).map((tf) => (
              <button
                key={tf.id}
                type="button"
                onClick={() => setTimeframe(tf.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  timeframe === tf.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onOpenRecipe('All')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-5 text-start transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('kpiFormulas')}
              </p>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors rtl:rotate-180" />
            </div>
            <p className="text-2xl font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1.5">
              {allFormulasCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono tabular-nums">
              {t('kpiFormulasSub', {
                saved: favoriteRecipes.length,
                custom: customRecipes.length,
              })}
            </p>
          </button>

          <button
            type="button"
            onClick={() => onOpenOperations('production')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-5 text-start transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('kpiBatches')}
              </p>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors rtl:rotate-180" />
            </div>
            <p className="text-2xl font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1.5">
              {user ? activeBatches : '—'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono tabular-nums">
              {user
                ? t('kpiBatchesSub', {
                    queued: scheduledCount,
                    active: inProgressCount,
                    done: completedCount,
                  })
                : t('kpiBatchesSignedOut')}
            </p>
          </button>

          <button
            type="button"
            onClick={() => onOpenOperations('temperature')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-5 text-start transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('kpiTemp')}
              </p>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors rtl:rotate-180" />
            </div>
            <p
              className={`text-2xl font-semibold font-mono tabular-nums mt-1.5 ${
                !user
                  ? 'text-slate-900 dark:text-slate-100'
                  : alertTemps > 0
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {user ? `${tempCompliancePct}%` : '—'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono tabular-nums">
              {user
                ? alertTemps > 0
                  ? t('kpiTempAlerts', { alerts: alertTemps, total: scopedTemps.length })
                  : t('kpiTempNominal', { total: scopedTemps.length })
                : t('kpiTempSignedOut')}
            </p>
          </button>

          <button
            type="button"
            onClick={() => onOpenOperations('sensory')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-5 text-start transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('kpiSensory')}
              </p>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors rtl:rotate-180" />
            </div>
            <p className="text-2xl font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400 mt-1.5">
              {user ? (avgSensory === '—' ? '—' : `${avgSensory} / 5`) : '—'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono tabular-nums">
              {user
                ? t('kpiSensorySub', { count: scopedSensory.length })
                : t('kpiSensorySignedOut')}
            </p>
          </button>
        </div>
      </section>

      {/* Main Interactive Command Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Operations + Inline Quick-Log Workbench */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-amber-800 dark:text-amber-400 shrink-0" />
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {t('shiftOpsHeading')}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setQuickLogMode((m) => (m === 'batch' ? 'none' : 'batch'))
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
                    quickLogMode === 'batch'
                      ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t('quickBtnBatch')}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setQuickLogMode((m) => (m === 'temp' ? 'none' : 'temp'))
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
                    quickLogMode === 'temp'
                      ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Thermometer className="w-3.5 h-3.5" />
                  {t('quickBtnTemp')}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setQuickLogMode((m) => (m === 'sensory' ? 'none' : 'sensory'))
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
                    quickLogMode === 'sensory'
                      ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  {t('quickBtnSensory')}
                </button>
              </div>
            </div>

            {/* Inline Quick Log Forms */}
            {quickLogMode === 'batch' && (
              <form
                onSubmit={handleQuickBatchSubmit}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {t('quickBatchTitle')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuickLogMode('none')}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={t('closeQuickBatch')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t('productFormulaLabel')}
                    </span>
                    <input
                      required
                      maxLength={120}
                      list="dashboard-recipe-options"
                      value={batchProduct}
                      onChange={(e) => setBatchProduct(e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t('batchSizeLabel')}
                    </span>
                    <input
                      required
                      maxLength={40}
                      value={batchSize}
                      onChange={(e) => setBatchSize(e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t('startLabel')}
                      </span>
                      <input
                        required
                        maxLength={10}
                        value={batchTime}
                        onChange={(e) => setBatchTime(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t('operatorLabel')}
                      </span>
                      <input
                        required
                        maxLength={80}
                        value={batchOperator}
                        onChange={(e) => setBatchOperator(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={savingQuickLog}
                    className="px-3.5 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
                  >
                    {savingQuickLog
                      ? t('saving')
                      : user
                        ? t('scheduleBatchBtn')
                        : t('signInAndSchedule')}
                  </button>
                </div>
              </form>
            )}

            {quickLogMode === 'temp' && (
              <form
                onSubmit={handleQuickTempSubmit}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {t('quickTempTitle')}
                  </p>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      liveProbeStatus === 'nominal'
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : liveProbeStatus === 'warning'
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-red-700 dark:text-red-400'
                    }`}
                  >
                    {t('liveStatusLabel')}: {getTempStatusLabel(liveProbeStatus).toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="block">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t('equipmentLabel')}
                    </span>
                    <input
                      required
                      maxLength={80}
                      value={probeEquipment}
                      onChange={(e) => setProbeEquipment(e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t('zoneStandardLabel')}
                    </span>
                    <select
                      value={probeCategory}
                      onChange={(e) => setProbeCategory(e.target.value as TempCategory)}
                      className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm"
                    >
                      <option value="chilled">{t('zoneChilled')}</option>
                      <option value="frozen">{t('zoneFrozen')}</option>
                      <option value="chocolate">{t('zoneChocolate')}</option>
                      <option value="ambient">{t('zoneAmbient')}</option>
                      <option value="proofer">{t('zoneProofer')}</option>
                      <option value="oven">{t('zoneOven')}</option>
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t('tempCLabel')}
                      </span>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={probeTempC}
                        onChange={(e) => setProbeTempC(Number(e.target.value))}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t('initialsLabel')}
                      </span>
                      <input
                        required
                        maxLength={10}
                        value={probeInitials}
                        onChange={(e) => setProbeInitials(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono uppercase"
                      />
                    </label>
                  </div>
                </div>
                {liveProbeStatus !== 'nominal' && (
                  <label className="block">
                    <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
                      {t('correctiveRecommended')}
                    </span>
                    <input
                      maxLength={300}
                      value={probeAction}
                      onChange={(e) => setProbeAction(e.target.value)}
                      placeholder={t('correctivePlaceholder')}
                      className="mt-1 w-full rounded-md border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                    />
                  </label>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickLogMode('none')}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={savingQuickLog}
                    className="px-3.5 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
                  >
                    {savingQuickLog
                      ? t('saving')
                      : user
                        ? t('logTempBtn')
                        : t('signInAndLog')}
                  </button>
                </div>
              </form>
            )}

            {quickLogMode === 'sensory' && (
              <form
                onSubmit={handleQuickSensorySubmit}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {t('quickSensoryTitle')}
                  </p>
                  <span className="text-xs font-mono font-semibold text-amber-800 dark:text-amber-400 tabular-nums">
                    {t('meanLabel')}: {liveSensoryOverall} / 5.0
                  </span>
                </div>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t('bakedProductLabel')}
                  </span>
                  <input
                    required
                    maxLength={120}
                    list="dashboard-recipe-options"
                    value={sensoryProduct}
                    onChange={(e) => setSensoryProduct(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                  />
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(
                    [
                      ['appearance', t('sensoryAppearance')],
                      ['colour', t('sensoryColour')],
                      ['texture', t('sensoryTexture')],
                      ['flavour', t('sensoryFlavour')],
                      ['aroma', t('sensoryAroma')],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={sensoryScores[key]}
                        onChange={(e) =>
                          setSensoryScores((prev) => ({
                            ...prev,
                            [key]: Math.min(5, Math.max(1, Number(e.target.value))),
                          }))
                        }
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2 py-1 text-sm font-mono tabular-nums"
                      />
                    </label>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                  <input
                    maxLength={400}
                    value={sensoryNotes}
                    onChange={(e) => setSensoryNotes(e.target.value)}
                    placeholder={t('sensoryNotesPlaceholder')}
                    className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={savingQuickLog}
                    className="px-3.5 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap"
                  >
                    {savingQuickLog
                      ? t('saving')
                      : user
                        ? t('saveQcScoreBtn')
                        : t('signInAndSave')}
                  </button>
                </div>
              </form>
            )}

            <datalist id="dashboard-recipe-options">
              {STANDARDIZED_RECIPES.map((r) => (
                <option key={r.id} value={getRecipeTitle(r, lang)} />
              ))}
            </datalist>

            {/* Activity Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1 overflow-x-auto">
                {(
                  [
                    { id: 'all', label: t('actAll') },
                    { id: 'batches', label: t('actBatches', { count: scopedProduction.length }) },
                    { id: 'temps', label: t('actTemps', { count: scopedTemps.length }) },
                    { id: 'sensory', label: t('actSensory', { count: scopedSensory.length }) },
                  ] as { id: ActivityFilter; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivityFilter(tab.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      activityFilter === tab.id
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onNavigate('operations')}
                className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
              >
                {t('manageAllLogs')} {arrowChar}
              </button>
            </div>

            {/* Activity Feed Content */}
            {!user ? (
              <div className="py-6 px-4 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-md">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {t('cloudSyncReadyTitle')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  {t('cloudSyncReadyDesc')}
                </p>
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="mt-3 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
                >
                  {t('signInWithGoogle')}
                </button>
              </div>
            ) : scopedProduction.length === 0 &&
              scopedTemps.length === 0 &&
              scopedSensory.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-md">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {t('noLogsTimeframeTitle')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('noLogsTimeframeDesc')}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {(activityFilter === 'all' || activityFilter === 'batches') &&
                  scopedProduction.slice(0, activityFilter === 'batches' ? 8 : 4).map((log) => {
                    const linkedRecipe = findLinkedRecipe(log.product);
                    return (
                      <div
                        key={log.id}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                              {linkedRecipe ? getRecipeTitle(linkedRecipe, lang) : log.product}
                            </p>
                            {linkedRecipe && (
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenRecipe(linkedRecipe.category, linkedRecipe.id)
                                }
                                className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:underline whitespace-nowrap"
                              >
                                {t('formulaRef', { number: linkedRecipe.number })}
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5">
                            {log.date} · {log.startTime}
                            {log.endTime ? `–${log.endTime}` : ''} · {log.batchSize} ·{' '}
                            {log.operator}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {log.status === 'scheduled' && (
                            <button
                              type="button"
                              onClick={() => void handleAdvanceStatus(log, 'in_progress')}
                              className="px-2.5 py-1 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded hover:bg-amber-100 dark:hover:bg-amber-900/60"
                            >
                              {t('statusStart')}
                            </button>
                          )}
                          {log.status !== 'completed' ? (
                            <button
                              type="button"
                              onClick={() => void handleAdvanceStatus(log, 'completed')}
                              className="px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
                            >
                              {t('statusComplete')}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {t('statusDone')}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                {(activityFilter === 'all' || activityFilter === 'temps') &&
                  scopedTemps.slice(0, activityFilter === 'temps' ? 8 : 3).map((tempRow) => (
                    <div
                      key={tempRow.id}
                      className="py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {tempRow.status === 'nominal' ? (
                          <Thermometer className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <AlertTriangle
                            className={`w-4 h-4 shrink-0 ${
                              tempRow.status === 'warning'
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {tempRow.equipment}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums truncate">
                            {tempRow.date} · {tempRow.time} · {getTempZoneLabel(tempRow.category)} ·{' '}
                            {tempRow.initials}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-mono tabular-nums font-semibold shrink-0 ${
                          tempRow.status === 'nominal'
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : tempRow.status === 'warning'
                              ? 'text-amber-700 dark:text-amber-400'
                              : 'text-red-700 dark:text-red-400'
                        }`}
                      >
                        {tempRow.temperatureC.toFixed(1)} {degUnit} ·{' '}
                        {getTempStatusLabel(tempRow.status)}
                      </span>
                    </div>
                  ))}

                {(activityFilter === 'all' || activityFilter === 'sensory') &&
                  scopedSensory.slice(0, activityFilter === 'sensory' ? 8 : 2).map((s) => {
                    const linkedRecipe = findLinkedRecipe(s.recipeTitle);
                    return (
                      <div
                        key={s.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {linkedRecipe ? getRecipeTitle(linkedRecipe, lang) : s.recipeTitle}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums truncate">
                            {s.batchDate} · {s.evaluator}
                            {s.comments ? ` · ${s.comments}` : ''}
                          </p>
                        </div>
                        <span className="text-xs font-mono tabular-nums font-semibold text-amber-800 dark:text-amber-400 shrink-0">
                          {s.overall.toFixed(1)} / 5.0
                        </span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Interactive 8-Category Formula Catalog Explorer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {t('catalogTitle', { count: allFormulasCount })}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('catalogDesc')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenRecipe('All')}
                className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 self-start sm:self-auto whitespace-nowrap"
              >
                {t('exploreAll')} {arrowChar}
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {categoryBreakdown.map((row) => {
                const isExpanded = expandedCategory === row.category;
                return (
                  <div key={row.category} className="py-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCategory(isExpanded ? null : row.category)
                        }
                        className="flex-1 text-start min-w-0 group"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                          <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-800 dark:group-hover:text-amber-400 truncate">
                            {getCategoryLabel(row.category)}
                          </span>
                          <span className="font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400 shrink-0">
                            {row.count} ({row.pct}%)
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-700 dark:bg-amber-500 rounded-full transition-all"
                            style={{ width: `${Math.max(4, row.pct * 2.2)}%` }}
                          />
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenRecipe(row.category)}
                        className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors whitespace-nowrap shrink-0"
                      >
                        {t('filterBench')}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-2.5 ps-2 border-s-2 border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {row.sample.map((sample) => (
                          <button
                            key={sample.id}
                            type="button"
                            onClick={() => onOpenRecipe(sample.category, sample.id)}
                            className="text-start px-3 py-2 rounded border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50/40 dark:hover:bg-amber-950/30 transition-colors"
                          >
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                              #{sample.number} {getRecipeTitle(sample, lang)}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums truncate">
                              {localizeTemp(sample.ovenTemp, lang)} ·{' '}
                              {localizeYield(sample.yieldText, lang)}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Mini Science Workbench + Saved Favorites / Bench Staples */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          {/* Interactive Science & Costing Quick Workbench */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <div className="h-40 sm:h-44 bg-slate-100 dark:bg-slate-800 relative">
              {!benchImgFailed ? (
                <img
                  src="/src/assets/images/pastry_marble_bench_1795100648573.jpg"
                  alt={t('benchImgAlt')}
                  referrerPolicy="no-referrer"
                  onError={() => setBenchImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
                  {t('benchImgFallback')}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-800 dark:text-amber-400 shrink-0" />
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {t('quickScienceTitle')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('calculators')}
                  className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 self-start sm:self-auto whitespace-nowrap"
                >
                  {t('fullSuite')} {arrowChar}
                </button>
              </div>

              {/* Segmented Calculator Switcher */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {(
                  [
                    { id: 'ddt', label: t('calcTabDdt') },
                    { id: 'cost', label: t('calcTabCost') },
                    { id: 'convert', label: t('calcTabConvert') },
                  ] as { id: QuickCalcMode; label: string }[]
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setQuickCalcMode(mode.id)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      quickCalcMode === mode.id
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {quickCalcMode === 'ddt' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('targetDdtLabel')}
                      </span>
                      <input
                        type="number"
                        value={ddtTarget}
                        onChange={(e) => setDdtTarget(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('flourTempShort')}
                      </span>
                      <input
                        type="number"
                        value={ddtFlour}
                        onChange={(e) => setDdtFlour(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('roomTempShort')}
                      </span>
                      <input
                        type="number"
                        value={ddtRoom}
                        onChange={(e) => setDdtRoom(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('frictionShort')}
                      </span>
                      <input
                        type="number"
                        value={ddtFriction}
                        onChange={(e) => setDdtFriction(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md px-3.5 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {t('mixingWaterTarget')}
                    </span>
                    <span className="text-lg font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400">
                      {requiredWaterTemp.toFixed(1)} {degUnit}
                    </span>
                  </div>
                </div>
              )}

              {quickCalcMode === 'cost' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('batchShort')}
                      </span>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={costBatch}
                        onChange={(e) => setCostBatch(Math.max(0, Number(e.target.value)))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('portionsLabel')}
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={costPortions}
                        onChange={(e) => setCostPortions(Math.max(1, Number(e.target.value)))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('targetPctShort')}
                      </span>
                      <input
                        type="number"
                        min="10"
                        max="60"
                        value={costTargetPct}
                        onChange={(e) =>
                          setCostTargetPct(Math.max(10, Math.min(60, Number(e.target.value))))
                        }
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2 py-1.5 text-sm font-mono tabular-nums"
                      />
                    </label>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md px-3.5 py-2.5 grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                        {t('costPerPortionLabel')}
                      </span>
                      <span className="text-base font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                        ${portionCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                        {t('suggestedSellLabel')}
                      </span>
                      <span className="text-base font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400">
                        ${menuPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {quickCalcMode === 'convert' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('ovenTempLabel')}
                      </span>
                      <input
                        type="number"
                        value={convCelsius}
                        onChange={(e) => setConvCelsius(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                      <span className="block mt-1 text-xs font-mono tabular-nums text-amber-800 dark:text-amber-400 font-medium">
                        = {Math.round(convCelsius * 1.8 + 32)} {degFUnit}
                      </span>
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {t('weightGramsLabel')}
                      </span>
                      <input
                        type="number"
                        value={convGrams}
                        onChange={(e) => setConvGrams(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                      />
                      <span className="block mt-1 text-xs font-mono tabular-nums text-amber-800 dark:text-amber-400 font-medium">
                        = {(convGrams * 0.035274).toFixed(2)} {t('unitOz')}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => onNavigate('calculators')}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                {t('openSugarCurvesBtn')}
              </button>
            </div>
          </div>

          {/* Saved Favorites / Core Kitchen Staples Quick Launch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {favoriteRecipes.length > 0 ? (
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-800 dark:text-amber-400 shrink-0" />
                )}
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {favoriteRecipes.length > 0
                    ? t('savedKitchenFavorites', { count: favoriteRecipes.length })
                    : t('coreBenchStaples')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenRecipe('All', undefined, favoriteRecipes.length > 0)
                }
                className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
              >
                {favoriteRecipes.length > 0 ? t('viewSaved') : t('allStaples')} {arrowChar}
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {(favoriteRecipes.length > 0
                ? favoriteRecipes.slice(0, 5)
                : featuredStaples
              ).map((recipe) => {
                const isFav = Boolean(bookmarks[recipe.id]?.isFavorite);
                return (
                  <div
                    key={recipe.id}
                    className="py-2.5 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenRecipe(recipe.category, recipe.id)}
                      className="flex-1 text-start min-w-0 group"
                    >
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 truncate">
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 me-1.5">
                          #{recipe.number}
                        </span>
                        {getRecipeTitle(recipe, lang)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums truncate">
                        {localizeYield(recipe.yieldText, lang)} ·{' '}
                        {localizeTemp(recipe.ovenTemp, lang)}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleToggleFavorite(recipe.id)}
                      className="p-2 text-slate-400 hover:text-amber-500 rounded shrink-0"
                      aria-label={isFav ? t('unfavoriteRecipe') : t('favoriteRecipe')}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'fill-amber-500 text-amber-500' : ''
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        {t('footerCredit')}
      </footer>
    </div>
  );
}
