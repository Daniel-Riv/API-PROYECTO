const {Router} = require('express');
const {createActivity} = require('../controller/activityController');

const router = Router();

router.post('/createa', createActivity);


module.exports = router;