const activitySchema = require('../models/activity');
const matterSchema = require('../models/matter');

const createActivity = async (req, res) => {
    const { name, description, dateStart, dateEnd, gradeActivity, idMatter } = req.body;
    try {
        const valdiaMatter = await matterSchema.findById({ _id: idMatter });
        if (!valdiaMatter) {
            return res.status(400).json({
                success: false,
                message: 'Matter is required'
            });
        }
        const newActivity = new activitySchema({ name, description, dateStart, dateEnd, gradeActivity, matter: idMatter });
        await newActivity.save();
        return res.status(200).json({
            success: true,
            message: 'Activity created',
            newActivity
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to create activity',
            error
        });
    }
}

const getActivities = async (req, res) => {
    try {
        const activities = await activitySchema.find();
        return res.status(200).json({
            success: true,
            message: 'Activities found',
            activities
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to get activities',
            error
        });
    }
}

const getActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await activitySchema.findById({ _id: id });
        return res.status(200).json({
            success: true,
            message: 'Activity found',
            activity
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to get activity',
            error
        });
    }
}

const updateActivity = async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await activitySchema.findById({ _id: id }, req.body, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Activity updated',
            activity
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to update activity',
            error
        });
    }

}

const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const delet = await activitySchema.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: 'Activity deleted',
            delet
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to delete activity',
            error
        });
    }
}

const dateExpired = async (req, res) => {
    const { id } = req.params;
    try {
        const date = new Date();
        const activities = await activitySchema.findById({ _id: id });
        console.log(activities);
        if (!activities) {
            return res.status(400).json({
                success: false,
                message: 'Activity not found'
            });
        }
        const subtract = date - activities.dateEnd;
        return res.status(200).json({
            success: true,
            message: 'Date expired',
            subtract
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error to get date expired',
            error
        });
    }
}

module.exports = {
    createActivity,
    getActivities,
    getActivity,
    updateActivity,
    deleteActivity,
    dateExpired
}