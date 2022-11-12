const matterSchema = require('../models/matter');

const createMatter = async (req, res) => {
    const { name } = req.body;
    try {
        const newMatter = new matterSchema({ name });
        await newMatter.save();
        return res.status(200).json({
            success: true,
            message: 'Matter created',
            newMatter
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to create matter',
            error
        });
    }
}

const getMatters = async (req, res) => {
    try {
        const matters = await matterSchema.find();
        return res.status(200).json({
            success: true,
            message: 'Matters found',
            matters
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to get matters',
            error
        });
    }
}

const getMatter = async (req, res) => {
    const { id } = req.params;
    try {
        const matter = await matterSchema.findById({ _id: id });
        return res.status(200).json({
            success: true,
            message: 'Matter found',
            matter
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to get matter',
            error
        });
    }
}

const updateMatter = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const matter = await matterSchema.findByIdAndUpdate(id, {
            name
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Matter updated',
            matter
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to update matter',
            error
        });
    }
}

const deleteMatter = async (req, res) => {
    const { id } = req.params;
    try {
        await matterSchema.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Matter deleted'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error to delete matter',
            error
        });
    }
}

module.exports = {
    createMatter,
    getMatters,
    getMatter,
    updateMatter,
    deleteMatter
}