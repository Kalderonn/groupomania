const db = require("../config/db.config");
const Comment = db.Comment;

// // Module File System de Node.js
// const fs = require("fs");

/**
 * créez une instance de votre modèle Comment en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé
 * Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON.
 * Le corps de la requête contient une chaîne Comment , qui est simplement un objet Comment converti en chaîne.
 * Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
 * Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename .
 * Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
 * Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:4000' ).
 * Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
 * La méthode save() renvoie une Promise.
 * Ainsi, dans notre bloc then() ,nous renverrons une réponse de réussite avec un code 201 de réussite.
 * Dans notre bloc catch(),nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.
 */
exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.comment);
  const url = req.originalUrl;
  const publicationId = url.split("/")[3];
  const comment = new Comment({
    ...commentObject,
    // imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //   req.file.filename
    // }`,
    userId: req.auth.userId,
    publicationId: publicationId,
  });
  comment
    .save()
    .then(console.log(comment))
    .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * La méthode destroy() de notre modèle fonctionne comme findOne() et create()
 * dans le sens où nous lui passons un objet correspondant au document à supprimer.
 * Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.
 * nous utilisons l'ID que nous recevons comme paramètre pour accéder au Comment correspondant dans la base de données ;
 * nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
 * nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
 * dans le callback, nous implémentons la logique d'origine, en supprimant le Comment de la base de données.
 */
 exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
      .then((comment) => {
        console.log(req.auth.userId);
        console.log(req.auth.isAdmin);
  
        if (comment.userId === req.auth.userId || req.auth.isAdmin === true) {
          // const filename = comment.imageUrl.split("/images/")[1];
        //   fs.unlink(`images/${filename}`, () => {
            Comment.destroy({ where: { id: req.params.id }, force: true })
              .then(() =>
                res.status(200).json({ message: "commentaire supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
        //   });
        } else {
          res.status(401).json({
            message:
              "seul le propriétaire de la comment ou l'administrateur peut l'effacer",
          });
        }
      })
      .catch((err) => console.log("Database Error", err));
  };

/**
 * Nous la méthode findOne() dans notre modèle Comment pour trouver le Commentr unique ayant le même _id que le paramètre de la requête ;
 * ce Comment est ensuite retourné dans une Promise et envoyé au front-end ;
 * si aucun User n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
 */
exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * Nous utilisons la méthode findAll() dans notre modèle Comment
 * afin de renvoyer un tableau contenant tous les Comments dans notre base de données.
 */
exports.getAllComments = (req, res, next) => {
  const url = req.originalUrl;
  const publicationId = url.split("/")[3];
  console.log(publicationId)
  Comment.findAll({ where: { publicationId: publicationId }, order: [["createdAt", "DESC"]] })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};
