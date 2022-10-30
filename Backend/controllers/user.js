const bcrypt = require('bcrypt')
const db = require('../models')
const crypto = require('crypto')
const { isNull, isError } = require('lodash')
const User = db.User
const UserParent = db.UserParent
const AccessToken = db.AccessToken
const Op = db.Sequelize.Op

const findByTel = async (tel, res, include = []) => {
  const where = {
    tel
  }
  const data = await User.findOne({
    where,
    include
  })
  if (data) {
    return data
  }
  return null
}

const sendMail = async (to, subject, html) => {
  try {
    const mail = await mailer.sendMail({
      from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
      to,
      subject,
      html
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  index: async (req, res, next) => {
    const { q, role } = req.query
    const queryCreateBy = req.user.role == 'admin'? {} : { create_by: req.user.id }
    const force = role
    ? {
      role: role,
    }
    :{
      [Op.or]: [
        { role: 'teacher' },
        { role: 'parent' },
        { role: 'student' },
      ]
    }
    const query = q
      ? {
          [Op.or]: [
            { email: { [Op.like]: `%${q}%` } },
            { firstname: { [Op.like]: `%${q}%` } },
            { lastname: { [Op.like]: `%${q}%` } }
          ]
        }
      : null
    const where = {
      [Op.and]: [queryCreateBy, force, query]
    }
    try {
      const lists = await User.findAll({
        where,
        include: [
          {
            model: AccessToken,
            limit: 1,
            order: [
              ['createdAt', 'desc']
            ],
            attributes: ['ip', 'createdAt']
          }
        ],

      })
      return res.status(200).json(lists)
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  store: async (req, res, next) => {
    const data = req.body
    try {
      data.create_by = req.user.id;
      const newData = await db.sequelize.transaction((t) => {
        return User.create(data, {
          transaction: t
        })
      });
      if(data.parent) {
        await db.sequelize.transaction((t) => {
          return UserParent.create({
            parent_id: data.parent,
            student_id: newData.id
          }, {
            transaction: t
          })
        })
      }
      return res.status(201).json(!isError(newData))
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  show: async (req, res, next) => {
    const id = req.params.id
    try {
      const data = await User.findOne(
        { 
          where: { id: id } , 
          include:[{
            model: UserParent,
            limit: 1,
            attributes: ['parent_id','student_id']
          }],
          attributes: ['id', 'firstname', 'lastname', 'role', 'email','username', 'address','tel']
        }
      )
      return res.status(200).json(data)
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  checkEmail: async (req, res, next) => {
    const data = req.body
    try {
      const where = {
        email: data.email,
        id: {
          [Op.ne]: req.user.id
        }
      }
      const result = await User.findOne({
        where
      })

      return res.status(200).json(!isNull(result))
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  checkTel: async (req, res, next) => {
    const data = req.body
    try {
      const result = await findByTel(data.tel, res)
      return res.status(200).json(!isNull(result))
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  update: async (req, res, next) => {
    const id = req.params.id
    const data = req.body
    if (data.password) {
      const salt = bcrypt.genSaltSync(10)
      data.salt = salt
      data.password = bcrypt.hashSync(data.password, salt)
    }
    try {
      var parent = await UserParent.findOne({ student: id});
      var result = await db.sequelize.transaction((t) => {
        return User.update(
          data,
          {
            where: { id }
          },
          {
            transaction: t
          }
        )
      });

      if( 
        parent && 
        parent.parent_id != data.parent 
      ) {
        await db.sequelize.transaction((t) => {
          return UserParent.update({
            parent_id: data.parent
          }, { 
            where: { id: parent.id }
          }, {
            transaction: t
          })
        });
      } else {
        await db.sequelize.transaction((t) => {
          return UserParent.create({
            parent_id: data.parent,
            student_id: id
          }, {
            transaction: t
          })
        })
      }
      return res.status(201).json(!isError(result))
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  },
  destroy: async (req, res, next) => {
    const id = req.params.id
    try {
      let result = await User.destroy({
        where: {
          id
        }
      })
      return res.status(201).json(!isError(result))
    } catch (e) {
      e.message = 'Cannot get data from database. Error: ' + e
      next(e)
    }
  }
}
