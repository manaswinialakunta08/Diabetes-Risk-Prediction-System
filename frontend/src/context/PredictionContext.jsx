import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_FORM_VALUES } from '../utils/cdcSchema';
import { predictionService } from '../services/predictionService';

const PredictionContext = createContext(null);

export function PredictionProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    // Preserve draft from localStorage if available
    try {
      const saved = localStorage.getItem('dps_form_draft');
      return saved ? JSON.parse(saved) : DEFAULT_FORM_VALUES;
    } catch {
      return DEFAULT_FORM_VALUES;
    }
  });

  const [latestAssessment, setLatestAssessment] = useState(() => {
    return predictionService.getLatestAssessment();
  });

  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      const history = await predictionService.getAssessmentHistory();
      setAssessmentHistory(history);
    } catch (err) {
      console.error('Failed to load assessment history', err);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Persist draft whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem('dps_form_draft', JSON.stringify(formData));
    } catch (e) {
      console.error('Draft save error', e);
    }
  }, [formData]);

  const updateFormField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateMultipleFields = (fields) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const resetForm = () => {
    setFormData(DEFAULT_FORM_VALUES);
    localStorage.removeItem('dps_form_draft');
  };

  const runPrediction = async (customData = null) => {
    setLoading(true);
    setError(null);
    try {
      const dataToSubmit = customData || formData;
      const result = await predictionService.predict(dataToSubmit);
      setLatestAssessment(result);
      await fetchHistory();
      return result;
    } catch (err) {
      const message = err.message || 'An unexpected error occurred while processing the prediction.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    predictionService.clearHistory();
    setAssessmentHistory([]);
    setLatestAssessment(null);
  };

  const value = {
    formData,
    updateFormField,
    updateMultipleFields,
    resetForm,
    latestAssessment,
    assessmentHistory,
    runPrediction,
    loading,
    error,
    setError,
    fetchHistory,
    clearHistory,
  };

  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>;
}

export function usePrediction() {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
}

