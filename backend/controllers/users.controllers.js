const db = require("../config/db.config");
const User = db.User;

/**
 * Nous la méthode findOne() dans notre modèle User pour trouver le User unique ayant le même _id que le paramètre de la requête ;
 * ce User est ensuite retourné dans une Promise et envoyé au front-end ;
 * si aucun User n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
 */
 exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then((User) => res.status(200).json(User))
      .catch((error) => res.status(404).json({ error }));
  };