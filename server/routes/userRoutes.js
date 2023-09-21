const express = require('express')
const { getAllUsers } = require('../controller/usersController')
const tokenValidator = require('../middleware/tokenValidator')

const router = express.Router()

router.use(tokenValidator)
router.get('/getAllUsers', getAllUsers)

module.exports = router