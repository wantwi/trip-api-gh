const config = require("../config/config.js");

const { Sequelize, DataTypes } = require("sequelize");

 const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);



//authenticate connection
sequelize
  .authenticate()
  .then((e) => {
    console.log("connect", { e });
  })
  .catch((err) => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.people = require("./peopleModel.js")(sequelize, DataTypes);
db.user = require("./userModel.js")(sequelize, DataTypes);


db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sync completed");
  })
  .catch((err) => console.log(err));

module.exports = db;

