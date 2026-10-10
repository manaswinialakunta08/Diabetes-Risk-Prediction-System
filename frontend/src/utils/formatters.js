import {
  AGE_CATEGORIES,
  EDUCATION_CATEGORIES,
  GEN_HEALTH_CATEGORIES,
  INCOME_CATEGORIES,
  SEX_CATEGORIES,
} from './cdcSchema';

/**
 * Format timestamp to human readable date string
 */
export function formatDateTime(isoString) {
  if (!isoString) return 'Not recorded';
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return isoString;
  }
}

/**
 * Get human readable Age label
 */
export function formatAge(val) {
  const item = AGE_CATEGORIES.find((a) => a.value === Number(val));
  return item ? item.label : `Age code ${val}`;
}

/**
 * Get short human readable Age label
 */
export function formatAgeShort(val) {
  const item = AGE_CATEGORIES.find((a) => a.value === Number(val));
  return item ? item.shortLabel : `${val}`;
}

/**
 * Get human readable General Health label
 */
export function formatGenHlth(val) {
  const item = GEN_HEALTH_CATEGORIES.find((g) => g.value === Number(val));
  return item ? item.label : `Health rating ${val}`;
}

/**
 * Get human readable Education label
 */
export function formatEducation(val) {
  const item = EDUCATION_CATEGORIES.find((e) => e.value === Number(val));
  return item ? item.label : `Education code ${val}`;
}

/**
 * Get human readable Income label
 */
export function formatIncome(val) {
  const item = INCOME_CATEGORIES.find((i) => i.value === Number(val));
  return item ? item.label : `Income tier ${val}`;
}

/**
 * Get human readable Sex label
 */
export function formatSex(val) {
  const item = SEX_CATEGORIES.find((s) => s.value === Number(val));
  return item ? item.label : 'Unknown';
}

/**
 * Format binary yes/no indicator
 */
export function formatBinary(val) {
  return Number(val) === 1 ? 'Yes' : 'No';
}

