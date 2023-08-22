const express = require('express')
const { loginUser, registerUser, updateUser } = require('../controller/userController')
const validateAuth = require('../middleware/validateAuth')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

router.use(validateAuth)

router.patch('/update', updateUser)

module.exports = router