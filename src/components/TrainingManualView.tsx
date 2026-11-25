import { useState } from 'react';
import { BookOpen, Printer } from 'lucide-react';
import { MANUAL_PARTS, ManualPart, TOC_ENTRIES } from '../data/manualParts';
import {
  RECIPE_CATEGORIES,
  STANDARDIZED_RECIPES,
  findRecipeByIndexTitle,
} from '../data/recipes';

interface TrainingManualViewProps {
  onJumpToRecipes?: (category?: string, recipeId?: string) => void;
}

export function TrainingManualView({ onJumpToRecipes }: TrainingManualViewProps) {
  const [activePartId, setActivePartId] = useState<string>('all');

  const visibleParts =
    activePartId === 'all'
      ? MANUAL_PARTS
      : MANUAL_PARTS.filter((p) => p.id === activePartId);

  const handleTocClick = (id: string) => {
    setActivePartId(id);
  };

  return (
    <div className="space-y-6">
      {/* Screen Toolbar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Professional Bakery, Pastry, Bread &amp; Pizza Technology
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive Professional Kitchen Edition · Metric System · Degrees Celsius (°C) · Costing Currency: USD ($).
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0"
        >
          <Printer className="w-4 h-4" />
          Print / Save Complete Manual as PDF
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
          Complete Edition
        </button>
        {MANUAL_PARTS.map((part) => (
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
              Professional Bakery, Pastry, Bread &amp; Pizza Technology
            </h1>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-400 print:text-amber-800 mt-3 tracking-wide">
              Comprehensive Professional Kitchen Edition
            </p>
            <div className="w-16 h-0.5 bg-amber-700 dark:bg-amber-500 mx-auto my-6" />
            <div className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600 leading-loose max-w-md mx-auto font-mono">
              <p>Measurement standard: Metric system</p>
              <p>Temperature standard: Degrees Celsius (°C)</p>
              <p>Costing currency: United States Dollar (USD)</p>
              <p>Edition scope: 439 total reference recipes · {STANDARDIZED_RECIPES.length} interactive bench formulas</p>
            </div>
          </div>
        )}

        {/* Interactive Table of Contents */}
        {activePartId === 'all' && (
          <div className="px-4 sm:px-10 lg:px-14 py-8 sm:py-12 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 print-break-after">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 pb-3 border-b-2 border-amber-700 dark:border-amber-500 mb-6">
              Table of Contents
            </h2>
            <div className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 print:bg-slate-900 print:text-white text-xs">
                  <tr>
                    <th className="px-4 py-2.5 font-medium w-28">Chapter</th>
                    <th className="px-4 py-2.5 font-medium">Subject</th>
                    <th className="px-4 py-2.5 font-medium text-right w-20">Page</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-200">
                  {TOC_ENTRIES.map((entry, idx) => (
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
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-amber-800 dark:text-amber-400 print:text-amber-800 text-xs">
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
          <div id="master-recipe-index" className="px-4 sm:px-10 lg:px-14 py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800 print:border-slate-200 print-break-before">
            <p className="text-xs font-medium text-amber-800 dark:text-amber-400 print:text-amber-800">Interactive Recipe Bench Summary</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-1 pb-3 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 mb-6">
              Standardized Kitchen Formulas ({STANDARDIZED_RECIPES.length} Interactive Recipes)
            </h2>
            <div className="space-y-8">
              {RECIPE_CATEGORIES.map((category) => {
                const catRecipes = STANDARDIZED_RECIPES.filter((r) => r.category === category);
                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 print:border-slate-200 pb-1.5">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">{category}</h3>
                      {onJumpToRecipes && (
                        <button
                          type="button"
                          onClick={() => onJumpToRecipes(category)}
                          className="no-print text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300"
                        >
                          Open in Recipe Bench →
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {catRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="border border-slate-200 dark:border-slate-800 print:border-slate-200 rounded-md p-4 print-avoid-break"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">
                              {recipe.number}. {recipe.title}
                            </h4>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 print:text-slate-500">
                                {recipe.yieldText} · {recipe.ovenTemp}
                              </span>
                              {onJumpToRecipes && (
                                <button
                                  type="button"
                                  onClick={() => onJumpToRecipes(recipe.category, recipe.id)}
                                  className="no-print text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
                                >
                                  Open in Recipe Bench →
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600 mb-2">
                            <strong className="text-slate-800 dark:text-slate-200 print:text-slate-900">Ingredients:</strong>{' '}
                            {recipe.ingredients.map((i) => `${i.name} (${i.rawQuantity})`).join(', ')}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 print:text-slate-600">
                            <strong className="text-slate-800 dark:text-slate-200 print:text-slate-900">Quality standard:</strong> {recipe.qualityStandard}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 print:border-slate-200 text-center">
              <p className="text-xs italic text-slate-500 dark:text-slate-400 print:text-slate-500">End of book</p>
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
  return (
    <article className="px-4 sm:px-10 lg:px-14 py-8 sm:py-10 space-y-5 print-break-before">
      <div>
        <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-400 print:text-amber-800 font-medium">
          <span>{part.label}</span>
          <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400 print:text-slate-500">Page {part.pageNumber}</span>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-1 pb-3 border-b border-slate-200 dark:border-slate-800 print:border-slate-200">
          {part.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 print:text-slate-600 mt-2">{part.summary}</p>
      </div>

      <div className="space-y-4">
        {part.blocks.map((block, idx) => {
          if (block.type === 'subheading') {
            return (
              <h3 key={idx} className="text-lg font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 pt-3">
                {block.text}
              </h3>
            );
          }
          if (block.type === 'h4') {
            return (
              <h4 key={idx} className="text-sm font-semibold text-slate-800 dark:text-slate-200 print:text-slate-800 pt-2">
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
                <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed max-w-prose">
                  {titles.map((title, tIdx) => {
                    const matched = findRecipeByIndexTitle(title);
                    return (
                      <span key={`${title}-${tIdx}`}>
                        {tIdx > 0 && <span className="text-slate-400 dark:text-slate-500 mx-1.5">·</span>}
                        {matched ? (
                          <button
                            type="button"
                            onClick={() => onJumpToRecipes(matched.category, matched.id)}
                            className="text-left text-slate-800 dark:text-slate-200 print:text-slate-800 hover:text-amber-800 dark:hover:text-amber-400 hover:underline underline-offset-2 transition-colors"
                            title={`Open #${matched.number} ${matched.title} in Recipe Bench`}
                          >
                            {title}
                          </button>
                        ) : (
                          <span>{title}</span>
                        )}
                      </span>
                    );
                  })}
                </p>
              );
            }
            return (
              <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed max-w-prose">
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
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900">{block.caption}</p>
                )}
                <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed">
                  {block.items.join(' -> ')}
                </pre>
              </div>
            );
          }
          if (block.type === 'recipe' && block.recipeId) {
            const recipe = STANDARDIZED_RECIPES.find((r) => r.id === block.recipeId);
            if (!recipe) return null;
            return (
              <div
                key={idx}
                className="border border-slate-300 dark:border-slate-700 print:border-slate-300 rounded-md p-5 space-y-3.5 bg-white dark:bg-slate-900/80 print:bg-white print-avoid-break"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 print:border-slate-200">
                  <div>
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-400 print:text-amber-800">
                      Standardized Chapter Formula · {recipe.classification}
                    </p>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-0.5">
                      Recipe: {recipe.title}
                    </h4>
                  </div>
                  {onJumpToRecipes && (
                    <button
                      type="button"
                      onClick={() => onJumpToRecipes(recipe.category, recipe.id)}
                      className="no-print text-xs font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 whitespace-nowrap"
                    >
                      Open in Recipe Bench →
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-200 print:text-slate-700 bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-200 dark:border-slate-700 print:border-slate-200 rounded p-3">
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">Yield</span>
                    {recipe.yieldText}
                  </div>
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">Prep Time</span>
                    {recipe.prepTime}
                  </div>
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">Production Time</span>
                    {recipe.productionTime || recipe.bakeTime}
                  </div>
                  <div>
                    <span className="block text-[11px] font-sans text-slate-500 dark:text-slate-400 print:text-slate-500">Temperature</span>
                    {recipe.ovenTemp}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mb-1.5">Ingredients</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-slate-700">
                      {recipe.ingredients.map((item, i) => (
                        <li key={i}>
                          {item.name}:{' '}
                          <span className="font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100 print:text-slate-900">
                            {item.rawQuantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {recipe.equipment && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 print:text-slate-700 mt-3">
                        <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">Equipment:</strong> {recipe.equipment}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 print:text-slate-900 mb-1.5">Method</p>
                    <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed">
                      {recipe.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 print:border-slate-200 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 print:text-slate-700">
                  <p>
                    <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">Quality standard:</strong>{' '}
                    {recipe.qualityStandard}
                  </p>
                  {recipe.faultCorrection && (
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">Fault correction:</strong>{' '}
                      {recipe.faultCorrection}
                    </p>
                  )}
                  {recipe.storage && (
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">Storage:</strong> {recipe.storage}
                    </p>
                  )}
                  {recipe.chefNote && (
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100 print:text-slate-900">Chef&apos;s notes:</strong>{' '}
                      {recipe.chefNote}
                    </p>
                  )}
                </div>
              </div>
            );
          }
          if (block.type === 'list' && block.items) {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 print:text-slate-700">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          if (block.type === 'ordered' && block.items) {
            return (
              <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 print:text-slate-700">
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
                <table className="w-full text-left text-sm">
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
                          <td key={cIdx} className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300 print:text-slate-700 text-xs sm:text-sm">
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
