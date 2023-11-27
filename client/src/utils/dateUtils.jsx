import { format, isToday, isYesterday } from "date-fns";

/**
 * Utility function for formatting dates based on different conditions.
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date string.
 */
export const dateFormatter = (date) => {
  if (isToday(date)) {
    return format(date, "h:mm a");
  } else if (isYesterday(date)) {
    return `Yesterday ${format(date, "h:mm a")}`;
  } else {
    return format(date, "MM/dd/yyyy h:mm a");
  }
};
