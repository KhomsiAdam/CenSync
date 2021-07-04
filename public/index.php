<?php
use App\Controller\WebController;
use App\Controller\AuthApiController;
use App\Controller\UserApiController;
use App\Controller\TicketApiController;
use App\Controller\NoteApiController;
use App\Application;

// require_once __DIR__ . '../../composer_vendor/autoload.php';
require_once dirname(__DIR__) . '/composer_vendor/autoload.php';

$app = new Application(dirname(__DIR__));

// * WebController manages the Web side of the framework

// Web routes for views : GET
$app->router->get('/', [WebController::class, 'entry']);
$app->router->get('/dashboard', [WebController::class, 'dashboard']);
$app->router->get('/tickets', [WebController::class, 'tickets']);
$app->router->get('/staff', [WebController::class, 'staff']);
// Web routes for views : POST

// * Any ExampleApiController manages the API side of the framework with the Middleware

// API routes for endpoints : GET
$app->router->get('/user', [UserApiController::class, 'processUserMethods']);
$app->router->get('/ticket', [TicketApiController::class, 'processTicketMethods']);
$app->router->get('/note', [NoteApiController::class, 'processNoteMethods']);

// API routes for endpoints : POST
$app->router->post('/auth', [AuthApiController::class, 'processAuthMethods']);
$app->router->post('/user', [UserApiController::class, 'processUserMethods']);
$app->router->post('/ticket', [TicketApiController::class, 'processTicketMethods']);
$app->router->post('/note', [NoteApiController::class, 'processNoteMethods']);

$app->run();
// echo $_SERVER['REQUEST_URI'];
?>