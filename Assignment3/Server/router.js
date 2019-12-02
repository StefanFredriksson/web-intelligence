const router = require('express').Router()
const { handleFrequency } = require('./Controllers/frequencyController')

router.get('/', handleFrequency)

module.exports = router
