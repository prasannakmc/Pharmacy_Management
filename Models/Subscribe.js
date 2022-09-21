const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Subscribe = sequelize.define("subscribe",{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    message:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Subscribe;