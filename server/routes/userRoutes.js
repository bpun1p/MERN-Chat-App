const express = require('express')
const { loginUser, registerUser, updateUser, logoutUser } = require('../controller/userController')
const tokenValidator = require('../middleware/tokenValidator')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

router.use(tokenValidator)

router.post('/logout', logoutUser)
router.patch('/update', updateUser)

module.exports = router