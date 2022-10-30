const { Validator } = require("node-input-validator");
const { isError } = require('lodash')
const db = require("../models");
const EvoluationTool = db.EvoluationTool;
const EvoluationQuestion = db.EvoluationQuestion;
const EvoluationChoice = db.EvoluationChoice;
const EvoluationLog = db.EvoluationLog;
const { col } = db.Sequelize

module.exports = {
    inputValidate: async (req, res, next) => {
        const v = new Validator(req.body, EvoluationTool.inputSchema);
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
            const data = await EvoluationTool.findAll({
                where: {
                    is_delete: false
                }
            });
            return res.status(200).json(data);
        } catch (e) {
            e.message = "Cannot get data from database. Error: " + e;
            next(e);
        }
    },
    show: async (req, res, next) => {
        try {
            const id = req.params.id
            let data = await EvoluationTool.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: EvoluationLog,
                    limit: 1
                },{
                    model: EvoluationQuestion,
                    include: [{
                        model: EvoluationChoice,
                    }],
                }],
            });
            
            for (let EvoluationQuestion of data.EvoluationQuestions) {
                EvoluationQuestion.EvoluationChoices.sort(
                    (a, b) => parseFloat(a.id) - parseFloat(b.id)
                );
            }
            return res.status(200).json(data);
        } catch (e) {
            e.message = "Cannot get data from database. Error: " + e;
            next(e);
        }
    },
    store: async (req, res, next) => {
        const {
            name,
            description,
            questions
        } = req.body
        try {
            let result = await saveData(
                name,
                description,
                questions,
                req
            );
            return res.status(201).json(!isError(result))
        } catch (e) {
            e.message = e
            next(e)
        }
    },
    update: async (req, res, next) => {
        const id = req.params.id;
        const {
            name,
            description,
            questions
        } = req.body
        try {
            const data = await EvoluationTool.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: EvoluationQuestion,
                    include: [{
                        model: EvoluationChoice,
                    }],
                }],
            });
            for (const EvoluationQuestion of data.EvoluationQuestions) {
                for (const EvoluationChoice of EvoluationQuestion.EvoluationChoices) {
                    await EvoluationChoice.destroy({
                        where: {
                          id: EvoluationChoice.id
                        }
                    });
                }
                await EvoluationQuestion.destroy({
                    where: {
                      id: EvoluationQuestion.id
                    }
                });
            }
            await EvoluationTool.destroy({
                where: {
                  id: data.id
                }
            });

            let result = await saveData(
                name,
                description,
                questions,
                req
            );
            return res.status(201).json(!isError(result))
        } catch (e) {
            e.message = "Cannot update data from database.";
            next(e);
        }
    },
    destroy: async (req, res, next) => {
        const id = req.params.id
        try {
          let result = await EvoluationTool.update({
            is_delete: true
          },{
            where: {
              id
            }
          })
          return res.status(201).json(!isError(result))
        } catch (e) {
          e.message = 'Cannot get data from database. Error: ' + e
          next(e)
        }
    },
};

saveData = async (name, description, questions, req) => {
    try {
        const newData = await db.sequelize.transaction((t) => {
            return EvoluationTool.create({
                name: name,
                description: description,
                user_id: req.user.id
            }, {
                transaction: t
            })
        });
    
        for (const question of questions) {
            const choices = question.choices;
            let new_question = await EvoluationQuestion.create({
                question: question.question,
                evoluation_tool_id: newData.id
            });
            for (const choice of choices) {
                await EvoluationChoice.create({
                    choice: choice.choice,
                    evoluation_question_id: new_question.id,
                    score: choice.score
                });
            }
        };

        return newData;
    } catch (error) {
        return error;
    }
}
