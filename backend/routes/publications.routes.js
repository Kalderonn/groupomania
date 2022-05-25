const express = require("express");
// création du router
const router = express.Router();
// Importation du middleware d'authentification
const auth = require('../middleware/auth');
// Importation du middleware Multer
const multer = require('../middleware/multer-config');
// importation des controllers
const publicationsCtrl = require('../controllers/publications.controller');

// Les routes sur la ressource publication
router.post("/", auth, multer, publicationsCtrl.createPublication); 

// router.put("/:id", auth, multer, publicationsCtrl.modifyPublication);

router.delete("/:id", auth, publicationsCtrl.deletePublication);

router.get("/:id", auth, publicationsCtrl.getOnePublication);

// router.get("/", auth, publicationsCtrl.getAllpublications);

// router.post('/:id/like', auth, publicationsCtrl.likePublication);

module.exports = router;