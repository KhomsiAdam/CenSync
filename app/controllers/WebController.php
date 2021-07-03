<?php
// Route methods for Web Views in index.php
namespace App\Controller;

use App\Request;

class WebController extends ViewsController {
    // Entry Page with Login & Register
    public static function entry() {
        return ViewsController::render('entry');
    }
}