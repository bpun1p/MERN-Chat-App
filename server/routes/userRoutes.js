const express = require('express')
const { loginUser, registerUser, updateUser, logoutUser } = require('../controller/userController')
const validateAuth = require('../middleware/validateAuth')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

router.use(validateAuth)

router.post('/logout', logoutUser)
router.patch('/update', updateUser)

module.exports = router