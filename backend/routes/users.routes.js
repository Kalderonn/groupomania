const express = require("express");
// création du router
const router = express.Router();
// Importation du middleware d'authentification
const auth = require('../middleware/auth');

// importation des controllers
const usersCtrl = require('../controllers/users.controllers');

// Routage de la ressource User
router.get("/", auth, usersCtrl.getOneUser);
router.delete("/", auth, usersCtrl.deleteUser);
// router.put("/:id", auth, usersCtrl.modifyUser);



module.exports = router;