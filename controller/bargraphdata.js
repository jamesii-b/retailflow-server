const { returnDaySum, returnHourSum } = require("../function/orderDateCalculations")



// no longer a route
// its a function
// returns the data divided on basis of entire hour and entire day

/*
{
totalAmount:xxx,
date:xxx,
}*/

async function arrangedData(dataInitialized, timeframe) {
    // timeframe = req.params.timeframe
    // console.log(getymd())
    // console.log(new Date(Date.now()))

    if (timeframe == "hour") {

        hourBasisData = await returnHourSum(dataInitialized)
        hourBasisData.sort((a, b) => a.date - b.date);
        // console.log(hourBasisData)
        return hourBasisData
    }

    // 1st iteration ma afnai garyo

    else if (timeframe == "day") {
        dayBasisData = await returnDaySum(dataInitialized)
        return dayBasisData
    }
    // res.json("ok")
}

module.exports = arrangedData;
