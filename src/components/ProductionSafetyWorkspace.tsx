import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Plus,
  ShieldCheck,
  Star,
  Thermometer,
  Trash2,
} from 'lucide-react';
import {
  ProductionLogItem,
  ProductionStatus,
  SensoryEvaluationItem,
  TempCategory,
  TemperatureLogItem,
  createProductionLog,
  createSensoryEvaluation,
  createTemperatureLog,
  deleteOwnerDocument,
  updateProductionLogStatus,
} from '../lib/kitchenRepository';
import { STANDARDIZED_RECIPES, findRecipeByIndexTitle } from '../data/recipes';
import { useAuth } from './AuthContext';
import { useI18n } from '../i18n/I18nContext';
import { RECIPE_TITLES_AR, getRecipeTitle } from '../i18n/recipesAr';
import { RECIPE_TITLES_AM } from '../i18n/recipesAm';

interface ProductionSafetyWorkspaceProps {
  productionLogs: ProductionLogItem[];
  temperatureLogs: TemperatureLogItem[];
  sensoryEvaluations: SensoryEvaluationItem[];
  loadingData: boolean;
  initialTab?: LogTab;
}

type LogTab = 'production' | 'temperature' | 'sensory';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ProductionSafetyWorkspace({
  productionLogs,
  temperatureLogs,
  sensoryEvaluations,
  loadingData,
  initialTab = 'production',
}: ProductionSafetyWorkspaceProps) {
  const { user, profile, signInWithGoogle } = useAuth();
  const { lang, t } = useI18n();
  const [activeTab, setActiveTab] = useState<LogTab>(initialTab);

  // Appendix A: Production Form
  const [prodDate, setProdDate] = useState(todayIso());
  const [prodProduct, setProdProduct] = useState(() => getRecipeTitle(STANDARDIZED_RECIPES[17], lang));
  const [prodBatchSize, setProdBatchSize] = useState(() => t('defaultOpsBatchSize'));
  const [prodStartTime, setProdStartTime] = useState('05:15');
  const [prodOperator, setProdOperator] = useState(
    () => profile?.displayName || t('defaultOpsOperator')
  );
  const [prodNotes, setProdNotes] = useState('');
  const [submittingProd, setSubmittingProd] = useState(false);

  // Appendix B: Temperature Form
  const [tempDate, setTempDate] = useState(todayIso());
  const [tempTime, setTempTime] = useState('06:30');
  const [tempEquipment, setTempEquipment] = useState(() => t('defaultProbeEquipment'));
  const [tempCategory, setTempCategory] = useState<TempCategory>('chilled');
  const [tempC, setTempC] = useState(3.4);
  const [tempAction, setTempAction] = useState('');
  const [tempInitials, setTempInitials] = useState('SJ');
  const [submittingTemp, setSubmittingTemp] = useState(false);

  // Appendix D: Sensory Form
  const [sensRecipe, setSensRecipe] = useState(() => getRecipeTitle(STANDARDIZED_RECIPES[0], lang));
  const [sensDate, setSensDate] = useState(todayIso());
  const [sensEvaluator, setSensEvaluator] = useState(
    () => profile?.displayName || t('defaultOpsEvaluator')
  );
  const [sensAppearance, setSensAppearance] = useState(5);
  const [sensColour, setSensColour] = useState(5);
  const [sensTexture, setSensTexture] = useState(4);
  const [sensFlavour, setSensFlavour] = useState(5);
  const [sensAroma, setSensAroma] = useState(5);
  const [sensComments, setSensComments] = useState('');
  const [submittingSens, setSubmittingSens] = useState(false);

  const prevDefaultsRef = useRef({
    prodProduct: getRecipeTitle(STANDARDIZED_RECIPES[17], lang),
    prodBatchSize: t('defaultOpsBatchSize'),
    prodOperator: t('defaultOpsOperator'),
    tempEquipment: t('defaultProbeEquipment'),
    sensRecipe: getRecipeTitle(STANDARDIZED_RECIPES[0], lang),
    sensEvaluator: t('defaultOpsEvaluator'),
  });

  useEffect(() => {
    const prev = prevDefaultsRef.current;
    const nextDefaults = {
      prodProduct: getRecipeTitle(STANDARDIZED_RECIPES[17], lang),
      prodBatchSize: t('defaultOpsBatchSize'),
      prodOperator: t('defaultOpsOperator'),
      tempEquipment: t('defaultProbeEquipment'),
      sensRecipe: getRecipeTitle(STANDARDIZED_RECIPES[0], lang),
      sensEvaluator: t('defaultOpsEvaluator'),
    };
    setProdProduct((v) => (v === prev.prodProduct ? nextDefaults.prodProduct : v));
    setProdBatchSize((v) => (v === prev.prodBatchSize ? nextDefaults.prodBatchSize : v));
    if (!profile?.displayName) {
      setProdOperator((v) => (v === prev.prodOperator ? nextDefaults.prodOperator : v));
      setSensEvaluator((v) => (v === prev.sensEvaluator ? nextDefaults.sensEvaluator : v));
    }
    setTempEquipment((v) => (v === prev.tempEquipment ? nextDefaults.tempEquipment : v));
    setSensRecipe((v) => (v === prev.sensRecipe ? nextDefaults.sensRecipe : v));
    prevDefaultsRef.current = nextDefaults;
  }, [lang, profile?.displayName, t]);

  const degUnit = lang === 'ar' ? '°م' : '°C';
  const yieldArrow = lang === 'ar' ? '←' : '→';

  const getZoneLabel = (zone: TempCategory) => {
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

  const resolveDisplayRecipeTitle = (stored: string) => {
    const direct = findRecipeByIndexTitle(stored);
    if (direct) return getRecipeTitle(direct, lang);
    const byTranslated = STANDARDIZED_RECIPES.find(
      (r) =>
        RECIPE_TITLES_AR[r.id] === stored.trim() ||
        RECIPE_TITLES_AM[r.id] === stored.trim()
    );
    if (byTranslated) return getRecipeTitle(byTranslated, lang);
    return stored;
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-10 text-center max-w-2xl mx-auto">
        <ShieldCheck className="w-10 h-10 text-amber-800 dark:text-amber-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {t('opsSignedOutTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {t('opsSignedOutDesc')}
        </p>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
        >
          {t('opsSignInUnlock')}
        </button>
      </div>
    );
  }

  const handleAddProduction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingProd(true);
    try {
      await createProductionLog(user.uid, {
        date: prodDate,
        product: prodProduct,
        batchSize: prodBatchSize,
        startTime: prodStartTime,
        endTime: '',
        actualYield: '',
        operator: prodOperator || profile?.displayName || t('roleBaker'),
        status: 'scheduled',
        notes: prodNotes,
      });
      setProdNotes('');
    } finally {
      setSubmittingProd(false);
    }
  };

  const handleAdvanceStatus = async (item: ProductionLogItem, nextStatus: ProductionStatus) => {
    const nowTime = new Date().toTimeString().slice(0, 5);
    await updateProductionLogStatus(
      item.id,
      nextStatus,
      nextStatus === 'completed' && !item.actualYield ? item.batchSize : item.actualYield,
      nextStatus === 'completed' ? nowTime : item.endTime,
      item.notes
    );
  };

  const handleAddTemperature = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingTemp(true);
    try {
      await createTemperatureLog(user.uid, {
        date: tempDate,
        time: tempTime,
        equipment: tempEquipment,
        category: tempCategory,
        temperatureC: tempC,
        correctiveAction: tempAction,
        initials: tempInitials || 'CH',
      });
      setTempAction('');
    } finally {
      setSubmittingTemp(false);
    }
  };

  const handleAddSensory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingSens(true);
    try {
      await createSensoryEvaluation(user.uid, {
        recipeTitle: sensRecipe,
        batchDate: sensDate,
        evaluator: sensEvaluator || profile?.displayName || t('defaultChefShort'),
        appearance: sensAppearance,
        colour: sensColour,
        texture: sensTexture,
        flavour: sensFlavour,
        aroma: sensAroma,
        comments: sensComments,
      });
      setSensComments('');
    } finally {
      setSubmittingSens(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t('opsTitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('opsSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('production')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'production'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            {t('tabProduction', { count: productionLogs.length })}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('temperature')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'temperature'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            {t('tabTemperature', { count: temperatureLogs.length })}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sensory')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'sensory'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            {t('tabSensory', { count: sensoryEvaluations.length })}
          </button>
        </div>
      </div>

      {/* === TAB 1: DAILY PRODUCTION SCHEDULE (APPENDIX A) === */}
      {activeTab === 'production' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddProduction}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-4"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t('appendixAHeading')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('dateLabel')}
                </span>
                <input
                  type="date"
                  required
                  value={prodDate}
                  onChange={(e) => setProdDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block lg:col-span-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('productFormulaLabel')}
                </span>
                <input
                  required
                  maxLength={120}
                  value={prodProduct}
                  onChange={(e) => setProdProduct(e.target.value)}
                  list="manual-recipe-names"
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                />
                <datalist id="manual-recipe-names">
                  {STANDARDIZED_RECIPES.map((r) => (
                    <option key={r.id} value={getRecipeTitle(r, lang)} />
                  ))}
                </datalist>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('targetBatchSizeLabel')}
                </span>
                <input
                  required
                  maxLength={40}
                  value={prodBatchSize}
                  onChange={(e) => setProdBatchSize(e.target.value)}
                  placeholder={t('targetBatchSizePlaceholder')}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('startTimeLabel')}
                </span>
                <input
                  required
                  maxLength={10}
                  value={prodStartTime}
                  onChange={(e) => setProdStartTime(e.target.value)}
                  placeholder="05:15"
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('operatorLabel')}
                </span>
                <input
                  required
                  maxLength={80}
                  value={prodOperator}
                  onChange={(e) => setProdOperator(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('productionNotesLabel')}
                </span>
                <input
                  maxLength={500}
                  value={prodNotes}
                  onChange={(e) => setProdNotes(e.target.value)}
                  placeholder={t('productionNotesPlaceholder')}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <button
                type="submit"
                disabled={submittingProd}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                {submittingProd ? t('addingBatch') : t('addProductionBatch')}
              </button>
            </div>
          </form>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            {loadingData ? (
              <div className="p-6 space-y-3">
                <div className="h-9 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-9 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            ) : productionLogs.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {t('noBatchesScheduled')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('noBatchesDesc')}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">{t('colDateTime')}</th>
                      <th className="px-4 py-3 font-medium">{t('colProduct')}</th>
                      <th className="px-4 py-3 font-medium">{t('colBatchYield')}</th>
                      <th className="px-4 py-3 font-medium">{t('colOperator')}</th>
                      <th className="px-4 py-3 font-medium">{t('colStatus')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colActions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {productionLogs.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {row.date} · {row.startTime}
                          {row.endTime ? `–${row.endTime}` : ''}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {resolveDisplayRecipeTitle(row.product)}
                          </p>
                          {row.notes && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {row.notes}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                          {row.batchSize}
                          {row.actualYield ? ` ${yieldArrow} ${row.actualYield}` : ''}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">
                          {row.operator}
                        </td>
                        <td className="px-4 py-3 text-xs font-medium">
                          {row.status === 'completed' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {t('statusCompleted')}
                            </span>
                          ) : row.status === 'in_progress' ? (
                            <span className="text-amber-800 dark:text-amber-400">
                              {t('statusInProgress')}
                            </span>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400">
                              {t('statusScheduled')}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-end whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            {row.status === 'scheduled' && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(row, 'in_progress')}
                                className="px-2.5 py-1 text-xs font-medium text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded hover:bg-amber-100 dark:hover:bg-amber-950"
                              >
                                {t('statusStart')}
                              </button>
                            )}
                            {row.status !== 'completed' && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(row, 'completed')}
                                className="px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded hover:bg-emerald-100 dark:hover:bg-emerald-950"
                              >
                                {t('statusComplete')}
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteOwnerDocument('productionLogs', row.id)}
                              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-400"
                              title={t('deleteBatchTitle')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === TAB 2: TEMPERATURE MONITORING LOG (APPENDIX B) === */}
      {activeTab === 'temperature' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddTemperature}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-4"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t('appendixBHeading')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('dateLabel')}
                </span>
                <input
                  type="date"
                  required
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('timeLabel')}
                </span>
                <input
                  required
                  maxLength={10}
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block lg:col-span-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('equipmentUnitLabel')}
                </span>
                <input
                  required
                  maxLength={80}
                  value={tempEquipment}
                  onChange={(e) => setTempEquipment(e.target.value)}
                  placeholder={t('equipmentUnitPlaceholder')}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2.5 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('zoneStandardLabel')}
                </span>
                <select
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value as TempCategory)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  <option value="chilled">{t('zoneChilled')}</option>
                  <option value="frozen">{t('zoneFrozen')}</option>
                  <option value="chocolate">{t('zoneChocolate')}</option>
                  <option value="ambient">{t('zoneAmbient')}</option>
                  <option value="proofer">{t('zoneProofer')}</option>
                  <option value="oven">{t('zoneOven')}</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('readingCLabel')}
                </span>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={tempC}
                  onChange={(e) => setTempC(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono tabular-nums"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('correctiveActionLabel')}
                </span>
                <input
                  maxLength={300}
                  value={tempAction}
                  onChange={(e) => setTempAction(e.target.value)}
                  placeholder={t('correctiveActionOptPlaceholder')}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('initialsLabel')}
                </span>
                <input
                  required
                  maxLength={10}
                  value={tempInitials}
                  onChange={(e) => setTempInitials(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono uppercase"
                />
              </label>
              <button
                type="submit"
                disabled={submittingTemp}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                {submittingTemp ? t('loggingTemp') : t('logTempBtn')}
              </button>
            </div>
          </form>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            {temperatureLogs.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {t('noTempLogs')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('noTempLogsDesc')}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">{t('colDateTime')}</th>
                      <th className="px-4 py-3 font-medium">{t('equipmentLabel')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colTempC')}</th>
                      <th className="px-4 py-3 font-medium">{t('colCompliance')}</th>
                      <th className="px-4 py-3 font-medium">{t('colCorrectiveAction')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colInitials')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colRemove')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {temperatureLogs.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {row.date} · {row.time}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {row.equipment}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {getZoneLabel(row.category)}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                          {row.temperatureC.toFixed(1)} {degUnit}
                        </td>
                        <td className="px-4 py-3 text-xs font-medium">
                          {row.status === 'nominal' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {t('statusNominal')}
                            </span>
                          ) : row.status === 'warning' ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              {t('statusWarning')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              {t('statusCritical')}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                          {row.correctiveAction || '—'}
                        </td>
                        <td className="px-4 py-3 text-end font-mono text-xs text-slate-700 dark:text-slate-300">
                          {row.initials}
                        </td>
                        <td className="px-4 py-3 text-end">
                          <button
                            type="button"
                            onClick={() => deleteOwnerDocument('temperatureLogs', row.id)}
                            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-400"
                            aria-label={t('colRemove')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === TAB 3: SENSORY EVALUATION FORM (APPENDIX D) === */}
      {activeTab === 'sensory' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddSensory}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-4"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t('appendixDHeading')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('productRecipeLabel')}
                </span>
                <input
                  required
                  maxLength={120}
                  value={sensRecipe}
                  onChange={(e) => setSensRecipe(e.target.value)}
                  list="manual-recipe-names"
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('batchDateLabel')}
                </span>
                <input
                  type="date"
                  required
                  value={sensDate}
                  onChange={(e) => setSensDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('evaluatorLabel')}
                </span>
                <input
                  required
                  maxLength={80}
                  value={sensEvaluator}
                  onChange={(e) => setSensEvaluator(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { key: 'app', label: t('sensoryAppearance'), val: sensAppearance, set: setSensAppearance },
                { key: 'col', label: t('sensoryColour'), val: sensColour, set: setSensColour },
                { key: 'tex', label: t('sensoryTexture'), val: sensTexture, set: setSensTexture },
                { key: 'flav', label: t('sensoryFlavour'), val: sensFlavour, set: setSensFlavour },
                { key: 'aro', label: t('sensoryAroma'), val: sensAroma, set: setSensAroma },
              ].map((attr) => (
                <label key={attr.key} className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {attr.label} {t('scaleHint')}
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
                    required
                    value={attr.val}
                    onChange={(e) => attr.set(Math.min(5, Math.max(1, Number(e.target.value))))}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono tabular-nums"
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
              <label className="block flex-1">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t('qualityCommentsLabel')}
                </span>
                <input
                  maxLength={600}
                  value={sensComments}
                  onChange={(e) => setSensComments(e.target.value)}
                  placeholder={t('qualityCommentsPlaceholder')}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <button
                type="submit"
                disabled={submittingSens}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4" />
                {submittingSens ? t('savingScore') : t('submitEvaluation')}
              </button>
            </div>
          </form>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            {sensoryEvaluations.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {t('noSensoryLogs')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('noSensoryLogsDesc')}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">{t('colProductDate')}</th>
                      <th className="px-4 py-3 font-medium">{t('colEvaluator')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colApp')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colCol')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colTex')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colFlav')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colAro')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colOverall')}</th>
                      <th className="px-4 py-3 text-end font-medium">{t('colRemove')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {sensoryEvaluations.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {resolveDisplayRecipeTitle(row.recipeTitle)}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                            {row.batchDate}
                            {row.comments ? ` · ${row.comments}` : ''}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">
                          {row.evaluator}
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
                          {row.appearance}
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
                          {row.colour}
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
                          {row.texture}
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
                          {row.flavour}
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
                          {row.aroma}
                        </td>
                        <td className="px-4 py-3 text-end font-mono tabular-nums font-semibold text-amber-800 dark:text-amber-400">
                          {row.overall.toFixed(1)} / 5
                        </td>
                        <td className="px-4 py-3 text-end">
                          <button
                            type="button"
                            onClick={() => deleteOwnerDocument('sensoryEvaluations', row.id)}
                            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-400"
                            aria-label={t('colRemove')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
