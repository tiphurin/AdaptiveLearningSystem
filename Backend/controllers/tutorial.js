const { Validator } = require("node-input-validator");
const db = require("../models");
const Op = db.Sequelize.Op
const Tutorial = db.Tutorial;

const findByPK = async (id, res, include = []) => {
    const data = await Tutorial.findByPk(id, include);
    if (data) {
        return data;
    }
    res.status(404).json({
        message: "Not Found",
    });
};

module.exports = {
    inputValidate: async (req, res, next) => {
        const v = new Validator(req.body, Tutorial.inputSchema);
        const matched = await v.check();
        if (matched) {
            next();
        } else {
            res.status(400).json({
                message: "Bad request." + v.errors,
            });
        }
    },
    index: async (req, res, next) => {
        const { q } = req.query
        const query = q
        ? {
            [Op.or]: [
                { name: { [Op.like]: `%${q}%` } }
            ]
        }
        : null
        const where = {
            [Op.and]: [query]
          }
        try {
            const lists = await Tutorial.findAll({
                where
            })
            return res.status(200).json(lists)
        } catch (e) {
            e.message = 'Cannot get data from database. Error: ' + e
            next(e)
        }
    },
    show: async (req, res, next) => {
        const id = req.params.id
        try {
            const data = await findByPk(id, res)
            return res.status(200).json(data)
        } catch (e) {
            e.message = 'Cannot get data from database. Error: ' + e
            next(e)
        }
    },
    store: async (req, res, next) => {
        const data = req.body
        
    },
    update: async (req, res, next) => {
        const data = req.body
        
    },
    destroy: async (req, res, next) => {
        const id = req.params.id
        
    },
};
