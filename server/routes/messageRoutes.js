const express = require('express');
const { getSelectedUserMessages } = require('../controller/messagesController');
const tokenValidator = require('../middleware/tokenValidator');

const router = express.Router();

router.use(tokenValidator);

router.get('/:userId', getSelectedUserMessages);

module.exports = router;
