import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  LayoutDashboard,
  Stethoscope,
  Edit3,
  AlertTriangle,
  Heart,
  Activity,
  Apple,
  Info,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import PredictionCard from '../components/dashboard/PredictionCard';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { usePrediction } from '../context/PredictionContext';
import {
  formatAge,
  formatGenHlth,
  formatEducation,
  formatIncome,
  formatBinary,
  formatDateTime,
} from '../utils/formatters';
import { getBmiCategory } from '../utils/cdcSchema';

export default function Results() {
  const navigate = useNavigate();
  const { latestAssessment } = usePrediction();

  if (!latestAssessment) {
    return (
      <PageContainer maxWidth="4xl">
        <EmptyState
          title="No prediction data found"
          description="You haven't completed a health risk assessment yet or your previous session has expired. Complete the 21-feature survey to calculate your risk profile."
          actionLabel="Complete Risk Assessment"
          onAction={() => navigate('/predict')}
        />
      </PageContainer>
    );
  }

  const inputs = latestAssessment.inputs || {};
  const bmiInfo = getBmiCategory(inputs.BMI);
  const isHighRisk = latestAssessment.prediction === 1;

  return (
    <PageContainer
      maxWidth="5xl"
      badge="Assessment Output"
      title="Diabetes Epidemiological Risk Assessment Results"
      subtitle={`Evaluated survey indicators processed against CDC BRFSS ML classifier pipeline. Generated on ${formatDateTime(
        latestAssessment.assessmentDate
      )}.`}
      actions={
        <div className="flex items-center gap-2.5">
          <Link to="/predict">
            <Button variant="outline" size="sm" icon={Edit3}>
              Edit Submitted Form
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary" size="sm" icon={LayoutDashboard}>
              View Analytics Dashboard
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 1. Main Prominent Prediction Card */}
        <PredictionCard assessment={latestAssessment} />

        {/* 2. Self-Reported Health Indicators Summary Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-navy-deep tracking-tight">
                Self-Reported Health Indicators Summary
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Baseline parameters captured and submitted for model inference.
              </p>
            </div>
            <Link
              to="/predict"
              className="text-xs font-semibold text-navy-primary hover:text-teal-accent flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Indicators</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Demographics */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                Demographics
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {formatAge(inputs.Age)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Sex: {inputs.Sex === 1 ? 'Male' : 'Female'}
              </div>
            </div>

            {/* BMI */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                Body Mass Index
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {inputs.BMI} kg/m²
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Category: <strong className="text-slate-700">{bmiInfo.category}</strong>
              </div>
            </div>

            {/* General Health */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                General Health
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {formatGenHlth(inputs.GenHlth)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Self-reported rating
              </div>
            </div>

            {/* Physical Activity */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                Physical Activity
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {inputs.PhysActivity === 1 ? 'Active (Past 30d)' : 'Sedentary'}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Vegetables daily: {formatBinary(inputs.Veggies)}
              </div>
            </div>
          </div>

          {/* Clinical Flags List */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Documented Clinical Factors
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs">
              <div
                className={`p-2.5 rounded-lg border text-center font-medium ${
                  inputs.HighBP === 1
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                High BP: {formatBinary(inputs.HighBP)}
              </div>
              <div
                className={`p-2.5 rounded-lg border text-center font-medium ${
                  inputs.HighChol === 1
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                High Chol: {formatBinary(inputs.HighChol)}
              </div>
              <div
                className={`p-2.5 rounded-lg border text-center font-medium ${
                  inputs.Stroke === 1
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Stroke: {formatBinary(inputs.Stroke)}
              </div>
              <div
                className={`p-2.5 rounded-lg border text-center font-medium ${
                  inputs.HeartDiseaseorAttack === 1
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Heart Disease: {formatBinary(inputs.HeartDiseaseorAttack)}
              </div>
              <div
                className={`p-2.5 rounded-lg border text-center font-medium ${
                  inputs.Smoker === 1
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Smoker (≥100): {formatBinary(inputs.Smoker)}
              </div>
              <div
                className={`p-2.5 rounded-lg border text-center font-medium ${
                  inputs.DiffWalk === 1
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Diff Walk: {formatBinary(inputs.DiffWalk)}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Educational Guidance & Clinical Recommendations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-light flex items-center justify-center text-teal-accent border border-teal-accent/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-deep tracking-tight">
                Educational Guidance & Recommended Next Steps
              </h3>
              <p className="text-xs text-slate-500">
                Evidence-based lifestyle and clinical actions tailored to the CDC survey pattern.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy-primary">
                <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
                <span>1. Clinical Laboratory Test</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Schedule a consultation with your primary care provider for formal diagnostic testing,
                including a Fasting Plasma Glucose (FPG) or Glycated Hemoglobin (HbA1c) test.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy-primary">
                <Activity className="w-4 h-4 text-[#2A9D8F]" />
                <span>2. Physical Conditioning</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The American Diabetes Association (ADA) recommends at least 150 minutes of moderate-to-vigorous
                aerobic physical activity weekly, coupled with resistance training.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy-primary">
                <Apple className="w-4 h-4 text-[#2A9D8F]" />
                <span>3. Nutritional Intervention</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emphasize whole unprocessed foods, high-fiber leafy greens, and legumes while limiting
                refined carbohydrates, sugar-sweetened beverages, and trans-fats.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Action navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/dashboard"
            className="group p-5 bg-navy-mist hover:bg-navy-soft rounded-2xl border border-navy-soft transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-navy-primary uppercase tracking-wide block">
                Next Stage
              </span>
              <h4 className="text-base font-bold text-navy-deep group-hover:text-navy-primary transition-colors">
                Explore Population Health Dashboard
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                View visual distributions, BMI benchmarks, and historic trajectory.
              </p>
            </div>
            <LayoutDashboard className="w-6 h-6 text-navy-primary shrink-0 ml-3" />
          </Link>

          <Link
            to="/predict"
            className="group p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all flex items-center justify-between shadow-card"
          >
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                New Session
              </span>
              <h4 className="text-base font-bold text-slate-800 group-hover:text-navy-deep transition-colors">
                Perform Another Assessment
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Evaluate an updated set of patient health parameters.
              </p>
            </div>
            <Stethoscope className="w-6 h-6 text-slate-400 shrink-0 ml-3" />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

