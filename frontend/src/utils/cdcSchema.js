/**
 * CDC BRFSS Diabetes Health Indicators Dataset (BRFSS 2015)
 * Official 21-feature schema, encodings, and clinical survey definitions.
 */

export const AGE_CATEGORIES = [
  { value: 1, label: '18 to 24 years old', shortLabel: '18–24' },
  { value: 2, label: '25 to 29 years old', shortLabel: '25–29' },
  { value: 3, label: '30 to 34 years old', shortLabel: '30–34' },
  { value: 4, label: '35 to 39 years old', shortLabel: '35–39' },
  { value: 5, label: '40 to 44 years old', shortLabel: '40–44' },
  { value: 6, label: '45 to 49 years old', shortLabel: '45–49' },
  { value: 7, label: '50 to 54 years old', shortLabel: '50–54' },
  { value: 8, label: '55 to 59 years old', shortLabel: '55–59' },
  { value: 9, label: '60 to 64 years old', shortLabel: '60–64' },
  { value: 10, label: '65 to 69 years old', shortLabel: '65–69' },
  { value: 11, label: '70 to 74 years old', shortLabel: '70–74' },
  { value: 12, label: '75 to 79 years old', shortLabel: '75–79' },
  { value: 13, label: '80 years of age or older', shortLabel: '80+' },
];

export const GEN_HEALTH_CATEGORIES = [
  { value: 1, label: '1 - Excellent', description: 'Optimal physical and mental vitality' },
  { value: 2, label: '2 - Very Good', description: 'High vitality with negligible health impediments' },
  { value: 3, label: '3 - Good', description: 'Moderate general health, minor manageable symptoms' },
  { value: 4, label: '4 - Fair', description: 'Frequent fatigue or chronic mild symptoms' },
  { value: 5, label: '5 - Poor', description: 'Significant persistent health limitations' },
];

export const EDUCATION_CATEGORIES = [
  { value: 1, label: 'Never attended school or kindergarten only' },
  { value: 2, label: 'Grades 1 through 8 (Elementary)' },
  { value: 3, label: 'Grades 9 through 11 (Some High School)' },
  { value: 4, label: 'Grade 12 or GED (High School Graduate)' },
  { value: 5, label: 'College 1 to 3 years (Some College or Technical School)' },
  { value: 6, label: 'College 4 years or more (College Graduate / Degree)' },
];

export const INCOME_CATEGORIES = [
  { value: 1, label: 'Tier 1: Less than $10,000' },
  { value: 2, label: 'Tier 2: $10,000 to < $15,000' },
  { value: 3, label: 'Tier 3: $15,000 to < $20,000' },
  { value: 4, label: 'Tier 4: $20,000 to < $25,000' },
  { value: 5, label: 'Tier 5: $25,000 to < $35,000' },
  { value: 6, label: 'Tier 6: $35,000 to < $50,000' },
  { value: 7, label: 'Tier 7: $50,000 to < $75,000' },
  { value: 8, label: 'Tier 8: $75,000 or greater' },
];

export const SEX_CATEGORIES = [
  { value: 0, label: 'Female' },
  { value: 1, label: 'Male' },
];

export const BINARY_OPTIONS = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Yes' },
];

/**
 * Default empty state for the 21 CDC features form
 */
export const DEFAULT_FORM_VALUES = {
  // Section A: Basic Information
  Age: 5, // 40-44 years default
  Sex: 0,
  BMI: 25,
  GenHlth: 2,

  // Section B: Medical History
  HighBP: 0,
  HighChol: 0,
  CholCheck: 1,
  Stroke: 0,
  HeartDiseaseorAttack: 0,
  DiffWalk: 0,

  // Section C: Lifestyle
  Smoker: 0,
  PhysActivity: 1,
  Fruits: 1,
  Veggies: 1,
  HvyAlcoholConsump: 0,

  // Section D: Healthcare & Additional
  AnyHealthcare: 1,
  NoDocbcCost: 0,
  MentHlth: 0,
  PhysHlth: 0,
  Education: 5,
  Income: 6,
};

/**
 * Expected feature keys in model sequence
 */
export const CDC_FEATURE_KEYS = [
  'HighBP',
  'HighChol',
  'CholCheck',
  'BMI',
  'Smoker',
  'Stroke',
  'HeartDiseaseorAttack',
  'PhysActivity',
  'Fruits',
  'Veggies',
  'HvyAlcoholConsump',
  'AnyHealthcare',
  'NoDocbcCost',
  'GenHlth',
  'MentHlth',
  'PhysHlth',
  'DiffWalk',
  'Sex',
  'Age',
  'Education',
  'Income',
];

/**
 * Categorize BMI value according to WHO standards
 */
export function getBmiCategory(bmi) {
  const num = parseFloat(bmi);
  if (isNaN(num) || num <= 0) return { category: 'Invalid', color: 'slate', description: 'N/A' };
  if (num < 18.5) return { category: 'Underweight', color: 'amber', description: 'Below standard nutritional weight' };
  if (num < 25.0) return { category: 'Normal weight', color: 'emerald', description: 'Healthy weight threshold' };
  if (num < 30.0) return { category: 'Overweight', color: 'amber', description: 'Elevated weight index' };
  if (num < 35.0) return { category: 'Obesity Class I', color: 'red', description: 'Moderate risk threshold' };
  if (num < 40.0) return { category: 'Obesity Class II', color: 'red', description: 'Severe risk threshold' };
  return { category: 'Obesity Class III', color: 'red', description: 'Very severe risk threshold' };
}

