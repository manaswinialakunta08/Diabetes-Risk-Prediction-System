import { apiClient } from './api';
import { CDC_FEATURE_KEYS } from '../utils/cdcSchema';

const STORAGE_KEY_LATEST = 'dps_latest_assessment';
const STORAGE_KEY_HISTORY = 'dps_assessment_history';
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== 'false';

/**
 * Format and sanitize the 21 CDC input features
 */
export function formatPayload(formData) {
  const payload = {};
  CDC_FEATURE_KEYS.forEach((key) => {
    payload[key] = Number(formData[key] ?? 0);
  });
  return payload;
}

/**
 * Deterministic CDC BRFSS Logistic Risk Simulator
 * Used ONLY when backend is offline in development mode.
 * Clearly marked as mock data in all UI views.
 */
function simulateCdcPrediction(payload) {
  // Approximate empirical weights from CDC BRFSS diabetes research
  let logOdds = -4.2;

  if (payload.HighBP === 1) logOdds += 1.35;
  if (payload.HighChol === 1) logOdds += 0.95;
  if (payload.Stroke === 1) logOdds += 0.45;
  if (payload.HeartDiseaseorAttack === 1) logOdds += 0.85;
  if (payload.DiffWalk === 1) logOdds += 0.75;
  if (payload.Smoker === 1) logOdds += 0.25;
  if (payload.PhysActivity === 0) logOdds += 0.4;
  if (payload.Fruits === 0) logOdds += 0.15;
  if (payload.Veggies === 0) logOdds += 0.15;
  if (payload.HvyAlcoholConsump === 1) logOdds -= 0.1; // paradoxically lower in survey

  // BMI impact (baseline 25)
  const bmiDelta = Math.max(0, payload.BMI - 25);
  logOdds += bmiDelta * 0.085;

  // GenHlth impact (1 to 5)
  logOdds += (payload.GenHlth - 1) * 0.42;

  // Age impact (1 to 13)
  logOdds += (payload.Age - 1) * 0.18;

  // Physical and mental health days
  logOdds += payload.PhysHlth * 0.015;
  logOdds += payload.MentHlth * 0.008;

  // Sigmoid
  const probability = 1 / (1 + Math.exp(-logOdds));
  const prediction = probability >= 0.45 ? 1 : 0;

  // Key contributing factors
  const contributingFactors = [];
  if (payload.BMI >= 30) contributingFactors.push(`High Body Mass Index (${payload.BMI})`);
  if (payload.HighBP === 1) contributingFactors.push('Diagnosed High Blood Pressure');
  if (payload.HighChol === 1) contributingFactors.push('High Blood Cholesterol');
  if (payload.GenHlth >= 4) contributingFactors.push('Suboptimal General Health Rating');
  if (payload.Age >= 8) contributingFactors.push('Age group (55+) increased epidemiological risk');
  if (payload.PhysActivity === 0) contributingFactors.push('Sedentary lifestyle (no past 30-day physical activity)');

  return {
    prediction,
    label: prediction === 1 ? 'High Risk for Diabetes / Pre-diabetes' : 'Low Risk for Diabetes',
    probability: Math.round(probability * 1000) / 1000,
    riskLevel: probability > 0.65 ? 'High Risk' : probability > 0.35 ? 'Moderate Risk' : 'Low Risk',
    contributingFactors,
    modelName: 'CDC BRFSS Survey Logistic Model (Development Simulated)',
    isMock: true,
    assessmentDate: new Date().toISOString(),
    inputs: payload,
  };
}

export const predictionService = {
  /**
   * Submit health indicators to prediction endpoint
   */
  async predict(formData) {
    const payload = formatPayload(formData);

    try {
      const response = await apiClient('/predict', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      // Normalize backend response
      const normalizedResult = {
        prediction: response.prediction,
        label:
          response.label ||
          (response.prediction === 1
            ? 'High Risk for Diabetes / Pre-diabetes'
            : 'Low Risk for Diabetes'),
        probability:
          typeof response.probability === 'number'
            ? Math.round(response.probability * 1000) / 1000
            : response.confidence || null,
        riskLevel:
          response.risk_level ||
          (response.probability ? (response.probability > 0.6 ? 'High Risk' : response.probability > 0.35 ? 'Moderate Risk' : 'Low Risk') : (response.prediction === 1 ? 'High Risk' : 'Low Risk')),
        contributingFactors: response.contributing_factors || response.top_features || [],
        modelName: response.model_version || response.model_name || 'Production ML Pipeline',
        isMock: false,
        assessmentDate: response.timestamp || new Date().toISOString(),
        inputs: payload,
      };

      this.saveToHistory(normalizedResult);
      return normalizedResult;
    } catch (err) {
      if (USE_MOCK_FALLBACK && (err.status === 0 || err.status === 404)) {
        console.warn(
          '[DPS Mock Mode] Backend unavailable at /predict. Providing simulated CDC model assessment with explicit mock flag.'
        );
        const simulated = simulateCdcPrediction(payload);
        this.saveToHistory(simulated);
        return simulated;
      }
      throw err;
    }
  },

  /**
   * Get latest recorded assessment
   */
  getLatestAssessment() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LATEST);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Get all past assessments recorded locally or from backend
   */
  async getAssessmentHistory() {
    try {
      const response = await apiClient('/assessments', { method: 'GET' });
      if (Array.isArray(response)) return response;
      if (Array.isArray(response?.assessments)) return response.assessments;
    } catch {
      // fallback to local storage
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Persist assessment record locally
   */
  saveToHistory(assessment) {
    try {
      localStorage.setItem(STORAGE_KEY_LATEST, JSON.stringify(assessment));

      const existingRaw = localStorage.getItem(STORAGE_KEY_HISTORY);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];

      const recordWithId = {
        id: 'asm_' + Date.now(),
        ...assessment,
      };

      const updated = [recordWithId, ...existing.slice(0, 19)]; // Keep recent 20
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save assessment locally', e);
    }
  },

  /**
   * Clear local assessment records
   */
  clearHistory() {
    localStorage.removeItem(STORAGE_KEY_LATEST);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  },
};

