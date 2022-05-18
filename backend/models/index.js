const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");

// parametrage de la BD
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// connexion à la BD
sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// lien entre le modèle et la BD SQL
db.users = require("./user.model.js")(sequelize, DataTypes);
db.publications = require("./publication.model.js")(sequelize, DataTypes);
db.comments = require("./comment.model.js")(sequelize, DataTypes);


// A activer en prod
// db.sequelize.sync({ force: false })
// .then(() => {
//     console.log('yes re-sync done!')
// })

// A activer en dev
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;
