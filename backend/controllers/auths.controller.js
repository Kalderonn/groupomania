// importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");
// importation de crypto-js pour chiffrer le mail
const cryptojs = require("crypto-js");
// importation de jsonwebtoken pour l'autorisation
const jwt = require("jsonwebtoken");

const db = require("../config/db.config");
const User = db.User;

/**
 * nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois.
 * il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
 * dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données
 * en renvoyant une réponse de réussite en cas de succès,
 * et des erreurs avec le code d'erreur en cas d'échec.
 */
 exports.signup = (req, res, next) => {
    // chiffrer l'email avant de l'envoyer dans la base BD
    const emailCryptoJs = cryptojs
      .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
      .toString();
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // ce qui va etre enregistré dans mongoDB
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: emailCryptoJs,
          password: hash,
          imageProfileUrl: req.body.imageProfileUrl,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) =>
            res.status(400).json({
              error
            })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  };
  
  /**
   * nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données :
   * dans le cas contraire, nous renvoyons une erreur 401 Unauthorized ,
   * si l'e-mail correspond à un utilisateur existant, nous continuons ;
   * nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données :
   * s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized et un message « Mot de passe incorrect ! »,
   * s'ils correspondent, les informations d'identification de notre utilisateur sont valides.
   * Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token.
   * nous utilisons la fonction sign() de jsonwebtoken pour encoder un nouveau token ;
   * ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token) ;
   * nous utilisons JWT_KEY_TOKEN pour encoder notre token
   * nous définissons la durée de validité du token à 24 heures
   * nous renvoyons le token au front-end avec notre réponse
   */
  exports.login = (req, res, next) => {
    // chiffrer l'email de la requete
    const emailCryptoJs = cryptojs
      .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
      .toString();
    User.findOne({ where: { email: emailCryptoJs }})
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                `${process.env.JWT_KEY_TOKEN}`,
                {
                  expiresIn: "24h",
                }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };