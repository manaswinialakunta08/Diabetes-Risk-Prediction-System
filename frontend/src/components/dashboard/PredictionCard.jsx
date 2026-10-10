import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

export default function PredictionCard({ assessment }) {
  if (!assessment) return null;

  const isHighRisk = assessment.prediction === 1;
  const isMock = assessment.isMock;
  const probability = assessment.probability;
  const modelName = assessment.modelName || 'Production ML Classifier';

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 transition-all relative overflow-hidden shadow-card ${
        isHighRisk
          ? 'bg-gradient-to-br from-amber-50/70 via-white to-red-50/40 border-amber-300/80 ring-1 ring-amber-300/50'
          : 'bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 border-emerald-300/80 ring-1 ring-emerald-300/50'
      }`}
    >
      {/* Dev Mode Banner if simulated */}
      {isMock && (
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-100/90 text-amber-900 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>DEVELOPMENT SIMULATED ASSESSMENT — Backend offline fallback</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isHighRisk
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              {isHighRisk ? (
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              )}
              {isHighRisk ? 'Elevated Diabetes Risk' : 'Low Diabetes Risk Profile'}
            </span>
            <span className="text-xs text-slate-500">
              Assessed on {formatDateTime(assessment.assessmentDate)}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-deep tracking-tight">
            {assessment.label || (isHighRisk ? 'Positive Risk Category' : 'Negative Risk Category')}
          </h2>

          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            {isHighRisk
              ? 'Based on the CDC BRFSS epidemiological risk pattern, your self-reported profile exhibits notable correlations with individuals diagnosed with pre-diabetes or Type-2 diabetes. Clinical confirmatory diagnostic tests are strongly recommended.'
              : 'Based on the CDC BRFSS epidemiological risk pattern, your self-reported indicators reflect low correlation with diabetes indicators. Continue supporting metabolic wellness through healthy nutrition and regular physical activity.'}
          </p>
        </div>

        {/* Probability or Model Metric Card */}
        <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 sm:p-5 border border-slate-200/90 min-w-[220px] shadow-xs text-center md:text-right shrink-0">
          <div className="text-xs font-medium text-slate-500 mb-1 flex items-center justify-center md:justify-end gap-1">
            <span>Model Risk Index</span>
            <div className="group relative">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
              <div className="hidden group-hover:block absolute right-0 bottom-full mb-1.5 w-52 p-2 bg-slate-900 text-white text-[11px] rounded shadow-lg z-20 text-left font-normal">
                Represents model posterior probability calibrated against CDC BRFSS survey population. It does not reflect a clinical blood assay.
              </div>
            </div>
          </div>

          {probability !== null && probability !== undefined ? (
            <div className="text-3xl sm:text-4xl font-black text-navy-deep">
              {Math.round(probability * 100)}%
            </div>
          ) : (
            <div className="text-2xl font-bold text-navy-primary">
              Binary Class {assessment.prediction}
            </div>
          )}

          <div className="mt-1 text-xs text-slate-500">
            Pipeline: <strong className="font-semibold text-slate-700">{modelName}</strong>
          </div>
        </div>
      </div>

      {/* Contributing Factors Tags */}
      {assessment.contributingFactors && assessment.contributingFactors.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-200/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
            Key Epidemiological Factors Identified:
          </span>
          <div className="flex flex-wrap gap-2">
            {assessment.contributingFactors.map((factor, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
              >
                • {factor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

