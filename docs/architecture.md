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
│
├── docs/
│   ├── architecture.md      → Documentation technique
│   └── README.md            → Présentation du projet
│
├── .gitignore
├── package.json             → Dépendances frontend
├── composer.json            → Dépendances PHP (si tu utilises Composer)
└── README.md

