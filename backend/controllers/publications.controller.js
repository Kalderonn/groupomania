const db = require("../config/db.config");
const Publication = db.Publication;
const Like = db.Like;
// Module File System de Node.js
const fs = require("fs");

/**
 * créez une instance de votre modèle Publication en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé
 * Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON.
 * Le corps de la requête contient une chaîne Publication , qui est simplement un objet Publication converti en chaîne.
 * Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
 * Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename .
 * Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
 * Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:4000' ).
 * Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
 * La méthode save() renvoie une Promise.
 * Ainsi, dans notre bloc then() ,nous renverrons une réponse de réussite avec un code 201 de réussite.
 * Dans notre bloc catch(),nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.
 */
exports.createPublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.publication);
  const publication = new Publication({
    ...publicationObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    userId: req.auth.userId,
  });
  publication
    .save()
    .then(console.log(publication))
    .then(() => res.status(201).json({ message: "Publication enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * on crée un objet publicationObject qui regarde si req.file existe ou non.
 * S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant.
 * On crée ensuite une instance publication à partir de publicationObject , puis on effectue la modification.
 * 
 * nous exploitons la méthode update() dans notre modèle publication .
 * Cela nous permet de mettre à jour la publication qui correspond à l'objet que nous passons comme premier argument.
 * Nous utilisons aussi le paramètre id passé dans la demande, et le remplaçons par le publication passé comme second argument.
 */
 exports.modifyPublication = (req, res, next) => {
   console.log(req.file)
   const publicationObject = req.file
     ? {
         ...JSON.parse(req.body.publication),
         imageUrl: `${req.protocol}://${req.get("host")}/images/${
           req.file.filename
         }`,
       }
     : { ...JSON.parse(req.body.publication) };
   Publication.findOne({ where: { id: req.params.id } })
     .then((publication) => {
       if (!publication) {
         res.status(404).json({ error: new Error("Cette publication n'existe pas !") });
       }
       if (publication.imageUrl !== null && req.file !== undefined) {
         const filename = publication.imageUrl.split("/images/")[1];
         fs.unlink(`images/${filename}`, () => {
           Publication.update(
             { ...publicationObject, id: req.params.id },
             { where: { id: req.params.id } }
           )
             .then(() =>
               res.status(200).json({ message: "Publication modifiée !" })
             )
             .catch((error) => res.status(400).json({ error }));
         });
       } else {
         Publication.update(
           { ...publicationObject, id: req.params.id },
           { where: { id: req.params.id } }
         )
           .then(() =>
             res.status(200).json({ message: "Publication modifiée !" })
           )
           .catch((error) => res.status(400).json({ error }));
       }
     })
     .catch((error) => res.status(500).json({ error }));
 };
/**
 * La méthode destroy() de notre modèle fonctionne comme findOne() et create()
 * dans le sens où nous lui passons un objet correspondant au document à supprimer.
 * Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.
 * nous utilisons l'ID que nous recevons comme paramètre pour accéder au Publication correspondant dans la base de données ;
 * nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
 * nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
 * dans le callback, nous implémentons la logique d'origine, en supprimant le Publication de la base de données.
 */
exports.deletePublication = (req, res, next) => {
  Publication.findOne({ where: { id: req.params.id } })
    .then((publication) => {
      // console.log(req.auth.userId);
      // console.log(req.auth.isAdmin);

      if (publication.userId === req.auth.userId || req.auth.isAdmin === true) {
        const filename = publication.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Publication.destroy({ where: { id: req.params.id }, force: true })
            .then(() =>
              res.status(200).json({ message: "Publication supprimée !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(401).json({
          message:
            "seul le propriétaire de la publication ou l'administrateur peut l'effacer",
        });
      }
    })
    .catch((err) => console.log("Database Error", err));
};

/**
 * Nous la méthode findOne() dans notre modèle Publication pour trouver le Publicationr unique ayant le même _id que le paramètre de la requête ;
 * ce Publication est ensuite retourné dans une Promise et envoyé au front-end ;
 * si aucun User n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
 */
exports.getOnePublication = (req, res, next) => {
  Publication.findOne({ where: { id: req.params.id } })
    .then((publication) => res.status(200).json(publication))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * Nous utilisons la méthode findAll() dans notre modèle Publication
 * afin de renvoyer un tableau contenant tous les publications dans notre base de données.
 */
exports.getAllPublications = (req, res, next) => {
  Publication.findAll({ order: [["createdAt", "DESC"]] })
    .then((publications) => res.status(200).json(publications))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * nous utilisons la méthode findOne() dans notre modèle like 
 * pour trouver si le userId contenu dans le token est dejà associé à la publication concernée(publicationId contenu dans l'Url) ;
 */
exports.likePublication = (req, res, next) => {
  const userId = req.auth.userId;
  const url = req.originalUrl;
  const publicationId = url.split("/")[3];
  console.log(publicationId);
  console.log(userId);

  Like.findOne({ where: { userId: userId, publicationId: publicationId } })
      .then((like) => {
        if (like) {
          Like
            .destroy({ where: { UserId: userId, publicationId: publicationId } })
            .then(() =>
              res
                .status(200)
                .json({ message: "Vous n'aimez plus cette publication" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          Like
            .create({
              userId: userId,
              publicationId: publicationId,
            })
            .then(() =>
              res.status(200).json({ message: "Vous aimez cette publication" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(500).json(error));
};
