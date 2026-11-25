import React, { useState } from 'react';
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
import { STANDARDIZED_RECIPES } from '../data/recipes';
import { useAuth } from './AuthContext';

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
  const [activeTab, setActiveTab] = useState<LogTab>(initialTab);

  // Appendix A: Production Form
  const [prodDate, setProdDate] = useState(todayIso());
  const [prodProduct, setProdProduct] = useState('Classic White Sandwich Bread');
  const [prodBatchSize, setProdBatchSize] = useState('10 loaves');
  const [prodStartTime, setProdStartTime] = useState('05:15');
  const [prodOperator, setProdOperator] = useState(profile?.displayName || 'Baker 1');
  const [prodNotes, setProdNotes] = useState('');
  const [submittingProd, setSubmittingProd] = useState(false);

  // Appendix B: Temperature Form
  const [tempDate, setTempDate] = useState(todayIso());
  const [tempTime, setTempTime] = useState('06:30');
  const [tempEquipment, setTempEquipment] = useState('Walk-in Dairy Chiller');
  const [tempCategory, setTempCategory] = useState<TempCategory>('chilled');
  const [tempC, setTempC] = useState(3.4);
  const [tempAction, setTempAction] = useState('');
  const [tempInitials, setTempInitials] = useState('SJ');
  const [submittingTemp, setSubmittingTemp] = useState(false);

  // Appendix D: Sensory Form
  const [sensRecipe, setSensRecipe] = useState(STANDARDIZED_RECIPES[0].title);
  const [sensDate, setSensDate] = useState(todayIso());
  const [sensEvaluator, setSensEvaluator] = useState(profile?.displayName || 'Head Chef');
  const [sensAppearance, setSensAppearance] = useState(5);
  const [sensColour, setSensColour] = useState(5);
  const [sensTexture, setSensTexture] = useState(4);
  const [sensFlavour, setSensFlavour] = useState(5);
  const [sensAroma, setSensAroma] = useState(5);
  const [sensComments, setSensComments] = useState('');
  const [submittingSens, setSubmittingSens] = useState(false);

  if (!user) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-10 text-center max-w-2xl mx-auto">
        <ShieldCheck className="w-10 h-10 text-amber-800 dark:text-amber-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Kitchen Operations &amp; HACCP Compliance Logs
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Sign in with your Google account to create, persist, and audit daily production schedules (Appendix A), equipment temperature logs (Appendix B), and sensory QC scorecards (Appendix D) in your private kitchen workspace.
        </p>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
        >
          Sign In with Google to Unlock Cloud Logs
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
        operator: prodOperator || profile?.displayName || 'Baker',
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
        evaluator: sensEvaluator || profile?.displayName || 'Chef',
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
            Production, HACCP &amp; Quality Control Logs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Cloud-synced kitchen records implementing Appendices A, B, and D from the training manual.
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
            Production ({productionLogs.length})
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
            Temperatures ({temperatureLogs.length})
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
            Sensory QC ({sensoryEvaluations.length})
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
              Schedule Batch Production (Appendix A)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Date</span>
                <input
                  type="date"
                  required
                  value={prodDate}
                  onChange={(e) => setProdDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block lg:col-span-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Product / Formula</span>
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
                    <option key={r.id} value={r.title} />
                  ))}
                </datalist>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Target Batch Size</span>
                <input
                  required
                  maxLength={40}
                  value={prodBatchSize}
                  onChange={(e) => setProdBatchSize(e.target.value)}
                  placeholder="e.g., 24 croissants"
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Start Time</span>
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
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Operator</span>
                <input
                  required
                  maxLength={80}
                  value={prodOperator}
                  onChange={(e) => setProdOperator(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Production Notes</span>
                <input
                  maxLength={500}
                  value={prodNotes}
                  onChange={(e) => setProdNotes(e.target.value)}
                  placeholder="DDT target, steam timing, fold count..."
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <button
                type="submit"
                disabled={submittingProd}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                {submittingProd ? 'Adding Batch...' : 'Add Production Batch'}
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
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">No production batches scheduled</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Log your first daily production batch above to track start times, yields, and operator assignments.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date · Time</th>
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">Batch / Yield</th>
                      <th className="px-4 py-3 font-medium">Operator</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
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
                          <p className="font-medium text-slate-900 dark:text-slate-100">{row.product}</p>
                          {row.notes && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{row.notes}</p>}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                          {row.batchSize}
                          {row.actualYield ? ` → ${row.actualYield}` : ''}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">{row.operator}</td>
                        <td className="px-4 py-3 text-xs font-medium">
                          {row.status === 'completed' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Completed
                            </span>
                          ) : row.status === 'in_progress' ? (
                            <span className="text-amber-800 dark:text-amber-400">In Progress</span>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400">Scheduled</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            {row.status === 'scheduled' && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(row, 'in_progress')}
                                className="px-2.5 py-1 text-xs font-medium text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded hover:bg-amber-100 dark:hover:bg-amber-950"
                              >
                                Start
                              </button>
                            )}
                            {row.status !== 'completed' && (
                              <button
                                type="button"
                                onClick={() => handleAdvanceStatus(row, 'completed')}
                                className="px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded hover:bg-emerald-100 dark:hover:bg-emerald-950"
                              >
                                Complete
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteOwnerDocument('productionLogs', row.id)}
                              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-400"
                              title="Delete batch"
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
              Record Equipment Temperature Check (Appendix B)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Date</span>
                <input
                  type="date"
                  required
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Time</span>
                <input
                  required
                  maxLength={10}
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block lg:col-span-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Equipment / Unit</span>
                <input
                  required
                  maxLength={80}
                  value={tempEquipment}
                  onChange={(e) => setTempEquipment(e.target.value)}
                  placeholder="Walk-in Chiller, Deck Oven 1..."
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2.5 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Zone Standard</span>
                <select
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value as TempCategory)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  <option value="chilled">Chilled (0–5 °C)</option>
                  <option value="frozen">Frozen (≤ −18 °C)</option>
                  <option value="chocolate">Chocolate (15–18 °C)</option>
                  <option value="ambient">Dry Goods (15–20 °C)</option>
                  <option value="proofer">Proofer (24–30 °C)</option>
                  <option value="oven">Oven (140–500 °C)</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Reading (°C)</span>
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
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Corrective Action (if out of range)</span>
                <input
                  maxLength={300}
                  value={tempAction}
                  onChange={(e) => setTempAction(e.target.value)}
                  placeholder="Optional unless Warning / Critical..."
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Initials</span>
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
                {submittingTemp ? 'Logging...' : 'Log Temperature'}
              </button>
            </div>
          </form>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            {temperatureLogs.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">No temperature checks logged</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Record chilled, freezer, chocolate room, or oven probe readings above to verify HACCP thresholds.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date · Time</th>
                      <th className="px-4 py-3 font-medium">Equipment</th>
                      <th className="px-4 py-3 text-right font-medium">Temp (°C)</th>
                      <th className="px-4 py-3 font-medium">Compliance</th>
                      <th className="px-4 py-3 font-medium">Corrective Action</th>
                      <th className="px-4 py-3 text-right font-medium">Initials</th>
                      <th className="px-4 py-3 text-right font-medium">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {temperatureLogs.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {row.date} · {row.time}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900 dark:text-slate-100">{row.equipment}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{row.category}</p>
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                          {row.temperatureC.toFixed(1)} °C
                        </td>
                        <td className="px-4 py-3 text-xs font-medium">
                          {row.status === 'nominal' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Nominal
                            </span>
                          ) : row.status === 'warning' ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Warning
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Critical
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                          {row.correctiveAction || '—'}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs text-slate-700 dark:text-slate-300">
                          {row.initials}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => deleteOwnerDocument('temperatureLogs', row.id)}
                            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-400"
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
              Batch Sensory Evaluation Scorecard (Appendix D — 1 to 5 Scale)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Product / Recipe</span>
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
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Batch Date</span>
                <input
                  type="date"
                  required
                  value={sensDate}
                  onChange={(e) => setSensDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Evaluator</span>
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
                { label: 'Appearance', val: sensAppearance, set: setSensAppearance },
                { label: 'Colour', val: sensColour, set: setSensColour },
                { label: 'Texture', val: sensTexture, set: setSensTexture },
                { label: 'Flavour', val: sensFlavour, set: setSensFlavour },
                { label: 'Aroma', val: sensAroma, set: setSensAroma },
              ].map((attr) => (
                <label key={attr.label} className="block">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{attr.label} (1–5)</span>
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
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Quality Comments</span>
                <input
                  maxLength={600}
                  value={sensComments}
                  onChange={(e) => setSensComments(e.target.value)}
                  placeholder="Crumb structure, crust caramelisation, balance..."
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-1.5 text-sm"
                />
              </label>
              <button
                type="submit"
                disabled={submittingSens}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4" />
                {submittingSens ? 'Saving Score...' : 'Submit Evaluation'}
              </button>
            </div>
          </form>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            {sensoryEvaluations.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">No sensory evaluations recorded</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Score baked batches across appearance, colour, texture, flavour, and aroma above.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Product · Date</th>
                      <th className="px-4 py-3 font-medium">Evaluator</th>
                      <th className="px-4 py-3 text-right font-medium">App</th>
                      <th className="px-4 py-3 text-right font-medium">Col</th>
                      <th className="px-4 py-3 text-right font-medium">Tex</th>
                      <th className="px-4 py-3 text-right font-medium">Flav</th>
                      <th className="px-4 py-3 text-right font-medium">Aro</th>
                      <th className="px-4 py-3 text-right font-medium">Overall</th>
                      <th className="px-4 py-3 text-right font-medium">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {sensoryEvaluations.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900 dark:text-slate-100">{row.recipeTitle}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                            {row.batchDate}
                            {row.comments ? ` · ${row.comments}` : ''}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">{row.evaluator}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">{row.appearance}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">{row.colour}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">{row.texture}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">{row.flavour}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">{row.aroma}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums font-semibold text-amber-800 dark:text-amber-400">
                          {row.overall.toFixed(1)} / 5
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => deleteOwnerDocument('sensoryEvaluations', row.id)}
                            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-400"
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
