const router = require('express').Router();
const controller = require('./controller');

router.get('/get-all', controller.getAll);
router.post('/post', controller.post)

module.exports = router;