import { useState } from 'react';
import { Calculator, Flame, Scale, Thermometer } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { CHOCOLATE_CURVES_LOCALIZED, SUGAR_STAGES_LOCALIZED } from '../i18n/translations';

export function CalculatorsView() {
  const { lang, t } = useI18n();

  // Desired Dough Temperature (3-Factor Formula)
  const [targetDDT, setTargetDDT] = useState(25);
  const [flourTemp, setFlourTemp] = useState(20);
  const [roomTemp, setRoomTemp] = useState(22);
  const [frictionFactor, setFrictionFactor] = useState(6);

  const requiredWaterTemp = targetDDT * 3 - (flourTemp + roomTemp + frictionFactor);

  // Metric Conversion Calculator
  const [gramsInput, setGramsInput] = useState(500);
  const [mlInput, setMlInput] = useState(250);
  const [celsiusInput, setCelsiusInput] = useState(180);

  // Food Cost Pricing Calculator
  const [batchCost, setBatchCost] = useState(2.7);
  const [yieldPortions, setYieldPortions] = useState(8);
  const [targetFoodCostPct, setTargetFoodCostPct] = useState(30);

  const costPerPortion = yieldPortions > 0 ? batchCost / yieldPortions : 0;
  const suggestedPrice =
    targetFoodCostPct > 0 ? costPerPortion / (targetFoodCostPct / 100) : 0;

  const sugarStages = SUGAR_STAGES_LOCALIZED[lang];
  const chocolateCurves = CHOCOLATE_CURVES_LOCALIZED[lang];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {t('calcHeaderTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('calcHeaderDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DDT Calculator */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <Thermometer className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {t('ddtCalcTitle')}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">
            {t('ddtCalcFormula')}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('targetDdtLabel')}</span>
              <input
                type="number"
                value={targetDDT}
                onChange={(e) => setTargetDDT(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('flourTempLabel')}</span>
              <input
                type="number"
                value={flourTemp}
                onChange={(e) => setFlourTemp(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('roomTempLabel')}</span>
              <input
                type="number"
                value={roomTemp}
                onChange={(e) => setRoomTemp(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('frictionFactorLabel')}</span>
              <input
                type="number"
                value={frictionFactor}
                onChange={(e) => setFrictionFactor(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('requiredWaterTempLabel')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {requiredWaterTemp < 4
                  ? t('ddtAdvisoryIce')
                  : requiredWaterTemp > 38
                    ? t('ddtAdvisoryWarm')
                    : t('ddtAdvisoryStandard')}
              </p>
            </div>
            <span dir="ltr" className="text-2xl font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400">
              {requiredWaterTemp.toFixed(1)} {lang === 'ar' ? '°م' : '°C'}
            </span>
          </div>
        </section>

        {/* Commercial Costing Calculator */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <Calculator className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {t('costingEngineTitle')}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">
            {t('costingEngineFormula')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('batchCostDollarLabel')}</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={batchCost}
                onChange={(e) => setBatchCost(Math.max(0, Number(e.target.value)))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('yieldPortionsLabel')}</span>
              <input
                type="number"
                min="1"
                value={yieldPortions}
                onChange={(e) => setYieldPortions(Math.max(1, Number(e.target.value)))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('targetCostPctLabel')}</span>
              <input
                type="number"
                min="10"
                max="60"
                value={targetFoodCostPct}
                onChange={(e) => setTargetFoodCostPct(Math.max(10, Math.min(60, Number(e.target.value))))}
                className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('costPerPortionLabel')}</p>
              <p dir="ltr" className="text-lg font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1 text-start">
                ${costPerPortion.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('suggestedPriceLabel')}</p>
              <p dir="ltr" className="text-lg font-semibold font-mono tabular-nums text-amber-800 dark:text-amber-400 mt-1 text-start">
                ${suggestedPrice.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('grossMarginLabel')}</p>
              <p dir="ltr" className="text-lg font-semibold font-mono tabular-nums text-emerald-700 dark:text-emerald-400 mt-1 text-start">
                ${(suggestedPrice - costPerPortion).toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Metric Conversion Strip */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <Scale className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t('metricConverterTitle')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('weightGramsImperialLabel')}
            </label>
            <input
              type="number"
              value={gramsInput}
              onChange={(e) => setGramsInput(Number(e.target.value))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono tabular-nums"
            />
            <p className="mt-2 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-300">
              {(gramsInput * 0.035274).toFixed(2)} {t('unitOz')} · {((gramsInput / 1000) * 2.20462).toFixed(2)} {t('unitLb')}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('volumeMlImperialLabel')}
            </label>
            <input
              type="number"
              value={mlInput}
              onChange={(e) => setMlInput(Number(e.target.value))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono tabular-nums"
            />
            <p className="mt-2 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-300">
              {(mlInput * 0.033814).toFixed(2)} {t('unitFlOz')} · {((mlInput / 1000) * 1.75975).toFixed(2)} {t('unitUkPt')}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('ovenTempCFLabel')}
            </label>
            <input
              type="number"
              value={celsiusInput}
              onChange={(e) => setCelsiusInput(Number(e.target.value))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-1.5 text-sm font-mono tabular-nums"
            />
            <p className="mt-2 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-300">
              {Math.round(celsiusInput * 1.8 + 32)} {lang === 'ar' ? '°ف' : '°F'}
            </p>
          </div>
        </div>
      </section>

      {/* Reference Tables: Sugar & Chocolate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('sugarStagesTitle')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colStage')}</th>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colTempRange')}</th>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colApplications')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {sugarStages.map((row) => (
                  <tr key={row.stage} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">{row.stage}</td>
                    <td className="px-4 py-2.5 font-mono tabular-nums text-amber-800 dark:text-amber-400">{row.temp}</td>
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400 text-xs">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('chocolateCurvesTitle')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colType')}</th>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colMelt')}</th>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colCool')}</th>
                  <th className="px-4 py-2.5 font-medium text-start">{t('colWork')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {chocolateCurves.map((row) => (
                  <tr key={row.type} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100 text-xs">{row.type}</td>
                    <td className="px-4 py-2.5 font-mono tabular-nums text-slate-700 dark:text-slate-300 text-xs">{row.melt}</td>
                    <td className="px-4 py-2.5 font-mono tabular-nums text-slate-700 dark:text-slate-300 text-xs">{row.cool}</td>
                    <td className="px-4 py-2.5 font-mono tabular-nums text-amber-800 dark:text-amber-400 text-xs font-medium">{row.work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
