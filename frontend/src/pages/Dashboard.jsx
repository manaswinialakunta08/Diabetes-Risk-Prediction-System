import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
} from 'recharts';
import {
  LayoutDashboard,
  Stethoscope,
  Activity,
  HeartPulse,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Info,
  Clock,
  Trash2,
  Sparkles,
} from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import StatCard from '../components/common/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import HealthInsightCard from '../components/dashboard/HealthInsightCard';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import LoadingState from '../components/common/LoadingState';
import { usePrediction } from '../context/PredictionContext';
import { useAuth } from '../context/AuthContext';
import { formatDateTime, formatAgeShort } from '../utils/formatters';
import { getBmiCategory } from '../utils/cdcSchema';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    latestAssessment,
    assessmentHistory,
    loading: contextLoading,
    clearHistory,
  } = usePrediction();

  const [loading, setLoading] = useState(false);

  // If no assessment exists yet
  if (!latestAssessment && assessmentHistory.length === 0) {
    return (
      <PageContainer maxWidth="7xl" title="Health Analytics Dashboard">
        <EmptyState
          title="No Health Records in Dashboard"
          description="You haven't conducted any epidemiological risk assessments yet. Complete your first 21-indicator survey to unlock personalized analytics, BMI distribution benchmarks, and risk stratification charts."
          actionLabel="Initiate Health Assessment"
          onAction={() => navigate('/predict')}
        />
      </PageContainer>
    );
  }

  const current = latestAssessment || assessmentHistory[0];
  const inputs = current?.inputs || {};
  const bmiInfo = getBmiCategory(inputs.BMI || 25);
  const isHighRisk = current?.prediction === 1;

  // Prepare BMI Threshold Visualization Data
  const bmiChartData = [
    { name: 'Underweight', range: 18.5, threshold: '< 18.5', fill: '#94A3B8' },
    { name: 'Normal', range: 24.9, threshold: '18.5–24.9', fill: '#059669' },
    { name: 'Overweight', range: 29.9, threshold: '25.0–29.9', fill: '#D97706' },
    { name: 'Obesity Class I', range: 34.9, threshold: '30.0–34.9', fill: '#DC2626' },
    { name: 'Patient Current', range: Number(inputs.BMI || 0), threshold: `${inputs.BMI} kg/m²`, fill: '#142B4A', isUser: true },
  ];

  // Self-Reported Health Indicators Balance Chart Data
  const lifestyleIndicatorsData = [
    { indicator: 'Phys Activity', status: inputs.PhysActivity ? 100 : 0, target: 100, label: inputs.PhysActivity ? 'Active' : 'Sedentary' },
    { indicator: 'Daily Fruits', status: inputs.Fruits ? 100 : 0, target: 100, label: inputs.Fruits ? 'Yes' : 'No' },
    { indicator: 'Daily Veggies', status: inputs.Veggies ? 100 : 0, target: 100, label: inputs.Veggies ? 'Yes' : 'No' },
    { indicator: 'Non-Smoker', status: inputs.Smoker === 0 ? 100 : 0, target: 100, label: inputs.Smoker === 0 ? 'Non-Smoker' : 'Smoker' },
    { indicator: 'Normal BP', status: inputs.HighBP === 0 ? 100 : 0, target: 100, label: inputs.HighBP === 0 ? 'Normal' : 'Elevated' },
    { indicator: 'Normal Chol', status: inputs.HighChol === 0 ? 100 : 0, target: 100, label: inputs.HighChol === 0 ? 'Normal' : 'Elevated' },
  ];

  // Historical Trend Data if multiple assessments exist
  const historyTrendData = assessmentHistory
    .slice()
    .reverse()
    .map((item, index) => ({
      index: `#${index + 1}`,
      date: new Date(item.assessmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      riskProbability: item.probability ? Math.round(item.probability * 100) : item.prediction === 1 ? 85 : 15,
      bmi: Number(item.inputs?.BMI || 0),
    }));

  return (
    <PageContainer
      maxWidth="7xl"
      title="Health Risk Analytics Dashboard"
      subtitle={`Comprehensive evaluation based on CDC BRFSS epidemiological benchmarks. Latest assessment recorded: ${formatDateTime(
        current?.assessmentDate
      )}`}
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={Trash2}
            onClick={() => {
              if (window.confirm('Clear all recorded local assessment history?')) {
                clearHistory();
              }
            }}
          >
            Clear Records
          </Button>

          <Link to="/predict">
            <Button variant="primary" size="sm" icon={Stethoscope}>
              New Assessment
            </Button>
          </Link>
        </div>
      }
    >
      {/* Dev Mode Banner if simulated */}
      {current?.isMock && (
        <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Development Mock Environment: </strong>
              The backend API was offline during assessment; these records were generated via local CDC BRFSS empirical simulation.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-amber-100 px-2 py-0.5 rounded text-amber-800">
            MOCK_DATA
          </span>
        </div>
      )}

      {/* A & B. SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Prediction Stratification */}
        <StatCard
          title="Predicted Risk Class"
          value={isHighRisk ? 'Positive Risk' : 'Low Risk'}
          subtitle={isHighRisk ? 'Elevated diabetes correlation' : 'Low epidemiological risk'}
          icon={Activity}
          badge={current?.probability ? `${Math.round(current.probability * 100)}% Index` : `Class ${current?.prediction}`}
          badgeType={isHighRisk ? 'danger' : 'success'}
        />

        {/* Card 2: BMI Metric */}
        <StatCard
          title="Body Mass Index"
          value={`${inputs.BMI || '—'} kg/m²`}
          subtitle={`Classified as ${bmiInfo.category}`}
          icon={HeartPulse}
          badge={bmiInfo.category}
          badgeType={bmiInfo.color === 'emerald' ? 'success' : bmiInfo.color === 'amber' ? 'warning' : 'danger'}
        />

        {/* Card 3: General Health Rating */}
        <StatCard
          title="General Health"
          value={`Grade ${inputs.GenHlth || '—'}/5`}
          subtitle={
            inputs.GenHlth === 1
              ? 'Excellent Vitality'
              : inputs.GenHlth === 2
              ? 'Very Good Vitality'
              : inputs.GenHlth === 3
              ? 'Moderate Good'
              : 'Fair or Poor'
          }
          icon={TrendingUp}
          badge={inputs.GenHlth <= 2 ? 'Optimal' : 'Caution'}
          badgeType={inputs.GenHlth <= 2 ? 'success' : 'warning'}
        />

        {/* Card 4: Historical Count */}
        <StatCard
          title="Assessment History"
          value={`${assessmentHistory.length || 1} Record${assessmentHistory.length > 1 ? 's' : ''}`}
          subtitle="Sequential screening evaluations"
          icon={Calendar}
          badge="Tracked"
          badgeType="info"
        />
      </div>

      {/* C. VISUAL CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Chart 1: BMI Distribution Benchmark */}
        <ChartCard
          title="BMI Benchmark Relative to WHO Clinical Categories"
          subtitle="Compares your self-reported BMI against clinical underweight, normal, and obesity thresholds."
          badge="Anthropometrics"
          infoTooltip="Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters. High BMI correlates strongly with insulin resistance in CDC models."
        >
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bmiChartData}
                margin={{ top: 20, right: 20, left: -10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  domain={[0, Math.max(45, Number(inputs.BMI || 0) + 5)]}
                />
                <Tooltip
                  formatter={(val, name, props) => [`${val} kg/m²`, props.payload.isUser ? 'Your BMI' : 'Threshold']}
                  contentStyle={{
                    backgroundColor: '#0B1F36',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="range" radius={[6, 6, 0, 0]}>
                  {bmiChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isUser ? '#142B4A' : entry.fill}
                      stroke={entry.isUser ? '#2A9D8F' : 'transparent'}
                      strokeWidth={entry.isUser ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Modifiable Health & Protective Factors */}
        <ChartCard
          title="Self-Reported Preventative Health Adherence"
          subtitle="Evaluation of favorable cardiovascular and lifestyle survey indicators."
          badge="6 Protective Metrics"
          infoTooltip="Evaluates whether standard cardioprotective and diabetes risk-mitigating habits are present based on your responses."
        >
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={lifestyleIndicatorsData}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
                <YAxis dataKey="indicator" type="category" tick={{ fontSize: 11, fill: '#1F2937' }} width={90} />
                <Tooltip
                  formatter={(val, name, props) => [props.payload.label, 'Reported Status']}
                  contentStyle={{
                    backgroundColor: '#0B1F36',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="status" radius={[0, 4, 4, 0]}>
                  {lifestyleIndicatorsData.map((entry, index) => (
                    <Cell
                      key={`cell-ls-${index}`}
                      fill={entry.status === 100 ? '#2A9D8F' : '#E2E8F0'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Historical Trend Chart (Displayed when >= 2 assessments exist) */}
      {assessmentHistory.length >= 2 && (
        <div className="mb-8">
          <ChartCard
            title="Sequential Risk Trajectory"
            subtitle="Tracks model risk probability fluctuations across chronological self-assessments."
            badge={`${assessmentHistory.length} Recorded Sessions`}
            infoTooltip="Visualizes change across assessments over time. Note: changes in survey answers affect the statistical probability."
          >
            <div className="h-[260px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyTrendData} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Risk Probability']}
                    contentStyle={{
                      backgroundColor: '#0B1F36',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="riskProbability"
                    stroke="#142B4A"
                    strokeWidth={3}
                    dot={{ fill: '#2A9D8F', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      )}

      {/* D. CLINICAL INSIGHTS & EPIDEMIOLOGICAL EVIDENCE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-navy-mist flex items-center justify-center text-navy-primary border border-navy-soft">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-deep tracking-tight">
              Clinical Insights & Epidemiological Correlation
            </h3>
            <p className="text-xs text-slate-500">
              Distinguishing self-reported subjective indicators from statistical machine learning inferences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Insight 1: Blood Pressure */}
          <HealthInsightCard
            category="Cardiovascular Marker"
            title={inputs.HighBP === 1 ? 'Hypertension Identified' : 'Normotensive Status'}
            description={
              inputs.HighBP === 1
                ? 'High blood pressure is strongly associated with vascular endothelial dysfunction and insulin resistance in the CDC BRFSS population.'
                : 'Absence of diagnosed hypertension is a notable protective marker in population health analyses.'
            }
            type={inputs.HighBP === 1 ? 'danger' : 'positive'}
            recommendation={
              inputs.HighBP === 1
                ? 'Monitor sodium consumption, sustain physical conditioning, and discuss blood pressure management with your clinician.'
                : 'Continue annual cardiovascular checkups to maintain healthy arterial compliance.'
            }
            source="Self-reported diagnosis question: HighBP"
          />

          {/* Insight 2: Physical Activity */}
          <HealthInsightCard
            category="Metabolic Expenditure"
            title={inputs.PhysActivity === 1 ? 'Regular Physical Conditioning' : 'Sedentary Pattern'}
            description={
              inputs.PhysActivity === 1
                ? 'Aerobic and resistance exercises enhance GLUT-4 glucose transporter translocation, directly improving cellular insulin sensitivity.'
                : 'Lack of past 30-day physical activity outside work places higher metabolic demand on pancreatic beta cells.'
            }
            type={inputs.PhysActivity === 1 ? 'positive' : 'warning'}
            recommendation={
              inputs.PhysActivity === 1
                ? 'Target ≥150 minutes of moderate aerobic conditioning weekly as advised by the ADA.'
                : 'Gradually introduce 20-30 minutes of brisk walking 4-5 times per week to stimulate peripheral glucose uptake.'
            }
            source="Self-reported habit question: PhysActivity"
          />

          {/* Insight 3: Nutritional Indicators */}
          <HealthInsightCard
            category="Dietary Micronutrients"
            title={inputs.Veggies === 1 && inputs.Fruits === 1 ? 'Daily Produce Intake' : 'Suboptimal Produce Intake'}
            description={
              inputs.Veggies === 1 && inputs.Fruits === 1
                ? 'Consistent intake of dietary fiber attenuates postprandial glycemic excursions and supports gastrointestinal microbiome diversity.'
                : 'Low dietary fiber intake is correlated with higher glycemic variability and elevated inflammatory cytokines.'
            }
            type={inputs.Veggies === 1 && inputs.Fruits === 1 ? 'positive' : 'neutral'}
            recommendation="Incorporate minimally processed whole vegetables, legumes, and low-glycemic berries into daily meal planning."
            source="Self-reported intake questions: Fruits, Veggies"
          />

          {/* Insight 4: Model Statistical Limitations */}
          <HealthInsightCard
            category="Model Limitations"
            title="Survey-Based Algorithmic Boundary"
            description="The prediction model relies exclusively on 21 survey-based indicators from BRFSS 2015. It does not ingest direct clinical assays (such as HbA1c, fasting glucose, or oral glucose tolerance tests)."
            type="neutral"
            recommendation="Statistical probability must not replace clinical venous blood tests or direct evaluation by a certified physician."
            source="CDC BRFSS Model Pipeline Metadata"
          />
        </div>
      </div>
    </PageContainer>
  );
}

