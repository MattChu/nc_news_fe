export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
    hourCycle: "h24",
    timeZoneName: "shortOffset",
  });
};
