const {Router} = require('express');
const {createActivity,
    getActivities,
    getActivity,
    updateActivity,
    deleteActivity,
    dateExpired} = require('../controller/activityController');

const router = Router();

router.post('/createa', createActivity);
router.get('/get', getActivities);
router.get('/get/:id', getActivity);
router.put('/update/:id', updateActivity);
router.delete('/delete/:id', deleteActivity);
router.get('/date/:id', dateExpired);


module.exports = router;