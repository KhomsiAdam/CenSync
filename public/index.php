<?php

session_start();

use App\Application;
use App\Controller\WebController;
use App\Controller\UploadController;
use App\Controller\AuthApiController;
use App\Controller\NoteApiController;
use App\Controller\UserApiController;
use App\Controller\TicketApiController;

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
$app->router->post('/upload', [UploadController::class, 'postImage']);
$app->router->post('/delete', [UploadController::class, 'deleteImage']);
$app->router->post('/deleteimg', [UploadController::class, 'deleteUserImage']);

// * Any ExampleApiController manages the API side of the framework with the Middleware

// API routes for endpoints : POST
$app->router->post('/auth', [AuthApiController::class, 'processAuthMethods']);
$app->router->post('/user', [UserApiController::class, 'processUserMethods']);
$app->router->post('/ticket', [TicketApiController::class, 'processTicketMethods']);
$app->router->post('/note', [NoteApiController::class, 'processNoteMethods']);

// Run the app and router, resolve paths and request methods and render different layout depending on callback
$app->run();
?>