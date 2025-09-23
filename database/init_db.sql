
CREATE DATABASE IF NOT EXISTS ecf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ecf;

-- Table Utilisateurs
CREATE TABLE IF NOT EXISTS Utilisateurs(
                           idUtilisateurs INT AUTO_INCREMENT PRIMARY KEY,
                           nom VARCHAR(255) NOT NULL,
                           prenom VARCHAR(255) NOT NULL,
                           pseudo VARCHAR(255),
                           role VARCHAR(20),
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

-- Table Cinema
CREATE TABLE IF NOT EXISTS Cinema (
                                    idCinema INT AUTO_INCREMENT PRIMARY KEY,
                                    villeCinema VARCHAR(255) NOT NULL,
  );

-- Table qui relie les films aux cinémas
CREATE TABLE IF NOT EXISTS FilmCinema (
                                        idFilm INT,
                                        idCinema INT,
                                        PRIMARY KEY (idFilm, idCinema),
  FOREIGN KEY (idFilm) REFERENCES films(id),
  FOREIGN KEY (idCinema) REFERENCES Cinema(idCinema)
  );

-- Table des séances
CREATE TABLE IF NOT EXISTS seances (
                                     idSeance INT AUTO_INCREMENT PRIMARY KEY,
                                     film_id INT NOT NULL,
                                     cinema_id INT NOT NULL,
                                     date DATE NOT NULL,
                                     heure TIME NOT NULL,
                                     langue VARCHAR(50),
                                     salle_id INT NOT NULL,
                                     FOREIGN KEY (film_id) REFERENCES films(idFilms) ON DELETE CASCADE,
                                     FOREIGN KEY (cinema_id) REFERENCES cinema(idCinema) ON DELETE CASCADE,
                                     FOREIGN KEY (salle_id) REFERENCES salles(idSalles) ON DELETE CASCADE,
  );

-- Table Salles
CREATE TABLE IF NOT EXISTS salles (
                                    idSalles INT PRIMARY KEY AUTO_INCREMENT,
                                    nomSalle VARCHAR(255),
                                    capacite INT DEFAULT 100,
                                    idCinema INT,
                                    idQualite INT,
                                    FOREIGN KEY (idCinema) REFERENCES cinema(idCinema) ON DELETE CASCADE
                                    FOREIGN KEY (idQualite) REFERENCES qualite(idQualite) ON DELETE CASCADE
);

-- Table Sièges
CREATE TABLE IF NOT EXISTS sieges (
                      idSiege INT PRIMARY KEY AUTO_INCREMENT,
                      rangée CHAR(1),           -- A à E
                      numero INT,               -- 1 à 20
                      estPMR BOOLEAN DEFAULT FALSE,
                      salle_id INT,
                      FOREIGN KEY (salle_id) REFERENCES salles(idSalles) ON DELETE CASCADE
);

-- Table Reservations
CREATE TABLE IF NOT EXISTS reservations (
                                          idReservation INT PRIMARY KEY AUTO_INCREMENT,
                                          utilisateur_id INT,
                                          seance_id INT,
                                          date_resa DATETIME DEFAULT CURRENT_TIMESTAMP,
                                          FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(idUtilisateurs),
                                          FOREIGN KEY (seance_id) REFERENCES seance(idSeance)
);

-- Table Reservations-sièges
CREATE TABLE IF NOT EXISTS reservation_sieges (
                                                idResa INT PRIMARY KEY AUTO_INCREMENT,
                                                reservation_id INT,
                                                siege_id INT,
                                                FOREIGN KEY (reservation_id) REFERENCES reservations(idReservation),
                                                FOREIGN KEY (siege_id) REFERENCES sieges(idSiege)
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
CREATE TABLE IF NOT EXISTS avis_attente (
                            idAvisAttente INT AUTO_INCREMENT PRIMARY KEY,
                            seance_id INT NOT NULL,
                            Note INT CHECK (Note BETWEEN 1 AND 5),
                            commentaire TEXT,
                            dateAvis DATETIME DEFAULT CURRENT_TIMESTAMP,
                            idUtilisateur INT NOT NULL,
                            FOREIGN KEY (seance_id) REFERENCES seances(idSeance),
                            FOREIGN KEY (idUtilisateur) REFERENCES utilisateurs(idUtilisateurs)
);
