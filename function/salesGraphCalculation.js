async function entireOrderCalculation(salesData, type) {
    /*

when we have entire order, we don't need to calculate anything, just return the data as it is
    */
    try {


        const graphCoordinates = [];

        if (!Array.isArray(salesData) || salesData.length === 0) {
            console.log("Invalid or empty salesData array");
            return {}
        }

        if (type == "single") {

        } else {

            for (const element of salesData) {
                var x = new Date(element.orderDate)
                var y = element.totalAmount
                var object = [x, y];

                graphCoordinates.push(object)
            }
        }

        console.log("data returned for graph", graphCoordinates)
        return graphCoordinates;



    }
    catch (e) {
        console.log("error in calculatedData",);
        return {};
    }


}
module.exports = entireOrderCalculation;