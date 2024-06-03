export const areDatesInSameWeek = (date1: Date, date2: Date): boolean => {
  // Clone the dates to avoid mutating the original date objects
  const d1 = new Date(date1.getTime());
  const d2 = new Date(date2.getTime());

  // Adjust the dates to the start of their respective weeks (Monday)
  d1.setDate(d1.getDate() - ((d1.getDay() + 6) % 7));
  d2.setDate(d2.getDate() - ((d2.getDay() + 6) % 7));

  // Set the time to midnight to compare dates only
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  // Compare the adjusted dates
  return d1.getTime() === d2.getTime();
};
