
function formatDateWithOrdinal(dateString) {
    // Parse the date
    var date = new Date(dateString);

    // Define ordinal indicators
    var ordinalIndicators = ["th", "st", "nd", "rd"];

    // Get the day of the month
    var day = date.getDate();

    // Determine the correct ordinal indicator
    var ordinalIndicator = (day % 10 > 3 || day > 20) ? ordinalIndicators[0] : ordinalIndicators[day % 10];

    // Get the day of the week
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfWeek = days[date.getDay()];

    // Format the date using toLocaleDateString
    var formattedDate = date.toLocaleDateString('en-US', { month: 'long' });

    // Return the formatted parts separately
    return {
        dayOfWeek,
        month: formattedDate,
        day,
        ordinalIndicator,
        year: date.getFullYear()
    };
}

function Convert({ dateString }) {
    const { dayOfWeek, month, day, ordinalIndicator, year } = formatDateWithOrdinal(dateString);

    return (
        <h6>
            {dayOfWeek}, {month} {day}<sup>{ordinalIndicator}</sup>, {year}
        </h6>
    );
}

export default Convert;
