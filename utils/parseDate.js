async function returnDate(queryTime) {
    const [startDateStr, endDateStr] = queryTime.split('to');
    const startDateComponents = startDateStr.split('_');
    startDate = parseDate(startDateComponents)
    try {

        const endDateComponents = endDateStr.split('_');
        endDate = parseDate(endDateComponents)
    }
    catch (err) {
        endDate = new Date()
    }
    return [startDate, endDate]
}
function parseDate(comp) {
    // 1 reduced as month indexed through 0
    const date = new Date(comp[0], comp[1] - 1, comp[2]);
    return date;
}

module.exports = { returnDate, parseDate }