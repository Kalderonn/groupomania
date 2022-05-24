const db = require("../config/db.config");
const Publication = db.Publication;

// Module File System de Node.js
const fs = require("fs");

/**
 * créez une instance de votre modèle Publication en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé
 * Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON.
 * Le corps de la requête contient une chaîne Publication , qui est simplement un objet Publication converti en chaîne.
 * Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
 * Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename .
 * Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
 * Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ).
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
      if (publication.userId !== req.auth.userId) {
        res
          .status(401)
          .json({ message: "seul le propriétaire de la publication peut l'effacer" });
      } else {
        const filename = publication.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
        Publication.destroy({ where: { id: req.params.id }, force: true})
          .then(() => res.status(200).json({ message: "Publication supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((err) => console.log("Database Error", err));
};
