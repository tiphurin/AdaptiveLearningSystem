const express = require('express')
const { userController } = require('../controllers')

const passport = require('../config/passport')
const { checkBody, checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/users'

router.get(`${path}/`, passport.authenticate('bearer', { session: false }), userController.index)
router.get(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, userController.show)
router.post(`${path}-email-check`, passport.authenticate('bearer', { session: false }), userController.checkEmail)
router.post(`${path}-tel-check`, passport.authenticate('bearer', { session: false }), userController.checkTel)
router.post(`${path}/`, passport.authenticate('bearer', { session: false }), userController.store)
router.put(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, checkBody, userController.update)
router.delete(`${path}/:id`, passport.authenticate('bearer', { session: false }), checkParamId, userController.destroy)

module.exports = router
