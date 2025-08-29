<?php
require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$data = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM films ORDER BY date_sortie DESC";
$stmt = $pdo->prepare($sql);
$films = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($films);
?>
