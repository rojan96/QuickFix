const Sequelize = require('sequelize');

//connecting to database
const sequelize = new Sequelize(/*'database', 'username', 'password',*/ {
  host: 'localhost',
  dialect: 'mysql'
});

//checking the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    module.exports = sequelize;
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });