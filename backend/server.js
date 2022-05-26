// Import des modules
const express = require("express");
const cors = require("cors");
// import module node pour accéder au path de notre serveur
const path = require("path");

// import de la connexion à la DB
const db = require("./config/db.config");

// Initialisation de l'API
const app = express();

// Middlewares
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// vérification Front de la bonne communication avec le serveur
app.get("/", (req, res) => res.send(`I'm online. All is OK !`));

// Démarrage du serveur avec test de la bd
db.sequelize
  .authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log(
        `This server is running on port ${PORT} !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));

// import des routes principales
const authsRoutes = require("./routes/auths.routes");
const usersRoutes = require("./routes/users.routes");
const publicationsRoutes = require("./routes/publications.routes");
const commentsRoutes = require("./routes/comments.routes");

// La route pour accéder au dossier images
app.use("/images", express.static(path.join(__dirname, "images")));
// la route pour l'authentification
app.use("/api/auth", authsRoutes);
// La route des users
app.use("/api/users", usersRoutes);
// La route des publications
app.use("/api/publications", publicationsRoutes);
// La route des commentaires
app.use("/api/publications/:id/comments", commentsRoutes);