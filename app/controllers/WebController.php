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

    // Dashboard page with Stats and Charts
    public function dashboard() {
        return ViewsController::renderDash('dashboard');
    }

    // Tickets page showing all tickets and option to view individual ticket with more informations
    public function tickets() {
        return ViewsController::renderDash('tickets');
    }

    // Staff page listing all staff members and option to view their profiles
    public function staff() {
        return ViewsController::renderDash('staff');
    }

    // Profile page for connected User
    public function profile() {
        return ViewsController::renderDash('profile');
    }

    // Logout route
    public function logout() {
        session_unset();
        session_destroy();
        header("Location: /");
    }
}