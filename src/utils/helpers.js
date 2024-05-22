/** Takes in number to format to USD currency
 * @param {Number} value The value to format to USD
 * @returns {String}
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

/** Takes in date string to format. Example outputted format: "Apr 24, 11:42 PM"
 * @param {String} dateStr String that follows ```toISOString()``` output: YYYY-MM-DDTHH:mm:ss.sssZ
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

/** Takes in a date string and returns the number of minutes left from current time to the time specified in the date string
 * @param {String} dateStr String that follows ```toISOString()``` output: YYYY-MM-DDTHH:mm:ss.sssZ
 * @returns {Number}
 */
export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
