const mongoose = require('mongoose');

const Event = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
        endTime: {
            type: String,
            required: false,
        },
        location: {
            locationName: { type: String, required: false },
            GPSX: { type: Number, required: false },
            GPSY: { type: Number, required: false },
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        creator: { 
            email: {type: String, required: false},
            name: {type: String, required: false},
        },
        colors:{
            primary: { type: String, required: false },
            secondary: { type: String, required: false },
            background: { type: String, required: false },
        }
    },
    { collection: 'event-data' }
)

const model = mongoose.model('EventData', Event)

module.exports = model
