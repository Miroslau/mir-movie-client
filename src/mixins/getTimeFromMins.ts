import moment from "moment";

export const getTimeFromMins = (min: number): string => {
  if (min >= 24 * 60 || min < 0) {
    throw new RangeError(
      "Valid input should be greater than or equal to 0 and less than 1440"
    );
  }

  const hours = (min / 60) | 0;
  const mins = min % 60 | 0;

  return moment.utc().hours(hours).minutes(mins).format("hh:mm");
};
