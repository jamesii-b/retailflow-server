const mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
    sID: {
        type: String,
        required: true
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

const DebitSchema = new mongoose.Schema({
    sID: {
        type: String,
        required: true
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
Credit = mongoose.model('Credit', CreditSchema);
Debit = mongoose.model('Debit', DebitSchema);
module.exports = { Credit, Debit }