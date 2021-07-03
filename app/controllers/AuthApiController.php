<?php
namespace App\Controller;

require_once __DIR__ . '../../../composer_vendor/autoload.php';

use App\Config\Middleware;
use App\Model\AuthModel;
use Exception;

use \Firebase\JWT\JWT;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable('../');
$dotenv->load();

class AuthApiController extends Middleware
{
    // Array to hold any data you need about account
    private $account_info = [];

    public function __construct()
    {
        parent::__construct();
    }

    // Generating token for login
    public function generateToken()
    {
        $account_email = $this->validateParams('account_email', $this->param['account_email'], STRING);
        $account_password = $this->validateParams('account_password', $this->param['account_password'], STRING);
        try {
            $authObj = new AuthModel();
            $this->account_info = $authObj->sqlVerifyAccount($account_email, $_ENV['ACCOUNTS_EMAIL'], $account_password, $_ENV['ACCOUNTS_PASSWORD'], $_ENV['ACCOUNTS_TABLE']);

            $iss = $_ENV['HOST'];
            $iat = time();
            // Token expiration time in seconds: 60 * 30 = 30min; 60 * 60 = 1hour...
            $exp = $iat + (60 * 60);
            $aud = $_ENV['AUDIENCE_TABLE'];
            // Array containing any account data needed from token you can add an entry based on needs
            $account_data = array(
                $_ENV['ACCOUNTS_ID'] => $this->account_info[$_ENV['ACCOUNTS_ID']],
                $_ENV['ACCOUNTS_EMAIL'] => $this->account_info[$_ENV['ACCOUNTS_EMAIL']],
                $_ENV['ACCOUNTS_FIRSTNAME'] => $this->account_info[$_ENV['ACCOUNTS_FIRSTNAME']],
                $_ENV['ACCOUNTS_LASTNAME'] => $this->account_info[$_ENV['ACCOUNTS_LASTNAME']],
                $_ENV['ACCOUNTS_ROLE'] => $this->account_info[$_ENV['ACCOUNTS_ROLE']],
                $_ENV['ACCOUNTS_STATUS'] => $this->account_info[$_ENV['ACCOUNTS_STATUS']]
            );

            $payload = array(
                "iss" => $iss,
                "iat" => $iat,
                "exp" => $exp,
                "aud" => $aud,
                "data" => $account_data
            );

            $jwt = JWT::encode($payload, $_ENV['SECRET_KEY']);
            $data = ['token' => $jwt];
            // Checking if the token has been generated successfully
            if ($_ENV['DEV_MODE'] === 'ON') {
                $this->returnResponse(RESPONSE_MESSAGE, $data);
            } else {
                echo $data['token'];
            }

        } catch (Exception $e) {
            $this->throwError(JWT_PROCESSING_ERROR, $e->getMessage());
        }
    }
}