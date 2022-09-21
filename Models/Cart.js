const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Cart = sequelize.define("cart",{
    email:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    productid:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
    
});

module.exports = Cart;
