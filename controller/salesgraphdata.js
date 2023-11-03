const axios = require("axios")
const arrangedData = require("./bargraphdata")
async function salesGraphData(req, res) {

    //sales data of required
    resData = await axios.get("http://localhost:5000/sales/special/1day")

    // console.log("data being sent to arrange", resData.data)
    actualData = await arrangedData(resData.data, "hour")
    console.log("data after arragnge", actualData)

    // how to access the amount and date inside of actaulData


    const graphData = {
        coordinates: [],
        //x date
        //y amount
        maxX: 0,
        minX: 0,
        maxY: 0,
        minY: 0,
    }
    if (actualData.length === 0) {
        res.json({})
        return
    }
    let maxX = new Date(actualData[0].date).getUTCHours()
    let minX = new Date(actualData[0].date).getUTCHours()
    let maxY = actualData[0].amount
    let minY = actualData[0].amount
    let object = {}
    actualData.forEach(element => {
        tempX = new Date(element.date)
        console.log(tempX)
        const x = tempX.getUTCHours()
        console.log("x here", x)
        var y = element.amount
        object = {
            x, y
        }
        if (x > maxX) {
            maxX = x
        }
        if (x < minX) {
            minX = x
        }
        if (parseInt(y) > parseInt(maxY)) {
            maxY = y
        }
        if (parseInt(y) < parseInt(minY)) {
            minY = y
        }
        console.log(element.amount)
        graphData.coordinates.push(object);
    });
    graphData.maxX = maxX;
    graphData.maxY = maxY;
    graphData.minY = minY;
    graphData.minX = minX;

    console.log(graphData)



    res.json(graphData)
}
module.exports = salesGraphData