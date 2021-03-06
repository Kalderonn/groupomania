# OpenClassrooms / Web Developer

## Groupomania: Créer un réseau social

## Instructions

- Créer un dossier vide et cloner ce repository à l'intérieur:

```bash
git clone https://github.com/Kalderonn/groupomania.git
```

- Vous verrez deux dossiers distincts: frontend et backend.

## DANS LE DOSSIER FRONTEND

- depuis le terminal (/frontend):

```bash 
npm install
```

- puis une fois l'installation terminée:

```bash
npm run serve
```

Vous aurez un message similaire à celui-ci :

```bash
App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.109:8080/
  ```

## MySQL

Importez la base de données fournie avec les livrables

## DANS LE DOSSIER BACKEND

- Ouvrez le fichier " .env.exemple " : vous devez assigner des valeurs aux variables suivantes:

```bash
DB_USERNAME = 
DB_PASSWORD =

CRYPTOJS_EMAIL = 
JWT_KEY_TOKEN = 
```

- DB_USERNAME = votre nom d'utilisateur pour votre base de données.
- DB_PASSWORD = votre mot de passe pour votre base de données.
- CRYPTOJS_EMAIL = variable de votre choix.
- JWT_KEY_TOKEN = variable de votre choix.


- Renommer ce dossier " .env " à la place de " .env.exemple ".

- Depuis le terminal (/backend)

```bash
npm install
```

- puis une fois l'installation terminée:

```bash
npm run dev
```

## DANS LE NAVIGATEUR

- Ouvrez votre navigateur à l'adresse: http://localhost:8080/

- Vous voyez l'écran de connexion à l'application. Bonne navigation :)

- Pour vous connecter en tant qu'administrateur, utilisez les identifiants de connexion fournis dans les livrables. 