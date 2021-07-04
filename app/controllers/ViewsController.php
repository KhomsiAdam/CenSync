<?php
namespace App\Controller;

use App\Application;

class ViewsController {
    /** Views renderer shorthand
    * @param string $view
    * @param array $params optional
    */
    public static function renderEntry($view, $params = []) {
        return Application::$app->router->renderEntryView($view, $params);
    }
    public static function renderDash($view, $params = []) {
        return Application::$app->router->renderDashboardView($view, $params);
    }
}