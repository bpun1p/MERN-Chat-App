const express = require('express');
const {loginUser, registerUser, updateUser} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;