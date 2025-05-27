function formatDateWithOrdinal(dateString) {
  var date = new Date(dateString);
  var ordinalIndicators = ["th", "st", "nd", "rd"];
  var day = date.getDate();
  var ordinalIndicator =
    day % 10 > 3 || day > 20
      ? ordinalIndicators[0]
      : ordinalIndicators[day % 10];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[date.getDay()];
  var formattedDate = date.toLocaleDateString("en-US", { month: "long" });
  return {
    dayOfWeek,
    month: formattedDate,
    day,
    ordinalIndicator,
    year: date.getFullYear(),
  };
}

export default formatDateWithOrdinal;
