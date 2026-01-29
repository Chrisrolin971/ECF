<?php
// Affichage des erreurs (à désactiver en production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Réponse JSON
header('Content-Type: application/json');

// CORS
$allowedOrigins = [
    "https://projet-cinephoria.fr",
    "https://home-5019114412.app-ionos.space"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Chargement config + PDO
require_once __DIR__ . '/config.php';

// Sécurisation : vérifier que $pdo existe
if (!isset($pdo)) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur interne : PDO non initialisé"]);
    exit;
}

try {
    $sql = "SELECT
                idFilms AS id,
                titre,
                description,
                note,
                genre AS categorie,
                image_url AS image,
                coeur,
                date_sortie,
                pegi,
                duree
            FROM films";

    $stmt = $pdo->query($sql);
    $films = $stmt->fetchAll();

    echo json_encode($films);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur SQL",
        "message" => $e->getMessage()
    ]);
}
