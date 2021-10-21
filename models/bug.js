const mongoose = require("mongoose")

const Bug = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    capture: {
        type: String,
    },
    isResolved:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bug', Bug)