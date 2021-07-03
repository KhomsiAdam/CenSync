<?php
namespace App\Controller;

use App\Application;

class ViewsController {
    /** Views renderer shorthand
    * @param string $view
    * @param array $params optional
    */
    public static function render($view, $params = []) {
        return Application::$app->router->renderView($view, $params);
    }
}