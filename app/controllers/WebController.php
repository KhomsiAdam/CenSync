<?php
// Route methods for Web Views in index.php
namespace App\Controller;

use App\Request;

class WebController extends ViewsController {
    /* Pages with the normal main layout */
    // Entry Page with Login & Register
    public static function entry() {
        return ViewsController::renderEntry('entry');
    }

    /* Pages with the dashboard layout */
    public static function dashboard() {
        return ViewsController::renderDash('dashboard');
    }
    public static function tickets() {
        return ViewsController::renderDash('tickets');
    }
    public static function staff() {
        return ViewsController::renderDash('staff');
    }
}