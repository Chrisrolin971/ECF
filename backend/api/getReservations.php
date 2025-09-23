<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';
$secretKey = 'token';

if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(["error" => "Token manquant"]);
    exit;
}

$token = $matches[1];
try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    $userId = $decoded->id;
    error_log("Token décodé : " . json_encode($decoded));
    error_log("ID utilisateur : " . $userId);

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Token invalide"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT
        f.titre AS titre,
        s.date AS date,
        s.heure AS heure,
        q.type AS qualite,
        sa.idSalles AS salle,
        r.idReservation AS id,
        s.idSeance AS seance_id
    FROM reservations r
    JOIN seance s ON r.seance_id = s.idSeance
    JOIN films f ON s.films_id = f.idFilms
    JOIN salles sa ON s.salle_id = sa.idSalles
    JOIN qualite q ON sa.idQualite = q.idQualite
    WHERE r.utilisateur_id = :userId
    ORDER BY s.date DESC
    ");

    $stmt->execute([':userId' => $userId]);
    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reservations);

    error_log("Nombre de réservations : " . count($reservations));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la récupération des réservations"]);
}
