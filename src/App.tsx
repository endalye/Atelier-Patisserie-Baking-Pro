import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calculator,
  ChefHat,
  ClipboardList,
  Globe,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Printer,
  Settings,
  Sun,
  X,
} from 'lucide-react';
import { AuthProvider, ChefRole, useAuth } from './components/AuthContext';
import { CalculatorsView } from './components/CalculatorsView';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  OperationsTab,
  OverviewDashboard,
  WorkspaceSection,
} from './components/OverviewDashboard';
import { ProductionSafetyWorkspace } from './components/ProductionSafetyWorkspace';
import { RecipesExplorer } from './components/RecipesExplorer';
import { TrainingManualView } from './components/TrainingManualView';
import { RecipeCategory } from './data/recipes';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { AppLanguage, TranslationKey } from './i18n/translations';
import {
  CustomRecipeItem,
  ProductionLogItem,
  RecipeBookmarkItem,
  SensoryEvaluationItem,
  TemperatureLogItem,
  subscribeBookmarks,
  subscribeOwnerCollection,
} from './lib/kitchenRepository';

const NAV_ITEMS: { id: WorkspaceSection; labelKey: TranslationKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', labelKey: 'navDashboard', icon: LayoutDashboard },
  { id: 'recipes', labelKey: 'navRecipes', icon: ChefHat },
  { id: 'manual', labelKey: 'navManual', icon: BookOpen },
  { id: 'operations', labelKey: 'navOperations', icon: ClipboardList },
  { id: 'calculators', labelKey: 'navCalculators', icon: Calculator },
];

function WorkspaceShell() {
  const { user, profile, loading, authError, signInWithGoogle, signOut, updateProfileSettings } =
    useAuth();
  const { lang, setLang, t } = useI18n();

  const [section, setSection] = useState<WorkspaceSection>('overview');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<RecipeCategory | 'All'>('All');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | undefined>(undefined);
  const [recipeFavoritesOnly, setRecipeFavoritesOnly] = useState(false);
  const [operationsTab, setOperationsTab] = useState<OperationsTab>('production');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('atelier-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('atelier-theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [darkMode]);

  // Cloud Firestore State
  const [productionLogs, setProductionLogs] = useState<ProductionLogItem[]>([]);
  const [temperatureLogs, setTemperatureLogs] = useState<TemperatureLogItem[]>([]);
  const [sensoryEvaluations, setSensoryEvaluations] = useState<SensoryEvaluationItem[]>([]);
  const [customRecipes, setCustomRecipes] = useState<CustomRecipeItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Record<string, RecipeBookmarkItem>>({});
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Settings Modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [displayNameDraft, setDisplayNameDraft] = useState('');
  const [kitchenNameDraft, setKitchenNameDraft] = useState('');
  const [roleDraft, setRoleDraft] = useState<ChefRole>('pastry_chef');
  const [foodCostDraft, setFoodCostDraft] = useState(30);
  const [langDraft, setLangDraft] = useState<AppLanguage>(lang);
  const [savingSettings, setSavingSettings] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    if (!user) {
      setProductionLogs([]);
      setTemperatureLogs([]);
      setSensoryEvaluations([]);
      setCustomRecipes([]);
      setBookmarks({});
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    setDataError(null);

    const handleSubError = (err: Error) => {
      setDataError(err.message);
      setLoadingData(false);
    };

    const unsubProd = subscribeOwnerCollection<ProductionLogItem>(
      'productionLogs',
      user.uid,
      (rows) => {
        setProductionLogs(rows.sort((a, b) => b.date.localeCompare(a.date)));
        setLoadingData(false);
      },
      handleSubError
    );

    const unsubTemp = subscribeOwnerCollection<TemperatureLogItem>(
      'temperatureLogs',
      user.uid,
      (rows) => setTemperatureLogs(rows.sort((a, b) => b.date.localeCompare(a.date))),
      handleSubError
    );

    const unsubSens = subscribeOwnerCollection<SensoryEvaluationItem>(
      'sensoryEvaluations',
      user.uid,
      (rows) => setSensoryEvaluations(rows.sort((a, b) => b.batchDate.localeCompare(a.batchDate))),
      handleSubError
    );

    const unsubCustom = subscribeOwnerCollection<CustomRecipeItem>(
      'customRecipes',
      user.uid,
      setCustomRecipes,
      handleSubError
    );

    const unsubBookmarks = subscribeBookmarks(user.uid, setBookmarks, handleSubError);

    return () => {
      unsubProd();
      unsubTemp();
      unsubSens();
      unsubCustom();
      unsubBookmarks();
    };
  }, [user]);

  const openSettingsModal = () => {
    setDisplayNameDraft(profile?.displayName || user?.displayName || t('defaultChefName'));
    setKitchenNameDraft(profile?.kitchenName || t('defaultKitchenName'));
    setRoleDraft(profile?.role || 'pastry_chef');
    setFoodCostDraft(profile?.targetFoodCostPct ?? 30);
    setLangDraft(lang);
    setSettingsOpen(true);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      setLang(langDraft, user?.uid);
      await updateProfileSettings({
        displayName: displayNameDraft,
        kitchenName: kitchenNameDraft,
        role: roleDraft,
        targetFoodCostPct: foodCostDraft,
      });
      setSettingsOpen(false);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleOpenRecipe = (
    category: RecipeCategory | 'All' = 'All',
    recipeId?: string,
    favoritesOnly = false
  ) => {
    setRecipeCategoryFilter(category);
    setSelectedRecipeId(recipeId);
    setRecipeFavoritesOnly(favoritesOnly);
    setSection('recipes');
  };

  const handleOpenOperations = (tab: OperationsTab) => {
    setOperationsTab(tab);
    setSection('operations');
  };

  const activeNav = NAV_ITEMS.find((item) => item.id === section);
  const breadcrumbLabel = activeNav ? t(activeNav.labelKey) : t('navDashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex overflow-x-hidden transition-colors">
      {/* Desktop Sidebar */}
      <aside className="no-print hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:start-0 bg-white dark:bg-slate-900 border-e border-slate-200 dark:border-slate-800">
        <div className="h-16 px-5 flex items-center border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSection('overview')}
            className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 text-start"
          >
            {t('appBrand')}
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSection(item.id);
                  if (item.id === 'recipes') {
                    setRecipeCategoryFilter('All');
                    setRecipeFavoritesOnly(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-start ${
                  active
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </nav>

        {/* User Account Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          {loading ? (
            <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
          ) : user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {!avatarFailed ? (
                  <img
                    src={user.photoURL || '/src/assets/images/head_chef_avatar_1795100650347.jpg'}
                    alt={profile?.displayName || t('chefAvatarAlt')}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarFailed(true)}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-200 shrink-0">
                    {(profile?.displayName || 'C').slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {profile?.displayName || user.displayName || t('defaultChefShort')}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {profile?.kitchenName || user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openSettingsModal}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 shrink-0" />
                  {t('kitchenButton')}
                </button>
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title={t('signOutTitle')}
                  aria-label={t('signOutTitle')}
                >
                  <LogOut className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
            >
              <LogIn className="w-4 h-4 shrink-0 rtl:rotate-180" />
              {t('signInWithGoogle')}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ps-64 flex flex-col min-w-0">
        {/* Top Bar Contract */}
        <header className="no-print sticky top-0 z-30 h-14 sm:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3.5 sm:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden min-w-[40px] min-h-[40px] inline-flex items-center justify-center -ms-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md"
              aria-label={t('openNavMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
              <span className="font-medium text-slate-900 dark:text-slate-100 hidden sm:inline">
                {profile?.kitchenName || t('defaultKitchenBreadcrumb')}
              </span>
              <span className="mx-2 text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
              <span className="font-medium sm:font-normal text-slate-900 dark:text-slate-200 sm:text-slate-600 dark:sm:text-slate-300">
                {breadcrumbLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSection('manual');
                setTimeout(() => window.print(), 120);
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              {t('printPdf')}
            </button>

            {user ? (
              <button
                type="button"
                onClick={openSettingsModal}
                className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('kitchenButton')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0"
              >
                {t('signIn')}
              </button>
            )}

            {/* Language Selector */}
            <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md min-h-[36px] shrink-0">
              <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as AppLanguage, user?.uid)}
                aria-label={t('switchLanguageLabel')}
                className="bg-transparent text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  English
                </option>
                <option value="ar" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  العربية
                </option>
                <option value="am" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  አማርኛ
                </option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-pressed={darkMode}
              aria-label={darkMode ? t('switchToLight') : t('switchToDark')}
              title={darkMode ? t('switchToLight') : t('switchToDark')}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-slate-700 dark:text-amber-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 min-h-[36px]"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('lightMode')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('darkMode')}</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Auth or Firestore Error Banner (Isolated UX) */}
        {(authError || dataError) && (
          <div className="no-print mx-3.5 sm:mx-8 mt-4 p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 rounded-md text-xs text-red-800 dark:text-red-300">
            {authError || dataError}
          </div>
        )}

        {/* Viewport Container */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0">
          {section === 'overview' && (
            <OverviewDashboard
              onNavigate={setSection}
              onOpenRecipe={handleOpenRecipe}
              onOpenOperations={handleOpenOperations}
              productionLogs={productionLogs}
              temperatureLogs={temperatureLogs}
              sensoryEvaluations={sensoryEvaluations}
              customRecipes={customRecipes}
              bookmarks={bookmarks}
            />
          )}

          {section === 'recipes' && (
            <RecipesExplorer
              key={`${recipeCategoryFilter}-${selectedRecipeId || 'default'}-${recipeFavoritesOnly ? 'fav' : 'all'}`}
              bookmarks={bookmarks}
              customRecipes={customRecipes}
              initialCategory={recipeCategoryFilter}
              initialRecipeId={selectedRecipeId}
              initialFavoritesOnly={recipeFavoritesOnly}
            />
          )}

          {section === 'manual' && (
            <TrainingManualView
              onJumpToRecipes={(cat, recipeId) => {
                handleOpenRecipe((cat as RecipeCategory) || 'All', recipeId, false);
              }}
            />
          )}

          {section === 'operations' && (
            <ProductionSafetyWorkspace
              key={operationsTab}
              initialTab={operationsTab}
              productionLogs={productionLogs}
              temperatureLogs={temperatureLogs}
              sensoryEvaluations={sensoryEvaluations}
              loadingData={loadingData}
            />
          )}

          {section === 'calculators' && <CalculatorsView />}
        </main>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="no-print fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 h-full border-e border-slate-200 dark:border-slate-800 flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-base font-bold text-slate-900 dark:text-slate-100">{t('appBrand')}</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-start ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {t('switchLanguageLabel')}
                </span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as AppLanguage, user?.uid)}
                  className="px-2 py-1 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                  <option value="am">አማርኛ</option>
                </select>
              </div>
              {user ? (
                <div className="space-y-2.5">
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                    {profile?.displayName || user.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openSettingsModal();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      {t('kitchenButton')}
                    </button>
                    <button
                      type="button"
                      onClick={signOut}
                      className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded"
                    >
                      {t('signOut')}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    void signInWithGoogle();
                  }}
                  className="w-full py-2.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md"
                >
                  {t('signInWithGoogle')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Kitchen Settings Modal */}
      {settingsOpen && (
        <div className="no-print fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t('settingsTitle')}
              </h3>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('operatorNameLabel')}</span>
                <input
                  required
                  maxLength={100}
                  value={displayNameDraft}
                  onChange={(e) => setDisplayNameDraft(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('kitchenNameLabel')}</span>
                <input
                  required
                  maxLength={120}
                  value={kitchenNameDraft}
                  onChange={(e) => setKitchenNameDraft(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('roleLabel')}</span>
                  <select
                    value={roleDraft}
                    onChange={(e) => setRoleDraft(e.target.value as ChefRole)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  >
                    <option value="pastry_chef">{t('rolePastryChef')}</option>
                    <option value="baker">{t('roleBaker')}</option>
                    <option value="instructor">{t('roleInstructor')}</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('targetFoodCostLabel')}</span>
                  <input
                    type="number"
                    min="10"
                    max="60"
                    required
                    value={foodCostDraft}
                    onChange={(e) => setFoodCostDraft(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm font-mono tabular-nums"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('languagePreferenceLabel')}</span>
                <select
                  value={langDraft}
                  onChange={(e) => setLangDraft(e.target.value as AppLanguage)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                  <option value="am">አማርኛ</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white"
                >
                  {savingSettings ? t('saving') : t('saveSettings')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ErrorBoundary>
        <AuthProvider>
          <WorkspaceShell />
        </AuthProvider>
      </ErrorBoundary>
    </I18nProvider>
  );
}
