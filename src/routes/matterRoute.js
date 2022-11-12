const {Router} = require('express');
const {createMatter,
        getMatters,
        getMatter,
        updateMatter,
        deleteMatter} = require('../controller/matterController');

const router = Router();

router.post('/create', createMatter);
router.get('/get', getMatters);
router.get('/get/:id', getMatter);
router.put('/update/:id', updateMatter);
router.delete('/delete/:id', deleteMatter);

module.exports = router;