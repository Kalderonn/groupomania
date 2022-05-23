// Import de sequelize
const { Sequelize, DataTypes } = require("sequelize");

// parametrage de la BD
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    // operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.sequelize = sequelize;

// lien entre le modèle et la BD SQL
db.User = require("../models/user.model")(sequelize, DataTypes);
db.Publication = require("../models/publication.model")(sequelize, DataTypes);
db.Comment = require("../models/comment.model")(sequelize, DataTypes);

db.User.hasMany(db.Publication)
db.User.hasMany(db.Comment)

db.Publication.belongsTo(db.User)
db.Publication.hasMany(db.Comment)

db.Comment.belongsTo(db.User)
db.Comment.belongsTo(db.Publication)

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
