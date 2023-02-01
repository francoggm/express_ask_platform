const sequelize = require('sequelize');
const conn = require('./database');

const Question = conn.define('questions', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

const Response = conn.define('responses', {
    body: {
        type: sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {});
Response.sync({force: false}).then(() => {});

module.exports = {Question, Response}