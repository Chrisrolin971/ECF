<?php
require_once __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];

$dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

$pdo = new PDO($dsn, $user, $password, $options);
?>

// <?php
// require_once __DIR__ . '/../../vendor/autoload.php';
//
// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();
//
// $host_name = $_ENV['DB_HOST'];
// $database = $_ENV['DB_DATABASE'];
// $user_name = $_ENV['DB_USER'];
// $password = $_ENV['DB_PASSWORD'];
// $port = $_ENV['DB_PORT'];
//
// $dsn = "mysql:host=$host_name;port=$port;dbname=$database;charset=utf8mb4";
// $options = [
//     PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
//     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
// ];
//
// $pdo = new PDO($dsn, $user_name, $password, $options);
// ?>
