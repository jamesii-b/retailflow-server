const mongoose = require('mongoose');

const CandDschema = new mongoose.Schema({
    sID: {
        type: String,
        required: true
    },
    accounting: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        default: 'bankTransfer',
    },
    createdTime: {
        type: Date,
        default: Date.now()
    },
    datedOn: {
        type: Date,
        required: true,
    }

})
module.exports = mongoose.model('CreditandDebit', CandDschema);