# Architecture

## Project structure

```

ecf/
├── src/
│   ├── app/                 → Composants Angular, services, etc.
│   ├── assets/              → Images, polices, fichiers statiques
│   ├── environments/        → Fichiers de config (dev, prod)
│   ├── templates/           → Templates HTML réutilisables
│   ├── main.ts              → Point d’entrée Angular
│   ├── env.js               → Variables d’environnement JS (si besoin)
│   └── index.html           → Page principale
│
├── backend/                 → Code PHP, API, logique serveur
│   ├── api/
│   └── config/
│
├── database/                → Scripts SQL, exports
│   └── init_db.sql          → création de la Base de données et des tables
│   └── seed.sql             → import des données
│   └── transaction.sql      → Mise à jour des données
│
├── docs/
│   └── architecture.md      → Documentation technique
│
├── node_modules/
│
├── test/
│   └── index.test.js        → Test unitaire du fichier index
│
├── .gitignore
├── package.json             → Dépendances frontend
├── composer.json            → Dépendances PHP (si tu utilises Composer)
└── README.md                → Présentation du projet

