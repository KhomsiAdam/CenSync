<?php
namespace App\Controller;

use App\Application;

class ViewsController {
    /** Views renderer controller
    * @param string $view
    * @param array $params optional
    */
    // Render Entry Layout
    public static function renderEntry($view, $params = []) {
        return Application::$app->router->renderEntryView($view, $params);
    }
    // Render Dashboard Layout
    public static function renderDash($view, $params = []) {
        return Application::$app->router->renderDashboardView($view, $params);
    }
}