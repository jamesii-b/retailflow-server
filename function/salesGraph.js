async function calculateData(salesData) {

    const graphData = {
        coordinates: [],
        maxX: 0,
        minX: 0,
        maxY: 0,
        minY: 0,
    }

    var maxX = new Date(salesData[0].orderDate).getTime()
    var minX = new Date(salesData[0].orderDate).getTime()
    var maxY = salesData[0].totalAmount
    var minY = salesData[0].totalAmount
    for (const element of salesData) {
        var x = new Date(element.orderDate).getTime()
        var y = element.totalAmount
        var object = {
            x, y
        }
        if (x > parseInt(maxX)) {
            maxX = x
        }
        if (x < parseInt(minX)) {
            minX = x
        }
        if (parseInt(y) > parseInt(maxY)) {
            maxY = y
        }
        if (parseInt(y) < parseInt(minY)) {
            minY = y
        }
        console.log(object)
        console.log("object")
        graphData.coordinates.push(object);
        graphData.maxX = maxX;
        graphData.maxY = maxY;
        graphData.minY = minY;
        graphData.minX = minX;
    }
    return graphData;


}
module.exports = calculateData;