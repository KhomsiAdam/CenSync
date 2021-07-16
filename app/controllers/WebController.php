<?php
// Route methods for Web Views in index.php
namespace App\Controller;

use App\Request;
use App\Controller\ViewsController;

class WebController extends ViewsController {
    /* Pages with the normal main layout */
    // Entry Page with Login & Register
    public function entry() {
        return ViewsController::renderEntry('entry');
    }

    /* Pages with the dashboard layout */
    public function dashboard() {
        return ViewsController::renderDash('dashboard');
    }
    public function tickets() {
        return ViewsController::renderDash('tickets');
    }
    public function staff() {
        return ViewsController::renderDash('staff');
    }
    public function profile() {
        return ViewsController::renderDash('profile');
    }
    public function logout() {
        session_unset();
        session_destroy();
        
        header("Location: /");
    }
}