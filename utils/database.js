const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("pharmacy","root","",{dialect:"mysql", host:"localhost"});

module.exports = sequelize;