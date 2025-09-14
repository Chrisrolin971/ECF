
CREATE DATABASE IF NOT EXISTS ecf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ecf;

-- Table Utilisateurs
CREATE TABLE IF NOT EXISTS Utilisateurs(
                           idUtilisateurs INT AUTO_INCREMENT PRIMARY KEY,
                           nom VARCHAR(255) NOT NULL,
                           prenom VARCHAR(255) NOT NULL,
                           pseudo VARCHAR(255),
                           role INT,
                           email VARCHAR(255) NOT NULL,
                           mdp VARCHAR(255) NOT NULL
);

-- Table Films
CREATE TABLE IF NOT EXISTS films (
                     id INT AUTO_INCREMENT PRIMARY KEY,
                     titre VARCHAR(255),
                     duree INT, -- en minutes
                     genre VARCHAR(255),
                     description TEXT,
                     note FLOAT, -- sur 5
                     image_url VARCHAR(255), -- lien vers l'affiche
                     date_sortie DATE,
                     coeur BOOLEAN DEFAULT FALSE
);

-- Table des séances
CREATE TABLE IF NOT EXISTS seances (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     film_id INT NOT NULL,
                                     cinema VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  heure TIME NOT NULL,
  langue VARCHAR(50),
  qualite VARCHAR(50),
  FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
  );


-- Table Salles
CREATE TABLE IF NOT EXISTS Salles (
                                    idSalles INT AUTO_INCREMENT PRIMARY KEY,
                                    nomSalle VARCHAR(255) NOT NULL,
  capacite INT NOT NULL
  );

-- Table Cinema
CREATE TABLE IF NOT EXISTS Cinema (
  idCinema INT AUTO_INCREMENT PRIMARY KEY,
  villeCinema VARCHAR(255) NOT NULL,
  );

-- Table Reservations
CREATE TABLE IF NOT EXISTS Reservations (
                                          idReservations INT AUTO_INCREMENT PRIMARY KEY,
                                          idUtilisateurs INT NOT NULL,
                                          idFilms INT NOT NULL,
                                          idSalles INT NOT NULL,
                                          NbPlaces INT NOT NULL,
                                          idCinema INT NOT NULL,
                                          Sieges VARCHAR(255) NOT NULL,
  jour DATE NOT NULL,
  heureDeb DATETIME NOT NULL,
  heureFin DATETIME,
  FOREIGN KEY (idUtilisateurs) REFERENCES Utilisateurs(idUtilisateurs),
  FOREIGN KEY (idFilms) REFERENCES Films(idFilms),
  FOREIGN KEY (idSalles) REFERENCES Salles(idSalles),
  FOREIGN KEY (idCinema) REFERENCES Cinema(idCinema)
  );

-- Table Qualites
CREATE TABLE IF NOT EXISTS Qualité(
                      idQualites INT AUTO_INCREMENT PRIMARY KEY,
                      Type VARCHAR(255) NOT NULL,
                      prix DECIMAL(15,2) NOT NULL
);

-- Table Defaillances
CREATE TABLE IF NOT EXISTS Defaillances(
                           idDefaut INT AUTO_INCREMENT PRIMARY KEY,
                           typeDefaillance VARCHAR(255) NOT NULL
);

-- Table Avis
CREATE TABLE IF NOT EXISTS Avis(
                   idAvis INT AUTO_INCREMENT PRIMARY KEY,
                   idFilms INT,
                   Note INT NOT NULL,
                   UNIQUE(idFilms)
);
