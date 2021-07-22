<?php

namespace App;

class Router {

    public Request $request;
    public Response $response;

    protected array $routes = [];

    // ? Arrays for Component View System
    public array $arrView = [];
    public array $arrComponents = [];
    
    public function __construct(Request $request,Response $response)
    {
        $this->request = $request;
        $this->response = $response;
    }

    public function get($path, $callback) {
        $this->routes['get'][$path] = $callback;
    }

    public function post($path, $callback) {
        $this->routes['post'][$path] = $callback;
    }

    public function resolve() {
        $path = $this->request->getPath();
        $method = $this->request->getMethod();
        $callback = $this->routes[$method][$path] ?? false;
        if($callback === false) {
            $this->response->setStatusCode(404);
            return $this->renderEntryView('_404');
        }
        if(is_string($callback)) {
            if($path === '/') {
                return $this->renderEntryView($callback);
            } else {
                return $this->renderDashboardView($callback);
            }
        }
        // ?
        if(is_array($callback)) {
            $callback[0] = new $callback[0]();
        }
        // ?
        return call_user_func($callback, $this->request);
    }

    /** Component View System renderer: components like {{content}} & {{head}} are placeholders that gets replaced with code
    * @param string $component
    * @param array $params optional
    */
    // Rendering a normal view: head tag + content
    public function renderEntryView($component, $params = []) {

        $layout = $this->entryLayout();
        $head = $this->head();
        $content = $this->content($component, $params);

        array_push($this->arrComponents, '{{head}}', '{{content}}');
        array_push($this->arrView, $head, $content);
        return str_replace($this->arrComponents, $this->arrView, $layout);
    }
    // Rendering the view with the dashboard layout with a navbar, header and create ticket modal
    public function renderDashboardView($component, $params = []) {

        $layout = $this->dashboardlayout();
        $head = $this->head();
        $navbar = $this->navbar();
        $header = $this->header();
        $content = $this->content($component, $params);
        $modal = $this->modal();

        array_push($this->arrComponents, '{{head}}', '{{navbar}}', '{{header}}', '{{content}}', '{{modal}}');
        array_push($this->arrView, $head, $navbar, $header, $content, $modal);
        return str_replace($this->arrComponents, $this->arrView, $layout);
    }

    /* Layouts */
    // Entry Layout
    protected function entryLayout() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/layout/entry_layout.php";
        return ob_get_clean();
    }
    // Dashboard Layout
    protected function dashboardLayout() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/layout/dash_layout.php";
        return ob_get_clean();
    }

    /* Static Components */
    // Head Tag
    protected function head() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/components/static/head.php";
        return ob_get_clean();
    }
    // Navbar
    protected function navbar() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/components/static/navbar.php";
        return ob_get_clean();
    }
    // Header
    protected function header() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/components/static/header.php";
        return ob_get_clean();
    }
    // Modal
    protected function modal() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/components/static/modal.php";
        return ob_get_clean();
    }

    /** Dynamic components inside layouts => content => views
    * @param string $component
    * @param array $params optional
    */
    protected function content($component, $params = []) {
        foreach ($params as $key => $value) {
            $$key = $value; 
        }
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/components/dynamic/$component.php";
        return ob_get_clean();
    }
}