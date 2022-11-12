const activitySchema = require('../models/activity');
const matterSchema = require('../models/matter');

const createActivity = async (req, res) => {
    const { name, description, dateStart, dateEnd, idMatter } = req.body;
    try {

        const newActivity = new activitySchema({ name, description, dateStart, dateEnd });
        await newActivity.save();

        const valdiaMatter = await matterSchema.findById({ _id: idMatter });
        if (!valdiaMatter) {
            return res.status(400).json({
                success: false,
                message: 'Matter is required'
            });
        }

        const idActivity = newActivity._id;
        const matter = await matterSchema.findByIdAndUpdate(
            { _id: idMatter },
            { $push: { activities: idActivity } },
            { new: true }
        );

        console.log(matter);

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
        const activity = await activitySchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
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

        if (!activities) {
            return res.status(400).json({
                success: false,
                message: 'Activity not found'
            });
        }

        const dateEnd = new Date(activities.dateEnd);
        const dateDiff = dateEnd - date;
        const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) + 1;
        const hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

        const informationExpired = {
            days,
            hours,
            minutes,
            seconds
        };

        if (days === 0) {
            return res.status(200).json({
                success: true,
                message: `La actividad ${activities.name} expira hoy`,
                color: '#39e38e',
                informationExpired
            });
        }

        const messageExpired = `La actividad ${activities.name} expiro hace ${Math.abs(days)} dias, ${Math.abs(hours)} horas, ${Math.abs(minutes)} minutos y ${Math.abs(seconds)} segundos`;

        if (days < 0) {
            return res.status(200).json({
                success: true,
                message: messageExpired,
                color: '#c23838',
                informationExpired
            });
        }

        const messageInformation = `Faltan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos para que la actividad ${activities.name} expire`;

        return res.status(200).json({
            success: true,
            message: messageInformation,
            color: '#39e33e',
            informationExpired
        });

    } catch (error) {
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