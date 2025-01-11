// common/utils.js

/**
 * Format a date string (YYYY-MM-DD) into something more user-friendly (e.g. "Sep 01, 2023").
 * This is just an example function.
 */
export function formatDate(isoDate) {
  if (!isoDate) return '';
  const dateObj = new Date(isoDate);
  if (isNaN(dateObj.getTime())) return isoDate; // if invalid date
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return dateObj.toLocaleDateString(undefined, options);
}

/**
 * Validate an email address is in basic format (placeholder logic).
 */
export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/; // simplistic check
  return re.test(email);
}

/**
 * Basic name formatting: capitalizes first letter of each word.
 */
export function formatName(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Example function to calculate a progress percentage
 * (e.g., for a user's progress in a Pathway).
 */
export function calculateProgress(completed, total) {
  if (!total || total <= 0) return 0;
  const percent = (completed / total) * 100;
  return Math.min(Math.max(percent, 0), 100).toFixed(2);
}
