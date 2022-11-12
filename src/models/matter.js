const { Schema, model } = require('mongoose');

const matterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
        default: 0,
    },
    gradeMax: {
        type: Number,
        required: true,
        default: 5
    },
    gradeMin: {
        type: Number,
        required: true,
        default: 3
    },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }]
}, { timestamps: true });

module.exports = model('Matter', matterSchema);