const db = require("../config/db.config");
const User = db.User;

// Module File System de Node.js
const fs = require("fs");

/**
 * Nous la méthode findOne() dans notre modèle User pour trouver le User unique ayant le même _id que le paramètre de la requête ;
 * ce User est ensuite retourné dans une Promise et envoyé au front-end ;
 * si aucun User n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
 */
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((User) => res.status(200).json(User))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * La méthode destroy() de notre modèle fonctionne comme findOne() et updateOne()
 * dans le sens où nous lui passons un objet correspondant au document à supprimer.
 * Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.
 * nous utilisons l'ID que nous recevons comme paramètre pour accéder au User correspondant dans la base de données ;
 * nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
 * nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
 * dans le callback, nous implémentons la logique d'origine, en supprimant le User de la base de données.
 */
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        res
          .status(401)
          .json({ message: "seul le propriétaire du compte peut l'effacer" });
      } else {
        // const filename = user.imageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
          User.destroy({ where: { id: req.params.id }, force: true })
            .then(() => res.status(200).json({ message: "Compte supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        // });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
