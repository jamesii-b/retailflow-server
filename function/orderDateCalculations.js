const { areDatesEqual, areHourEqual } = require("../utils/date");

async function returnDaySum(Data) {

    /*
    EG
    It sums the entire day into one
    {2023:10-30 : amt}
    {2023-10-31 : amt}
    */


    finalData = []
    for (let outside = 0; outside < Data.length; outside++) {
        // as the array is spliced, so the gap will be empty 
        outside = 0;
        const innerLength = Data.length;
        let totalAmount = 0;
        let counter = 0;
        let spliced = false;
        for (let inside = outside; inside < innerLength; inside++) {

            if (spliced) {
                counter++;
                index = inside - counter;
            } else {

                index = inside - counter;
            }
            spliced = false;
            if (areDatesEqual(Data[index].orderDate, Data[outside].orderDate)) {
                totalAmount += parseFloat(Data[index].totalAmount);
                if (inside != outside) {
                    Data.splice(index, 1)
                    spliced = true;
                }
            }
        }
        toPush = {
            amount: totalAmount,
            date: new Date(Data[outside].orderDate),
        }
        Data.splice(outside, 1)
        finalData.push(toPush)
    }
    return finalData

}


async function returnHourSum(Data) {
    finalData = []
    for (let outside = 0; outside < Data.length; outside++) {
        // as the array is spliced, so the gap will be empty 
        outside = 0;
        const innerLength = Data.length;
        let totalAmount = 0;
        let counter = 0;
        let spliced = false;
        for (let inside = outside; inside < innerLength; inside++) {

            if (spliced) {
                counter++;
                index = inside - counter;
            } else {

                index = inside - counter;
            }
            spliced = false;
            if (areHourEqual(Data[index].orderDate, Data[outside].orderDate)) {
                totalAmount += parseFloat(Data[index].totalAmount);
                if (inside != outside) {
                    Data.splice(index, 1)
                    spliced = true;
                }
            }
        }
        toPush = {
            amount: totalAmount,
            date: new Date(Data[outside].orderDate),
        }
        Data.splice(outside, 1)
        finalData.push(toPush)
    }
    return finalData

}
module.exports = { returnDaySum, returnHourSum };
