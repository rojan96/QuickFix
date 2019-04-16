const Sequelize = require('sequelize');

//connecting to database
const sequelize = new Sequelize('QuickFix', 'root', '*******', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

//checking the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;
