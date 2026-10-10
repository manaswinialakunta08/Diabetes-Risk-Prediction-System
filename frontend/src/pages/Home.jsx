import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  BookOpen,
  CheckCircle,
  FileSpreadsheet,
  Cpu,
  Heart,
  Stethoscope,
  ChevronRight,
  Users,
} from 'lucide-react';
import Button from '../components/common/Button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF2FA]/50 via-white to-white pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-mist border border-navy-soft text-navy-primary text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-pulse"></span>
                <span>Powered by CDC BRFSS Epidemiological Dataset</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F36] tracking-tight leading-[1.15]">
                Clinical-Grade Diabetes Risk Intelligence & Population Analytics
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Evaluate your personalized metabolic risk factors using machine learning models
                trained on 253,000+ CDC health survey records. Non-invasive, transparent, and
                engineered for actionable preventative health decisions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/predict" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full sm:w-auto text-base"
                  >
                    Start Health Assessment
                  </Button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                    Explore Features
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#2A9D8F]" />
                  <span>21 Certified CDC Features</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
                  <span>No Personal Data Sold</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Production ML Classifier</span>
                </div>
              </div>
            </div>

            {/* Right Column: Analytics Interface Preview Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-navy-soft to-teal-accent/20 rounded-2xl blur-lg opacity-70"></div>

                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-6 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <span className="text-xs font-mono font-medium text-slate-400 ml-1">
                        DiaRisk Analysis Engine v2.4
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Model Ready
                    </span>
                  </div>

                  {/* Visual Risk Metric Mockup */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Evaluated Stratification
                      </span>
                      <span className="text-xs font-bold text-navy-deep">Survey BRFSS 2015</span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xl font-extrabold text-navy-deep">Low Risk (84.2%)</div>
                        <div className="text-xs text-slate-500">Binary Classifier Prediction: 0</div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        Optimal
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2A9D8F] h-full rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>

                  {/* Sample Indicator Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px]">BMI Index</div>
                      <div className="font-bold text-slate-800">24.2 kg/m² (Normal)</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px]">Blood Pressure</div>
                      <div className="font-bold text-emerald-700">Normotensive</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px]">Physical Activity</div>
                      <div className="font-bold text-emerald-700">Active (≥150 min)</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px]">Cholesterol</div>
                      <div className="font-bold text-slate-800">Checked & Normal</div>
                    </div>
                  </div>

                  {/* Micro Disclaimer */}
                  <div className="text-[10px] text-slate-400 text-center pt-1">
                    Simulated model preview. All live assessments conform strictly to CDC BRFSS schemas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F] mb-2">
              Core Capabilities
            </h2>
            <h3 className="text-3xl font-extrabold text-navy-deep tracking-tight">
              Evidence-Based Health Analytics Designed for Clarity
            </h3>
            <p className="mt-3 text-base text-slate-600">
              Transforming complex epidemiological health survey data into intuitive, actionable risk
              intelligence for clinicians and proactive patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-navy-mist flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-deep mb-2">
                ML-Powered Risk Modeling
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Supervised classification algorithms trained specifically on the 21 CDC BRFSS survey
                features to identify subtle non-linear diabetes risk correlations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-navy-mist flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-deep mb-2">
                21 Health Indicators
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive survey coverage spanning anthropometric indices, cardiovascular history,
                lifestyle habits, and socioeconomic access factors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-navy-mist flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-deep mb-2">
                Interactive Health Analytics
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Visual dashboards with BMI categorization, lifestyle vs risk comparisons, and
                historical tracking across sequential health evaluations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-navy-mist flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-deep mb-2">
                Preventative Guidance
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Contextual educational summaries translating statistical indices into actionable
                lifestyle improvements and clinical discussion points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFC] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F] mb-2">
              Assessment Workflow
            </h2>
            <h3 className="text-3xl font-extrabold text-navy-deep tracking-tight">
              Four Transparent Steps from Survey to Insight
            </h3>
            <p className="mt-3 text-base text-slate-600">
              A structured evaluation process designed to respect patient privacy and provide immediate
              clinical transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-xl bg-navy-primary text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                  01
                </span>
                <h4 className="text-base font-bold text-navy-deep mb-2">
                  Enter Health Indicators
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Provide your survey metrics across four organized sections: Demographics, Medical
                  History, Lifestyle Behaviors, and Healthcare Access.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                Time: ~2 minutes
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-xl bg-[#2A9D8F] text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                  02
                </span>
                <h4 className="text-base font-bold text-navy-deep mb-2">
                  Analyze Survey Profile
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The system validates and maps input features against the trained machine learning
                  model pipeline without exposing sensitive identities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                Inference: Immediate
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-xl bg-navy-primary text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                  03
                </span>
                <h4 className="text-base font-bold text-navy-deep mb-2">
                  Review Risk Category
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Inspect the predicted risk class (Low Risk vs Positive Diabetes Risk), along with
                  identifiable epidemiological contributing factors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                Format: Transparent Report
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-xl bg-[#2A9D8F] text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                  04
                </span>
                <h4 className="text-base font-bold text-navy-deep mb-2">
                  Explore Analytics Dashboard
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Examine BMI category benchmarks, self-reported health distributions, and
                  preventative lifestyle insights in your dedicated dashboard.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                Interactive Recharts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose & Intended Audience Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#142B4A] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/20">
                <Users className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>Audience & Purpose</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                Designed for Preventative Healthcare & Portfolio Excellence
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                This system bridges non-invasive survey-based screening with modern data science. It is
                tailored for health researchers, clinical analysts, and individuals seeking structured
                understanding of modifiable metabolic risk indicators prior to formal clinical diagnosis.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/predict">
                  <Button variant="teal" size="md">
                    Launch Risk Questionnaire
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="md" className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                    View Health Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

