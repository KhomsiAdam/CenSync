<?php

namespace App\Model;

require_once __DIR__ . '../../../composer_vendor/autoload.php';

use App\Config\Dbh;
use App\Config\Middleware;
use PDO;

class AuthModel extends Middleware {

    public $db_conn;

    // Connect to database on object creation
    public function __construct() {
        $db = new Dbh();
        $this->db_conn = $db->connect();
    }

    /** SQL SELECT method for verifying if account credentials are correct to sign in and allow token generation
    * @param string $account_name account name
    * @param string $account_name_col ENV variable of account name column in database
    * @param string $account_password account password
    * @param string $account_password_col ENV variable of account passwod column in database
    * @param string $table ENV variable of table name of accounts in database
    */
    public function sqlVerifyAccount($account_email, $account_email_col, $account_password, $account_password_col, $table)
    {
        $sql = "SELECT * FROM $table WHERE $account_email_col = :account_email";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':account_email', $account_email);
        $stmt->execute();
        $account = $stmt->fetch(PDO::FETCH_ASSOC);

        if (isset($account_email) && isset($account_password)) {        
            if (password_verify($account_password, $account[$account_password_col])) {
                if ($account['status'] === 'active') {
                    return $account;
                } else {
                    $this->returnResponse(ACCOUNT_NOT_ACTIVE, 'This account is not active.');
                }
            } else {
                $this->returnResponse(INVALID_ACCOUNT, 'Account Email or Password is incorrect.');
            }
        } else {
            $this->returnResponse(INVALID_ACCOUNT, 'Email or Password are empty.');
        }
    }
}