const crypto = require('crypto')
const bcrypt = require('bcrypt')
const dayjs = require('dayjs')
const db = require('../models')
const { MailVerify,MailResetPassword } = require('../config/mailer')
const { genUserCode } = require('../helper/userManager')

const Op = db.Sequelize.Op
const User = db.User
const AccessToken = db.AccessToken

const findByResetPasswordToken = async (passwordResetToken, res, include = []) => {
  const where = {
    password_reset_token: passwordResetToken,
    password_reset_expire_at: {
      [Op.gte]: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  }
  const data = await User.findOne({
    where,
    include
  })
  return data || res.status(404).json({
    message: 'Not Found'
  })
}
const findByEmail = async (email, res, include = []) => {
  const where = {
    email
  }
  const data = await User.findOne({
    where,
    include
  })
  return data || res.status(404).json({
    message: 'Not Found'
  })
}

const createUser = async (data, res) => {
  try {
    return await db.sequelize.transaction((t) => {
      return User.create(data, {
        transaction: t
      })
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Cannot store data to database.' + e
    })
  }
}
const updateUser = async (id, data, res) => {
  try {
    return await db.sequelize.transaction((t) => {
      return User.update(
        data, {
          where: {
            id
          }
        }, {
          transaction: t
        }
      )
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Cannot store data to database.' + e
    })
  }
}
const newAccessToken = async (userId, req, res) => {
  try {
    return await db.sequelize.transaction((t) => {
      return AccessToken.create({
        user_id: userId,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      }, {
        transaction: t
      })
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Cannot store data to database.' + e
    })
  }
}

module.exports = {
  signup: async (req, res) => {
    let data = req.body
    data.password_created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
    data = await createUser(data, res)
    const updateData = {
      code: genUserCode(data.id)
    };
    await updateUser(data.id, updateData, res)
    return res.status(201).json(data)
  },
  forgotPassword: async (req, res, next) => {
    const body = req.body
    try {
      const data = await findByEmail(body.email, res)
      const passwordResetToken = crypto.randomBytes(16).toString('hex')
      const updateData = {
        password_reset_token: passwordResetToken,
        password_reset_expire_at: dayjs().add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      }
      await updateUser(data.id, updateData, res)
      await MailResetPassword(
        data.email,
        passwordResetToken
      );
      return res.status(204).send()
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  checkPasswordToken: async (req, res, next) => {
    const body = req.body
    try {
      await findByResetPasswordToken(body.token, res)
      return res.status(204).send()
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  resetPassword: async (req, res, next) => {
    const token = req.params.token
    const body = req.body
    try {
      const data = await findByResetPasswordToken(token, res)
      const salt = bcrypt.genSaltSync(10)
      const updateData = {
        salt,
        password: bcrypt.hashSync(body.password, salt),
        password_reset_expire_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      if (!data.password_created_at) {
        updateData.password_created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      if (!data.verify_at) {
        updateData.verify_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      await updateUser(data.id, updateData, res)
      return res.status(204).send()
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  login: async (req, res, next) => {
    if (req.user) {
      try {

        if(
          req.user.role == 'student' &&
          (!req.user.is_teacher_estimate || !req.user.is_parent_estimate)
        ) {
          return res.status(200).json({
            message: "User not active. Please contact your Teacher."
          })
        }
        const newRefreshToken = crypto.randomBytes(32).toString('hex')
        const updateData = {
          refresh_token: newRefreshToken,
          refresh_token_expire_at: dayjs().add(10, 'hours').format('YYYY-MM-DD HH:mm:ss')
        }
        await updateUser(req.user.id, updateData, res)

        const accessToken = await newAccessToken(req.user.id, req, res)
        return res.status(200).json({
          access_token: accessToken.access_token,
          refresh_token: newRefreshToken
        })
      } catch (e) {
        next(e)
      }
    } else {
      return res.status(403).json({
        message: 'Forbidden, this email has not been verified.'
      })
    }
  },
  token: async (req, res, next) => {
    const refreshToken = req.body.refresh_token
    if (refreshToken) {
      try {
        const refresh = await User.findOne({
          where: {
            refresh_token: refreshToken,
            refresh_token_expire_at: {
              [Op.gte]: dayjs().format('YYYY-MM-DD HH:mm:ss')
            }
          }
        })
        if (refresh) {
          const accessToken = await newAccessToken(refresh.id, req, res)
          return res.status(200).json({
            access_token: accessToken.access_token
          })
        }
      } catch (e) {
        return res.status(401).json({
          message: 'Unauthorized' + e
        })
      }
    }
    return res.status(400).json({
      message: 'Bad request'
    })
  },
  me: (req, res) => {
    return res.status(200).json({
      user: req.user
    })
  },
  updateProfile: async (req, res, next) => {
    const data = req.body
    try {
      await updateUser(req.user.id, data, res)
    } catch (e) {
      next(e)
    }
    return res.status(204).send()
  },
  updatePassword: async (req, res, next) => {
    const body = req.body
    try {
      const data = await findByEmail(req.user.email, res)
      if (!data.password_created_at || (!!data.password_created_at && data.validPassword(body.old_password))) {
        const salt = bcrypt.genSaltSync(10)
        const updateData = {
          salt,
          password: bcrypt.hashSync(body.password, salt)
        }
        if (!data.password_created_at) {
          updateData.password_created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        await updateUser(data.id, updateData, res)
        return res.status(204).send()
      }
      return res.status(401).json({
        message: 'Unauthorized'
      })
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  logout: async (req, res, next) => {
    try {
      const updateData = {
        refresh_token: null,
        refresh_token_expire_at: null
      }
      await updateUser(req.user.id, updateData, res)
    } catch (e) {
      next(e)
    }
    return res.status(204).send()
  }
}
