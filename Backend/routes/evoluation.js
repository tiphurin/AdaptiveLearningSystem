const express = require('express')
const { evoluationController } = require('../controllers')

const passport = require('../config/passport')
const { checkBody, checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/evoluations'

router.get(`${path}/`, passport.authenticate('bearer', { session: false }) ,evoluationController.index)
router.get(`${path}/:id`, passport.authenticate('bearer', { session: false }) ,evoluationController.show)
router.post(`${path}/`, passport.authenticate('bearer', { session: false }) , checkBody ,evoluationController.store)
router.put(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkBody, evoluationController.inputValidate, evoluationController.update)
router.delete(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, evoluationController.destroy)

module.exports = router
