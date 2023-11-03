const Order = require("../models/order");
async function specialRequests(req, res) {
    if (req.params.timedivision == "1day") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp);
        currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 1);
        console.log(currentTimestamp);
        console.log(previousTimeStamp);
        const dateQuery = {
            orderDate: currentTimestamp > previousTimeStamp ? { $gte: previousTimeStamp, $lte: currentTimestamp } : { $gte: currentTimestamp, $lte: previousTimeStamp },
        };
        try {
            const resData = await Order.find({ ...dateQuery }).sort({orderDate:-1}).exec();
            res.json(resData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }



    } else if (req.params.timedivision == "7day") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp)
        currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 7)
        // console.log(currentTimestamp)
        // console.log(previousTimeStamp)
        const dateQuery = {
            orderDate: currentTimestamp > previousTimeStamp ? { $gte: previousTimeStamp, $lte: currentTimestamp } : { $gte: currentTimestamp, $lte: previousTimeStamp },
        };
        try {
            const resData = await Order.find({ ...dateQuery });
            res.json(resData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }

    }
    else if (req.params.timedivision == "30day") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp)
        currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 30)
        console.log(currentTimestamp)
        console.log(previousTimeStamp)
        const dateQuery = {
            orderDate: currentTimestamp > previousTimeStamp ? { $gte: previousTimeStamp, $lte: currentTimestamp } : { $gte: currentTimestamp, $lte: previousTimeStamp },
        };
        try {
            const resData = await Order.find({ ...dateQuery });
            res.json(resData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }


    } else if (req.params.timedivision == "6month") {
        const currentTimestamp = new Date();
        const previousTimeStamp = new Date(currentTimestamp)
        previousTimeStamp.setUTCMonth(currentTimestamp.getUTCMonth() - 6)
        console.log(currentTimestamp)
        console.log(previousTimeStamp)
        const dateQuery = {
            orderDate: currentTimestamp > previousTimeStamp ? { $gte: previousTimeStamp, $lte: currentTimestamp } : { $gte: currentTimestamp, $lte: previousTimeStamp },
        };
        try {
            const salesData = await Order.find({ ...dateQuery });
            res.json(salesData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }


    }
}

module.exports = specialRequests 