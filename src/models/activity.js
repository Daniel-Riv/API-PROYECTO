const {Schema,model} = require('mongoose');

const activitySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    gradeActivity: {type: Number, required: true, default: 0},
    matter: {type: Schema.Types.ObjectId, ref: 'Matter'},
}, {timestamps: true});

module.exports = model('Activity', activitySchema);