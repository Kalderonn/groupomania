// importation d'express
const express = require("express");
// importation du middleware password pour vérifier la force du mot de passe
const password = require("../middleware/password");
// importation du middleware de controle de l'email
const email = require("../middleware/email");
// création du router
const router = express.Router();

const usersCtrl = require("../controllers/auths.controller");

router.post("/signup", password, email, usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;
