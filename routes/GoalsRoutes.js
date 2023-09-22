const express = require('express')
const router = express.Router()
// const protectRoute = require('../middleWare/authMiddleWare')
const {getUserData} = require('../controllers/DummyDataController')

router.get('/',getUserData)


module.exports = router