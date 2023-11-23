import { format, isToday, isYesterday } from "date-fns";

const useDateFormatter = (date) => {
  if (isToday(date)) {
    return format(date, "h:mm a");
  } else if (isYesterday(date)) {
    return "Yesterday " + format(date, "h:mm a");
  } else {
    return format(date, "MM/dd/yyyy h:mm a");
  }
};

export default useDateFormatter;
