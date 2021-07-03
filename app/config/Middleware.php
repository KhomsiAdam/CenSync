<?php
namespace App\Config;

use App\Config\Dbh;
use PDO;
use ReflectionMethod;
use Exception;

require_once 'defconst.php';
require_once __DIR__ . '../../../composer_vendor/autoload.php';

use \Firebase\JWT\JWT;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable('../');
$dotenv->load();

// The Middleware handles everything from requests, content-type, authorization header and token.
// Validates data, methods and parameters.
class Middleware
{

    protected $request;
    protected $method;
    protected $param;
    protected $db_conn;

    // 1) Throw an error if the request methods are not allowed to your API
    public function __construct()
    {
        // * In this example this means only 'GET' and 'POST' are allowed
        if ($_SERVER['REQUEST_METHOD'] !== "POST") {
            $this->throwError(REQUEST_METHOD_NOT_VALID, 'Request Method is unvalid.');
        }
        // Handling the request data and validating it
        $handler = fopen('php://input', 'r');
        $this->request = stream_get_contents($handler);
        $this->validateRequest($this->request);
        // Connect to Database
        $db = new Dbh();
        $this->db_conn = $db->connect();
    }

    // 2) Validate requests of: content type, methods, parameters
    public function validateRequest()
    {
        // * To block access to API endpoints from browsers and only allow when fetching with json content-type
        if (empty($_SERVER['CONTENT_TYPE'])) {
            exit('Access to API not Allowed from Browsers.');
        } else if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
            $this->throwError(REQUEST_CONTENT_TYPE_NOT_VALID, 'Request Content-Type is unvalid.');
        }

        // ? To allow access to api only with content-type json
        // if($_SERVER['CONTENT_TYPE'] !== 'application/json') {
        //     $this->throwError(REQUEST_CONTENT_TYPE_NOT_VALID, 'Request Content-Type is unvalid.');
        // }
        
        // Convert data retrieved to php object
        $data = json_decode($this->request, true);
        
        // Checking the method
        if (!isset($data['method']) || empty($data['method'])) {
            $this->throwError(METHOD_NAME_REQUIRED, 'Method name is required.');
        }
        $this->method = $data['method'];

        // Checking the paramaters only if the request method is POST
        // if ($_SERVER['REQUEST_METHOD'] === "POST") {
        //     if (!is_array($data['params'])) {
        //         $this->throwError(METHOD_PARAMS_REQUIRED, 'Method parameters are required.');
        //     }
        //     $this->param = $data['params'];
        // }
    }
    
    // 3) Process the method's name sent in the data and check if it exists in your Api Controller
    // Then invoke said method on the object created
    // * Create a Process Method for each Api Controller you might have

    // public function processExampleMethods()
    // {
    //     $exampleApiObj = new \App\Controller\ExampleApiController();
    //     $exampleApiMethod = new ReflectionMethod('App\Controller\ExampleApiController', $this->method);
    //     if (!method_exists($exampleApiObj, $this->method)) {
    //         $this->throwError(METHOD_DOES_NOT_EXIST, "Method does not exist.");
    //     }
    //     $exampleApiMethod->invoke($exampleApiObj);
    // }

    public function processAuthMethods()
    {
        $authApiObj = new \App\Controller\AuthApiController();
        $authApiMethod = new ReflectionMethod('App\Controller\AuthApiController', $this->method);
        if (!method_exists($authApiObj, $this->method)) {
            $this->throwError(METHOD_DOES_NOT_EXIST, "Method does not exist.");
        }
        $authApiMethod->invoke($authApiObj);
    }

    public function processUserMethods()
    {
        $authUserObj = new \App\Controller\UserApiController();
        $authUserMethod = new ReflectionMethod('App\Controller\UserApiController', $this->method);
        if (!method_exists($authUserObj, $this->method)) {
            $this->throwError(METHOD_DOES_NOT_EXIST, "Method does not exist.");
        }
        $authUserMethod->invoke($authUserObj);
    }
    
    public function processTicketMethods()
    {
        $authTicketObj = new \App\Controller\TicketApiController();
        $authTicketMethod = new ReflectionMethod('App\Controller\TicketApiController', $this->method);
        if (!method_exists($authTicketObj, $this->method)) {
            $this->throwError(METHOD_DOES_NOT_EXIST, "Method does not exist.");
        }
        $authTicketMethod->invoke($authTicketObj);
    }
    
    public function processNoteMethods()
    {
        $authNoteObj = new \App\Controller\NoteApiController();
        $authNoteMethod = new ReflectionMethod('App\Controller\NoteApiController', $this->method);
        if (!method_exists($authNoteObj, $this->method)) {
            $this->throwError(METHOD_DOES_NOT_EXIST, "Method does not exist.");
        }
        $authNoteMethod->invoke($authNoteObj);
    }

    /** 4.1) Validate the data sent
    * @param bool|integer|string $value
    */
    public function validateData($value)
    {
        $value = trim($value);
        $value = stripslashes($value);
        $value = htmlspecialchars($value);
        return $value;
    }
    // 4.2) Validate parameters: key, values, data types. *required default value is true, add it and make it false if your key's value is not required
    public function validateParams($key, $value, $dataType, $required = true)
    {
        if ($required = true && empty($value) == true) {
            $this->throwError(VALIDATE_PARAMETER_REQUIRED, $key . ' value is required.');
        }

        $value = $this->validateData($value);

        switch ($dataType) {
            case BOOLEAN:
                if (!is_bool($value)) {
                    $this->throwError(VALIDATE_PARAMETER_DATATYPE, 'Datatype is not valid for ' . $key . '. (must be a boolean)');
                }
                break;
            case INTEGER:
                if (!is_numeric($value)) {
                    $this->throwError(VALIDATE_PARAMETER_DATATYPE, 'Datatype is not valid for ' . $key . '. (must be a number)');
                }
                break;
            case STRING:
                if (!is_string($value)) {
                    $this->throwError(VALIDATE_PARAMETER_DATATYPE, 'Datatype is not valid for ' . $key . '. (must be a string)');
                }
                break;
            default:
                $this->throwError(VALIDATE_PARAMETER_DATATYPE, 'Datatype is not valid for ' . $key);
                break;
        }
        return $value;
    }

    // 5.1) Get header Authorization
    public function getAuthorizationHeader()
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }
    // 5.2) Get access token from header
    public function getBearerToken()
    {
        $headers = $this->getAuthorizationHeader();
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        $this->throwError(AUTHORIZATION_HEADER_NOT_FOUND, 'Access Token Not found');
    }
    /** 5.3) SQL SELECT statement for verifying account id from token with database account table
    * @param object $payload
    * @param string $table
    */
    public function sqlVerifyAccountId($payload, $table) {
        $sql = "SELECT * FROM $table WHERE user_id = :user_id";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $payload->data->user_id);
        $stmt->execute();
        
        $account = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!is_array($account)) {
            $this->returnResponse(ACCOUNT_NOT_FOUND, 'This account is not found in the database.');
        }

        //* Checking if account is activated
        if ($account['status'] === 'inactive') {
            $this->returnResponse(ACCOUNT_NOT_ACTIVE, 'This account is not active.');
        }

        $this->user_id = $payload->data->user_id;
    }

    // 5.4) Validate token received
    public function validateToken()
    {
        try {
            $token = $this->getBearerToken();
            $payload = JWT::decode($token, $_ENV['SECRET_KEY'], ['HS256']);

            $this->sqlVerifyAccountId($payload, $_ENV['ACCOUNTS_TABLE']);

        } catch (Exception $e) {
            $this->throwError(ACCESS_TOKEN_ERRORS, $e->getMessage());
        }
    }

    /** Error handler
    * @param integer $code
    * @param string $message
    */
    public function throwError($code, $message)
    {
        header('Content-Type: application/json');
        $errorMsg = json_encode(['error' => ['status' => $code, 'message' => $message]]);
        echo $errorMsg;
        exit;
    }
    /** Response handler
    * @param integer $code
    * @param object $data
    */
    public function returnResponse($code, $data)
    {
        header('Content-Type: application/json');
        $responseMsg = json_encode(['response' => ['status' => $code, 'result' => $data]]);
        echo $responseMsg;
        exit;
    }
}