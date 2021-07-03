<?php
namespace App\Config;

use PDO;
use Exception;

require_once __DIR__ . '../../../composer_vendor/autoload.php';
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable('../');
$dotenv->load();

// Database Handler
class Dbh {
    public function connect() {
        try {
            $conn = new PDO($_ENV['DSN'], $_ENV['USERNAME'], $_ENV['PASSWORD']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(Exception $e) {
            echo 'Database Connection Error: ' . $e->getMessage();
        }
    }
}