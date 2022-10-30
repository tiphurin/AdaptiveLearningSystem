const express = require('express')
const { tutorialController } = require('../controllers')

const passport = require('../config/passport')
const { checkBody, checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/tutorials'

router.get(`${path}/`, passport.authenticate('bearer', { session: false }), tutorialController.index)
router.get(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, tutorialController.show)
router.post(`${path}/`, passport.authenticate('bearer', { session: false }), tutorialController.store)
router.put(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, checkBody, tutorialController.update)
router.delete(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, tutorialController.destroy)

module.exports = router
