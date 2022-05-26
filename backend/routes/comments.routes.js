const express = require("express");
// création du router
const router = express.Router();
// Importation du middleware d'authentification
const auth = require('../middleware/auth');
// Importation du middleware Multer
const multer = require('../middleware/multer-config');
// importation des controllers
const commentsCtrl = require('../controllers/comments.controller');

// Les routes sur la ressource Comment
router.post("/", auth, multer, commentsCtrl.createComment); 

// router.put("/:id", auth, multer, commentsCtrl.modifyComment);

router.delete("/:id", auth, commentsCtrl.deleteComment);

router.get("/:id", auth, commentsCtrl.getOneComment);

router.get("/", auth, commentsCtrl.getAllComments);

// router.post('/:id/like', auth, commentsCtrl.likeComment);

module.exports = router;