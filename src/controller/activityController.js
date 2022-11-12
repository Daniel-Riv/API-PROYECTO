const activitySchema = require('../models/activity');
const matterSchema = require('../models/matter');

const createActivity = async (req, res) => {
    const {name, description, dateStart, dateEnd, gradeActivity,idMatter} = req.body;
    try {
        const valdiaMatter = await matterSchema.findById({_id: idMatter});
        if(!valdiaMatter){
            return res.status(400).json({
                success: false,
                message: 'Matter is required'
            });
        }
        const newActivity = new activitySchema({name, description, dateStart, dateEnd, gradeActivity,matter: idMatter});
        await newActivity.save();
        return res.status(200).json({
            success: true,
            message: 'Activity created', 
            newActivity});
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to create activity', 
            error
        });
    }
}

module.exports = {
    createActivity
}