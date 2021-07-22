<?php

session_start();

use App\Controller\WebController;
use App\Controller\AuthApiController;
use App\Controller\UserApiController;
use App\Controller\TicketApiController;
use App\Controller\NoteApiController;
use App\Application;

require_once dirname(__DIR__) . '/composer_vendor/autoload.php';

$app = new Application(dirname(__DIR__));

// * WebController manages the Web side of the framework

// Web routes for views : GET
$app->router->get('/', [WebController::class, 'entry']);
$app->router->get('/dashboard', [WebController::class, 'dashboard']);
$app->router->get('/tickets', [WebController::class, 'tickets']);
$app->router->get('/staff', [WebController::class, 'staff']);
$app->router->get('/profile', [WebController::class, 'profile']);
$app->router->get('/logout', [WebController::class, 'logout']);
// Web routes for views : POST

// * Any ExampleApiController manages the API side of the framework with the Middleware

// API routes for endpoints : POST
$app->router->post('/auth', [AuthApiController::class, 'processAuthMethods']);
$app->router->post('/user', [UserApiController::class, 'processUserMethods']);
$app->router->post('/ticket', [TicketApiController::class, 'processTicketMethods']);
$app->router->post('/note', [NoteApiController::class, 'processNoteMethods']);

$app->run();
?>