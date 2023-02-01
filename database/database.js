const sequelize = require("sequelize");
const conn = new sequelize('questions', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

conn
    .authenticate()
    .then(() => {
        console.log("Connected!");
    })
    .catch((err) => {
        console.log("Error in connection -> " + err);
    });

module.exports = conn;