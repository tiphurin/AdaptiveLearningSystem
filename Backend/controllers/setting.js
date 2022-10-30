const { Validator } = require("node-input-validator");
const db = require("../models");
const Setting = db.Setting;

const findByPK = async (res, include = []) => {
    const data = await Setting.findByPk(1, { include, attributes: { exclude: ["id", "createdAt", "updatedAt"] } });
    if (data) {
        return data;
    }
    res.status(404).json({
        message: "Not Found",
    });
};

module.exports = {
    inputValidate: async (req, res, next) => {
        const v = new Validator(req.body, Setting.inputSchema);
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
        try {
            const data = await findByPK(res);
            res.json(data);
        } catch (e) {
            e.message = "Cannot get data from database. Error: " + e;
            next(e);
        }
    },
    update: async (req, res, next) => {
        const data = req.body
        if (['admin'].includes(req.user.role)) {
          try {
            await db.sequelize.transaction(async (t) => {
              return await Setting.update(
                data, {
                  where: {
                    id: 1
                  }
                }, {
                  transaction: t
                        }
                    );
                });
                res.json(data);
            } catch (e) {
                e.message = "Cannot update data from database.";
                next(e);
            }
        } else {
            res.status(403).json({
                message: "Forbidden.",
            });
        }
    },
};
