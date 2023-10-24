async function calculateData(salesData) {

    const graphData = {
        coordinates: [],
        maxX: 0,
        minX: 0,
        maxY: 0,
        minY: 0,
    }

    var maxX = new Date(salesData[0].orderDate).getTime();
    var minX = new Date(salesData[0].orderDate).getTime();
    var maxY = salesData[0].totalAmount
    var minY = salesData[0].totalAmount
    for (const element of salesData) {
        var x = new Date(salesData[0].orderDate).getTime();
        var y = element.totalAmount
        var object = {
            x, y
        }
        if (element.orderDate > maxX) {
            maxX = element.orderDate
        }
        if (element.orderDate < minX) {
            minX = element.orderDate
        }
        if (element.totalAmount > maxY) {
            maxY = element.totalAmount
        }
        if (element.totalAmount < minY) {
            minY = element.totalAmount
        }
        graphData.coordinates.push(object);
        graphData.maxX = maxX;
        graphData.maxY = maxY;
        graphData.minY = minY;
        graphData.minX = minX;
    }

    return graphData;


}
module.exports = calculateData;