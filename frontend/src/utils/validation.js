/**
 * Form validation utilities for CDC BRFSS features and authentication
 */

export function validateAssessmentForm(values) {
  const errors = {};

  // BMI
  const bmiNum = parseFloat(values.BMI);
  if (values.BMI === '' || values.BMI === undefined || isNaN(bmiNum)) {
    errors.BMI = 'BMI is required.';
  } else if (bmiNum < 10 || bmiNum > 98) {
    errors.BMI = 'Please enter a plausible BMI value between 10 and 98.';
  }

  // Age
  const ageNum = parseInt(values.Age, 10);
  if (isNaN(ageNum) || ageNum < 1 || ageNum > 13) {
    errors.Age = 'Please select a valid age group (18+).';
  }

  // General Health
  const genHlthNum = parseInt(values.GenHlth, 10);
  if (isNaN(genHlthNum) || genHlthNum < 1 || genHlthNum > 5) {
    errors.GenHlth = 'Please choose a general health rating from 1 (Excellent) to 5 (Poor).';
  }

  // Mental Health Days (0-30)
  const mentNum = parseInt(values.MentHlth, 10);
  if (isNaN(mentNum) || mentNum < 0 || mentNum > 30) {
    errors.MentHlth = 'Must be an integer between 0 and 30 days.';
  }

  // Physical Health Days (0-30)
  const physNum = parseInt(values.PhysHlth, 10);
  if (isNaN(physNum) || physNum < 0 || physNum > 30) {
    errors.PhysHlth = 'Must be an integer between 0 and 30 days.';
  }

  // Education (1-6)
  const eduNum = parseInt(values.Education, 10);
  if (isNaN(eduNum) || eduNum < 1 || eduNum > 6) {
    errors.Education = 'Please select a valid education level.';
  }

  // Income (1-8)
  const incNum = parseInt(values.Income, 10);
  if (isNaN(incNum) || incNum < 1 || incNum > 8) {
    errors.Income = 'Please select an income category.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLoginForm(email, password) {
  const errors = {};
  if (!email || !email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegisterForm(name, email, password, confirmPassword) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

