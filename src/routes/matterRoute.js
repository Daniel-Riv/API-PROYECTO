const {Router} = require('express');
const {createMatter,
        getMatters,
        getMatter,
        updateMatter,
        deleteMatter,
        partialGrade} = require('../controller/matterController');

const router = Router();

router.post('/create', createMatter);
router.get('/get', getMatters);
router.get('/get/:id', getMatter);
router.put('/update/:id', updateMatter);
router.delete('/delete/:id', deleteMatter);
router.get('/partial/:id', partialGrade);

module.exports = router;