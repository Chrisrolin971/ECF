<?php
header('Content-Type: application/json');
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
file_put_contents('log.txt', "Reçu : " . print_r($data, true) . "\n", FILE_APPEND);
if (!isset($data['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'ID du film manquant',
        'debug' => $data
    ]);
    exit;
}


$sql = "DELETE FROM films WHERE idFilms = :idFilms";
$stmt = $pdo->prepare($sql);
$success = $stmt->execute(['idFilms' => $data['id']]);

echo json_encode([
    'success' => $success,
    'message' => $success ? 'Film supprimé avec succès' : 'Échec de la suppression'
]);
