import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  HeartPulse,
  Activity,
  Building2,
  RotateCcw,
  Sparkles,
  Calculator,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import FormSection from '../components/forms/FormSection';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import RadioGroup from '../components/forms/RadioGroup';
import ToggleField from '../components/forms/ToggleField';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingState from '../components/common/LoadingState';
import { usePrediction } from '../context/PredictionContext';
import {
  AGE_CATEGORIES,
  EDUCATION_CATEGORIES,
  GEN_HEALTH_CATEGORIES,
  INCOME_CATEGORIES,
  SEX_CATEGORIES,
  getBmiCategory,
} from '../utils/cdcSchema';
import { validateAssessmentForm } from '../utils/validation';

export default function Predict() {
  const navigate = useNavigate();
  const { formData, updateFormField, resetForm, runPrediction, loading, error, setError } =
    usePrediction();

  const [validationErrors, setValidationErrors] = useState({});
  const [showBmiCalculator, setShowBmiCalculator] = useState(false);
  const [calcHeightCm, setCalcHeightCm] = useState('170');
  const [calcWeightKg, setCalcWeightKg] = useState('72');

  const bmiInfo = getBmiCategory(formData.BMI);

  const handleBmiCalculation = () => {
    const hMeters = parseFloat(calcHeightCm) / 100;
    const wKg = parseFloat(calcWeightKg);
    if (hMeters > 0 && wKg > 0) {
      const calculatedBmi = Math.round((wKg / (hMeters * hMeters)) * 10) / 10;
      updateFormField('BMI', calculatedBmi);
      setShowBmiCalculator(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { isValid, errors } = validateAssessmentForm(formData);
    if (!isValid) {
      setValidationErrors(errors);
      // Scroll to the top of form to show error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setValidationErrors({});

    try {
      await runPrediction();
      navigate('/results');
    } catch (err) {
      // Error message is handled by context & displayed below
    }
  };

  return (
    <PageContainer
      maxWidth="5xl"
      title="Patient Health Information Assessment"
      subtitle="Enter standardized clinical and lifestyle indicators adhering to the CDC BRFSS epidemiological dataset schema."
      badge="21 Survey Features"
    >
      {/* Fullscreen Loading Overlay during ML inference */}
      {loading && (
        <LoadingState
          variant="fullscreen"
          title="Calculating Diabetes Risk Stratification"
          message="Running machine learning inference across the 21 CDC health indicators..."
        />
      )}

      {/* Global Error Banner */}
      {error && (
        <div className="mb-6">
          <ErrorMessage
            title="Prediction Request Failure"
            message={error}
            onRetry={handleSubmit}
          />
        </div>
      )}

      {Object.keys(validationErrors).length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="font-semibold">Incomplete or invalid entries: </strong>
            Please review the highlighted fields in the form below before proceeding.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* ================= SECTION A: BASIC INFORMATION ================= */}
        <FormSection
          title="Section A — Basic Demographics & Anthropometrics"
          subtitle="Fundamental patient indicators including age stratification, biological sex, BMI, and overall self-rated wellness."
          badge="Section A"
          icon={User}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Category */}
            <SelectField
              id="Age"
              name="Age"
              label="Age Bracket"
              required
              value={formData.Age}
              onChange={(e) => updateFormField('Age', parseInt(e.target.value, 10))}
              options={AGE_CATEGORIES}
              helperText="CDC BRFSS utilizes a 13-tier age bracket system (Ages 18 to 80+)."
              error={validationErrors.Age}
            />

            {/* Sex */}
            <RadioGroup
              name="Sex"
              label="Biological Sex"
              required
              value={formData.Sex}
              onChange={(val) => updateFormField('Sex', parseInt(val, 10))}
              options={SEX_CATEGORIES}
              helperText="Reported biological sex for epidemiological risk normalization."
              orientation="horizontal"
              error={validationErrors.Sex}
            />

            {/* BMI & Inline Calculator */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="BMI" className="block text-sm font-medium text-slate-700">
                  Body Mass Index (BMI) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowBmiCalculator(!showBmiCalculator)}
                  className="text-xs font-semibold text-navy-primary hover:text-teal-accent flex items-center gap-1 focus:outline-none"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{showBmiCalculator ? 'Hide Calculator' : 'BMI Calculator'}</span>
                </button>
              </div>

              {showBmiCalculator && (
                <div className="mb-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <div className="font-semibold text-slate-700">Quick BMI Calculation</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={calcHeightCm}
                        onChange={(e) => setCalcHeightCm(e.target.value)}
                        className="w-full p-2 bg-white rounded border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        value={calcWeightKg}
                        onChange={(e) => setCalcWeightKg(e.target.value)}
                        className="w-full p-2 bg-white rounded border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleBmiCalculation} className="w-full">
                    Compute & Apply BMI
                  </Button>
                </div>
              )}

              <InputField
                id="BMI"
                name="BMI"
                type="number"
                step="0.1"
                min="10"
                max="98"
                required
                value={formData.BMI}
                onChange={(e) => updateFormField('BMI', e.target.value)}
                suffix="kg/m²"
                helperText={`Current classification: ${bmiInfo.category} (${bmiInfo.description})`}
                error={validationErrors.BMI}
              />
            </div>

            {/* General Health */}
            <SelectField
              id="GenHlth"
              name="GenHlth"
              label="General Health Evaluation"
              required
              value={formData.GenHlth}
              onChange={(e) => updateFormField('GenHlth', parseInt(e.target.value, 10))}
              options={GEN_HEALTH_CATEGORIES}
              helperText="Self-reported assessment of general physical and vitality status."
              error={validationErrors.GenHlth}
            />
          </div>
        </FormSection>

        {/* ================= SECTION B: MEDICAL HISTORY ================= */}
        <FormSection
          title="Section B — Clinical & Medical History"
          subtitle="Documented clinical diagnoses, cardiovascular markers, and functional mobility challenges."
          badge="Section B"
          icon={HeartPulse}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToggleField
              id="HighBP"
              name="HighBP"
              label="High Blood Pressure"
              description="Ever been told by a doctor or health professional that you have high blood pressure."
              checked={formData.HighBP}
              onChange={(val) => updateFormField('HighBP', val)}
            />

            <ToggleField
              id="HighChol"
              name="HighChol"
              label="High Blood Cholesterol"
              description="Ever been informed by a healthcare provider that blood cholesterol is elevated."
              checked={formData.HighChol}
              onChange={(val) => updateFormField('HighChol', val)}
            />

            <ToggleField
              id="CholCheck"
              name="CholCheck"
              label="Cholesterol Screened in Past 5 Years"
              description="Has a professional cholesterol blood test check been performed within the last 5 years."
              checked={formData.CholCheck}
              onChange={(val) => updateFormField('CholCheck', val)}
            />

            <ToggleField
              id="Stroke"
              name="Stroke"
              label="History of Stroke"
              description="Ever received a clinical diagnosis of a stroke event or cerebrovascular accident."
              checked={formData.Stroke}
              onChange={(val) => updateFormField('Stroke', val)}
            />

            <ToggleField
              id="HeartDiseaseorAttack"
              name="HeartDiseaseorAttack"
              label="Coronary Heart Disease or Myocardial Infarction"
              description="History of angina, coronary artery disease, or heart attack."
              checked={formData.HeartDiseaseorAttack}
              onChange={(val) => updateFormField('HeartDiseaseorAttack', val)}
            />

            <ToggleField
              id="DiffWalk"
              name="DiffWalk"
              label="Difficulty Walking or Climbing Stairs"
              description="Do you have serious difficulty walking or negotiating flights of stairs."
              checked={formData.DiffWalk}
              onChange={(val) => updateFormField('DiffWalk', val)}
            />
          </div>
        </FormSection>

        {/* ================= SECTION C: LIFESTYLE ================= */}
        <FormSection
          title="Section C — Lifestyle & Modifiable Behaviors"
          subtitle="Daily nutritional habits, physical activity frequency, smoking history, and alcohol intake."
          badge="Section C"
          icon={Activity}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToggleField
              id="Smoker"
              name="Smoker"
              label="Smoking History (≥100 Cigarettes)"
              description="Have you smoked at least 100 cigarettes (approx 5 packs) in your lifetime."
              checked={formData.Smoker}
              onChange={(val) => updateFormField('Smoker', val)}
            />

            <ToggleField
              id="PhysActivity"
              name="PhysActivity"
              label="Physical Activity in Past 30 Days"
              description="Participated in any physical activities or exercise outside of your regular employment."
              checked={formData.PhysActivity}
              onChange={(val) => updateFormField('PhysActivity', val)}
            />

            <ToggleField
              id="Fruits"
              name="Fruits"
              label="Fruit Consumption (≥1 Time / Day)"
              description="Consumes whole fruit, 100% fruit juice, or berries at least once daily."
              checked={formData.Fruits}
              onChange={(val) => updateFormField('Fruits', val)}
            />

            <ToggleField
              id="Veggies"
              name="Veggies"
              label="Vegetable Consumption (≥1 Time / Day)"
              description="Consumes dark leafy greens, legumes, or other vegetables at least once daily."
              checked={formData.Veggies}
              onChange={(val) => updateFormField('Veggies', val)}
            />

            <div className="sm:col-span-2">
              <ToggleField
                id="HvyAlcoholConsump"
                name="HvyAlcoholConsump"
                label="Heavy Alcohol Consumption Indicator"
                description="Heavy drinking defined as adult males having ≥14 alcoholic beverages/week and adult females having ≥7 alcoholic beverages/week."
                checked={formData.HvyAlcoholConsump}
                onChange={(val) => updateFormField('HvyAlcoholConsump', val)}
              />
            </div>
          </div>
        </FormSection>

        {/* ================= SECTION D: HEALTHCARE & ADDITIONAL ================= */}
        <FormSection
          title="Section D — Healthcare Access & Socioeconomic Indicators"
          subtitle="Recent 30-day mental and physical disability counts, health coverage, education, and household income."
          badge="Section D"
          icon={Building2}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ToggleField
              id="AnyHealthcare"
              name="AnyHealthcare"
              label="Healthcare Coverage"
              description="Have any health insurance, HMO, Medicare, Medicaid, or government coverage."
              checked={formData.AnyHealthcare}
              onChange={(val) => updateFormField('AnyHealthcare', val)}
            />

            <ToggleField
              id="NoDocbcCost"
              name="NoDocbcCost"
              label="Doctor Care Deferred Due to Cost"
              description="Was there a time in the past 12 months when you needed a doctor but could not visit due to expenses."
              checked={formData.NoDocbcCost}
              onChange={(val) => updateFormField('NoDocbcCost', val)}
            />

            {/* Mental Health Days */}
            <InputField
              id="MentHlth"
              name="MentHlth"
              type="number"
              min="0"
              max="30"
              label="Days of Suboptimal Mental Health"
              required
              value={formData.MentHlth}
              onChange={(e) => updateFormField('MentHlth', parseInt(e.target.value, 10) || 0)}
              suffix="days / 30"
              helperText="Number of days in the past 30 days mental health was not good (stress, depression, problems with emotions)."
              error={validationErrors.MentHlth}
            />

            {/* Physical Health Days */}
            <InputField
              id="PhysHlth"
              name="PhysHlth"
              type="number"
              min="0"
              max="30"
              label="Days of Poor Physical Health"
              required
              value={formData.PhysHlth}
              onChange={(e) => updateFormField('PhysHlth', parseInt(e.target.value, 10) || 0)}
              suffix="days / 30"
              helperText="Number of days in the past 30 days physical health was not good (illness, injury)."
              error={validationErrors.PhysHlth}
            />

            {/* Education */}
            <SelectField
              id="Education"
              name="Education"
              label="Educational Attainment Level"
              required
              value={formData.Education}
              onChange={(e) => updateFormField('Education', parseInt(e.target.value, 10))}
              options={EDUCATION_CATEGORIES}
              helperText="Highest completed level of schooling according to CDC categories."
              error={validationErrors.Education}
            />

            {/* Income */}
            <SelectField
              id="Income"
              name="Income"
              label="Annual Household Income Tier"
              required
              value={formData.Income}
              onChange={(e) => updateFormField('Income', parseInt(e.target.value, 10))}
              options={INCOME_CATEGORIES}
              helperText="Total combined annual income category from all sources."
              error={validationErrors.Income}
            />
          </div>
        </FormSection>

        {/* ================= ACTION BAR ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
            <span>All 21 features validated against model schema. Target variable is excluded.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={RotateCcw}
              onClick={resetForm}
              disabled={loading}
              className="w-1/2 sm:w-auto"
            >
              Reset Form
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-1/2 sm:w-auto"
            >
              Analyze Health Risk
            </Button>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

