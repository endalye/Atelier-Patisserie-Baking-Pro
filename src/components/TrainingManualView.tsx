import { useState } from 'react';
import { BookOpen, Printer } from 'lucide-react';
import { MANUAL_PARTS, ManualPart, TOC_ENTRIES } from '../data/manualParts';
import {
  RECIPE_CATEGORIES,
  STANDARDIZED_RECIPES,
  findRecipeByIndexTitle,
} from '../data/recipes';
import { useI18n } from '../i18n/I18nContext';
import { RECIPE_CATEGORY_AM, RECIPE_CATEGORY_AR } from '../i18n/translations';
import { getLocalizedManualPart, getLocalizedTocEntry } from '../i18n/manualAr';
import {
  getRecipeTitle,
  getRecipeTitleByIndexText,
  localizeClassification,
  localizeIngredientName,
  localizeStorage,
  localizeTemp,
  localizeTime,
  localizeYield,
} from '../i18n/recipesAr';
import { localizeRecipeDetail } from '../i18n/coreRecipesAr';

interface TrainingManualViewProps {
  onJumpToRecipes?: (category?: string, recipeId?: string) => void;
}

export function TrainingManualView({ onJumpToRecipes }: TrainingManualViewProps) {
  const [activePartId, setActivePartId] = useState<string>('all');
  const { lang, isRtl, t } = useI18n();

  const localizedParts = MANUAL_PARTS.map((p) => getLocalizedManualPart(p, lang));
  const localizedToc = TOC_ENTRIES.map((e) => getLocalizedTocEntry(e, lang));

  const visibleParts =
    activePartId === 'all'
      ? localizedParts
      : localizedParts.filter((p) => p.id === activePartId);

  const handleTocClick = (id: string) => {
    setActivePartId(id);
  };

  const arrowChar = isRtl ? '←' : '→';
  const getCategoryLabel = (cat: string) =>
    lang === 'ar'
      ? RECIPE_CATEGORY_AR[cat] || cat
      : lang === 'am'
        ? RECIPE_CATEGORY_AM[cat] || cat
        : cat;

  return (
    <div className="space-y-6">
      {/* Screen Toolbar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t('manualTitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('manualSubtitle')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0"
        >
          <Printer className="w-4 h-4" />
          {t('manualPrintBtn')}
        </button>
      </div>

      {/* Chapter Filter Bar */}
      <div className="no-print flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActivePartId('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activePartId === 'all'
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {t('manualCompleteEdition')}
        </button>
        {localizedParts.map((part) => (
          <button
            key={part.id}
            type="button"
            onClick={() => setActivePartId(part.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activePartId === part.id
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {part.label}
          </button>
        ))}
      </div>

      {/* Editorial Document Sheet */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg max-w-4xl mx-auto overflow-hidden print:bg-white print:border-slate-200 print:text-slate-900">
        {/* Cover Page (Shown when viewing All) */}
        {activePartId === 'all' && (
          <div className="px-4 sm:px-10 lg:px-14 py-12 sm:py-16 text-center bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 print:bg-slate-50 print:border-slate-200 print-break-after">
            <BookOpen className="w-10 h-10 text-amber-800 dark:text-amber-400 mx-auto mb-5 print:text-amber-800" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 print:text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
              {t('manualTitle')}
            </h1>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-400 print:text-amber-800 mt-3 tracking-wide">
              {t('coverEditionSubtitle')}
            </p>
            <div className="w-16 h-0.5 bg-amber-700 dark:bg-amber-500 mx-auto my-6" />
            <div className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600 leading-loose max-w-md mx-auto font-mono">
              <p>{t('coverMeasurement')}</p>
              <p>{t('coverTemperature')}</p>
              <p>{t('coverCurrency')}</p>
              <p>{t('coverScope', { count: STANDARDIZED_RECIPES.length })}</p>
            </div>
          </div>
        )}

        {/* Interactive Table of Contents */}
        {activePartId === 'all' && (
          <div className="px-4 sm:px-10 lg:px-14 py-8 sm:py-12 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 print-break-after">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 pb-3 border-b-2 border-amber-700 dark:border-amber-500 mb-6">
              {t('tocTitle')}
            </h2>
            <div className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-start text-sm">
                <thead className="bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 print:bg-slate-900 print:text-white text-xs">
                  <tr>
                    <th className="px-4 py-2.5 font-medium w-28">{t('tocColChapter')}</th>
                    <th className="px-4 py-2.5 font-medium">{t('tocColSubject')}</th>
                    <th className="px-4 py-2.5 font-medium text-end w-20">{t('tocColPage')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-200">
                  {localizedToc.map((entry, idx) => (
                    <tr
                      key={`${entry.id}-${idx}`}
                      onClick={() => handleTocClick(entry.id)}
                      className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-2.5 font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 text-xs sm:text-sm">
                        {entry.chapter}
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300 print:text-slate-700 text-xs sm:text-sm">
                        {entry.subject}
                      </td>
                      <td className="px-4 py-2.5 text-end font-mono tabular-nums text-amber-800 dark:text-amber-400 print:text-amber-800 text-xs">
                        {entry.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manual Chapters & Front Matter */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-200">
          {visibleParts.map((part) => (
            <ManualPartArticle
              key={part.id}
              part={part}
              onJumpToRecipes={onJumpToRecipes}
            />
          ))}
        </div>

        {/* Interactive Bench Formulas Appendix */}
        {activePartId === 'all' && (
          <div
            id="master-recipe-index"
            className="px-4 sm:px-10 lg:px-14 py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800 print:border-slate-200 print-break-before"
          >
            <p className="text-xs font-medium text-amber-800 dark:text-amber-400 print:text-amber-800">
              {t('appendixSummaryEyebrow')}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-1 pb-3 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 mb-6">
              {t('appendixSummaryTitle', { count: STANDARDIZED_RECIPES.length })}
            </h2>
            <div className="space-y-8">
              {RECIPE_CATEGORIES.map((category) => {
                const catRecipes = STANDARDIZED_RECIPES.filter((r) => r.category === category);
                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 print:border-slate-200 pb-1.5">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">
                        {getCategoryLabel(category)}
                      </h3>
                      {onJumpToRecipes && (
                        <button
                          type="button"
                          onClick={() => onJumpToRecipes(category)}
                          className="no-print text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300"
                        >
                          {t('openInRecipeBench')} {arrowChar}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {catRecipes.map((recipe) => {
                        const detail = localizeRecipeDetail(recipe, lang);
                        const recipeTitle = getRecipeTitle(recipe, lang);
                        return (
                          <div
                            key={recipe.id}
                            className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-md p-4 print-avoid-break"
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">
                                {recipe.number}. {recipeTitle}
                              </h4>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 print:text-slate-500">
                                  {localizeYield(recipe.yieldText, lang)} ·{' '}
                                  {localizeTemp(recipe.ovenTemp, lang)}
                                </span>
                                {onJumpToRecipes && (
                                  <button
                                    type="button"
                                    onClick={() => onJumpToRecipes(recipe.category, recipe.id)}
                                    className="no-print text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
                                  >
                                    {t('openInRecipeBench')} {arrowChar}
                                  </button>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600 mb-2">
                              <strong className="text-slate-800 dark:text-slate-200 print:text-slate-900">
                                {t('manualIngredientsLabel')}
                              </strong>{' '}
                              {recipe.ingredients
                                .map(
                                  (i) =>
                                    `${localizeIngredientName(i.name, lang)} (${localizeYield(i.rawQuantity, lang)})`
                                )
                                .join(lang === 'ar' ? '، ' : lang === 'am' ? '፣ ' : ', ')}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600">
                              <strong className="text-slate-800 dark:text-slate-200 print:text-slate-900">
                                {t('manualQualityStandardLabel')}
                              </strong>{' '}
                              {detail.qualityStandard || recipe.qualityStandard}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 print:border-slate-200 text-center">
              <p className="text-xs italic text-slate-500 dark:text-slate-400 print:text-slate-500">
                {t('endOfBook')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ManualPartArticle({
  part,
  onJumpToRecipes,
}: {
  part: ManualPart;
  onJumpToRecipes?: (category?: string, recipeId?: string) => void;
}) {
  const { lang, isRtl, t } = useI18n();
  const arrowChar = isRtl ? '←' : '→';

  return (
    <article className="px-4 sm:px-10 lg:px-14 py-8 sm:py-10 space-y-5 print-break-before">
      <div>
        <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-400 print:text-amber-800 font-medium">
          <span>{part.label}</span>
          <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400 print:text-slate-500">
            {t('manualPageNumber', { page: part.pageNumber })}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-1 pb-3 border-b border-slate-200 dark:border-slate-800 print:border-slate-200">
          {part.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 print:text-slate-600 mt-2">
          {part.summary}
        </p>
      </div>

      <div className="space-y-4">
        {part.blocks.map((block, idx) => {
          if (block.type === 'subheading') {
            return (
              <h3
                key={idx}
                className="text-lg font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 pt-3"
              >
                {block.text}
              </h3>
            );
          }
          if (block.type === 'h4') {
            return (
              <h4
                key={idx}
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 print:text-slate-800 pt-2"
              >
                {block.text}
              </h4>
            );
          }
          if (block.type === 'paragraph') {
            if (part.id === 'master-index' && block.text?.includes('·') && onJumpToRecipes) {
              const titles = block.text
                .split('·')
                .map((s) => s.trim())
                .filter(Boolean);
              return (
                <p
                  key={idx}
                  className="text-sm text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed max-w-prose"
                >
                  {titles.map((enTitle, tIdx) => {
                    const matched = findRecipeByIndexTitle(enTitle);
                    const displayTitle = getRecipeTitleByIndexText(enTitle, matched, lang);
                    return (
                      <span key={`${enTitle}-${tIdx}`}>
                        {tIdx > 0 && (
                          <span className="text-slate-400 dark:text-slate-500 mx-1.5">·</span>
                        )}
                        {matched ? (
                          <button
                            type="button"
                            onClick={() => onJumpToRecipes(matched.category, matched.id)}
                            className="text-start text-slate-800 dark:text-slate-200 print:text-slate-800 hover:text-amber-800 dark:hover:text-amber-400 hover:underline underline-offset-2 transition-colors"
                            title={t('openSpecificRecipeTitle', {
                              number: matched.number,
                              title: displayTitle,
                            })}
                          >
                            {displayTitle}
                          </button>
                        ) : (
                          <span>{displayTitle}</span>
                        )}
                      </span>
                    );
                  })}
                </p>
              );
            }
            return (
              <p
                key={idx}
                className="text-sm text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed max-w-prose"
              >
                {block.text}
              </p>
            );
          }
          if (block.type === 'callout') {
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-200 dark:border-slate-700 print:border-slate-200 rounded-md p-4 text-sm text-slate-800 dark:text-slate-200 print:text-slate-800 italic print-avoid-break"
              >
                {block.text}
              </div>
            );
          }
          if (block.type === 'code') {
            return (
              <div
                key={idx}
                className="bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-800 text-slate-100 rounded-md px-4 py-3 font-mono text-xs overflow-x-auto print-avoid-break"
              >
                <code>{block.text}</code>
              </div>
            );
          }
          if (block.type === 'workflow' && block.items) {
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 print:border-slate-200 bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 rounded-md p-4 space-y-2.5 print-avoid-break"
              >
                {block.caption && (
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">
                    {block.caption}
                  </p>
                )}
                <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed">
                  {block.items.join(isRtl ? ' ← ' : ' -> ')}
                </pre>
              </div>
            );
          }
          if (block.type === 'recipe' && block.recipeId) {
            const recipe = STANDARDIZED_RECIPES.find((r) => r.id === block.recipeId);
            if (!recipe) return null;
            const detail = localizeRecipeDetail(recipe, lang);
            const title = getRecipeTitle(recipe, lang);
            const steps = detail.steps ?? recipe.steps;
            const equipment = detail.equipment ?? recipe.equipment;
            const qualityStandard = detail.qualityStandard ?? recipe.qualityStandard;
            const faultCorrection = detail.faultCorrection ?? recipe.faultCorrection;
            const storage = detail.storage ?? localizeStorage(recipe.storage, lang);
            const chefNote = detail.chefNote ?? recipe.chefNote;

            return (
              <div
                key={idx}
                className="border border-slate-300 dark:border-slate-700 print:border-slate-300 rounded-md p-5 space-y-3.5 bg-white dark:bg-slate-900/80 print:bg-white print-avoid-break"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 print:border-slate-200">
                  <div>
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-400 print:text-amber-800">
                      {t('manualStdChapterFormula', {
                        classification: localizeClassification(recipe.classification, lang),
                      })}
                    </p>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-0.5">
                      {t('manualRecipePrefix', { title })}
                    </h4>
                  </div>
                  {onJumpToRecipes && (
                    <button
                      type="button"
                      onClick={() => onJumpToRecipes(recipe.category, recipe.id)}
                      className="no-print text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
                    >
                      {t('openInRecipeBench')} {arrowChar}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-200 print:text-slate-700 bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-200 dark:border-slate-700 print:border-slate-200 rounded p-3">
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">
                      {t('manualYieldLabel')}
                    </span>
                    {localizeYield(recipe.yieldText, lang)}
                  </div>
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">
                      {t('manualPrepTimeLabel')}
                    </span>
                    {localizeTime(recipe.prepTime, lang)}
                  </div>
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">
                      {t('manualProductionTimeLabel')}
                    </span>
                    {localizeTime(recipe.productionTime || recipe.bakeTime, lang)}
                  </div>
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">
                      {t('manualTempLabel')}
                    </span>
                    {localizeTemp(recipe.ovenTemp, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mb-1.5">
                      {t('colIngredient')}
                    </p>
                    <ul className="list-disc ps-4 space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-slate-700">
                      {recipe.ingredients.map((item, i) => (
                        <li key={i}>
                          {localizeIngredientName(item.name, lang)}:{' '}
                          <span className="font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100 print:text-slate-900">
                            {localizeYield(item.rawQuantity, lang)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {equipment && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 print:text-slate-700 mt-3">
                        <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">
                          {t('manualEquipmentLabel')}
                        </strong>{' '}
                        {equipment}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mb-1.5">
                      {t('manualMethodLabel')}
                    </p>
                    <ol className="list-decimal ps-4 space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed">
                      {steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 print:border-slate-200 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 print:text-slate-700">
                  <p>
                    <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">
                      {t('manualQualityStandardLabel')}
                    </strong>{' '}
                    {qualityStandard}
                  </p>
                  {faultCorrection && (
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">
                        {t('manualFaultCorrectionLabel')}
                      </strong>{' '}
                      {faultCorrection}
                    </p>
                  )}
                  {storage && (
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">
                        {t('manualStorageLabel')}
                      </strong>{' '}
                      {storage}
                    </p>
                  )}
                  {chefNote && (
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">
                        {t('manualChefNotesLabel')}
                      </strong>{' '}
                      {chefNote}
                    </p>
                  )}
                </div>
              </div>
            );
          }
          if (block.type === 'list' && block.items) {
            return (
              <ul
                key={idx}
                className="list-disc ps-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 print:text-slate-700"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          if (block.type === 'ordered' && block.items) {
            return (
              <ol
                key={idx}
                className="list-decimal ps-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 print:text-slate-700"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            );
          }
          if (block.type === 'table' && block.table) {
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-md overflow-x-auto print-avoid-break"
              >
                <table className="w-full text-start text-sm">
                  <thead className="bg-slate-900 dark:bg-slate-800 print:bg-slate-900 text-white dark:text-slate-100 print:text-white text-xs">
                    <tr>
                      {block.table.headers.map((h) => (
                        <th key={h} className="px-3.5 py-2.5 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-200">
                    {block.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300 print:text-slate-700 text-xs sm:text-sm"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        })}
      </div>
    </article>
  );
}
