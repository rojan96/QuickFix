const Sequelize = require('sequelize');
const sequelize = require('../config/database')

//creating a User model to reigter in database
const User = sequelize.define('User', {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
      }
  }, {
    // options
  });

  module.exports = User;