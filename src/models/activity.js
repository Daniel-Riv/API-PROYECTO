const {Shema,model} = require('mongoose');

const activitySchema = new Shema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    gradeActivity: {type: Number, required: true, default: 0},
    matter: {type: Shema.Types.ObjectId, ref: 'Matter'},
}, {timestamps: true});

module.exports = model('Activity', activitySchema);