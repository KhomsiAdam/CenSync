<?php
namespace App\Config;

use PDO;
use Exception;

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