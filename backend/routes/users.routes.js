const express = require("express");
// création du router
const router = express.Router();
// Importation du middleware d'authentification
const auth = require('../middleware/auth');

// importation des controllers
const usersCtrl = require('../controllers/users.controllers');
// les routes
router.get("/:id", auth, usersCtrl.getOneUser);



module.exports = router;