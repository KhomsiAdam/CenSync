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
            return $this->renderView("_404");
        }
        if(is_string($callback)) {
            return $this->renderView($callback);
        }
        // ?
        if(is_array($callback)) {
            $callback[0] = new $callback[0]();
        }
        // ?
        return call_user_func($callback, $this->request);
    }

    // ? Component View System is still work in progress 
    /** Component View System renderer: {{content}} & {{head}} are placeholders that gets filled with components
    * @param string $component
    * @param array $params optional
    */
    public function renderView($component, $params = []) {

        $layout = $this->layout();
        $head = $this->head();
        $content = $this->content($component, $params);

        array_push($this->arrComponents, '{{head}}', '{{content}}');
        array_push($this->arrView, $head, $content);
        return str_replace($this->arrComponents, $this->arrView, $layout);
        //return str_replace('{{content}}', $content, $layout);
    }

    // Main Layout
    protected function layout() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/layout/main.php";
        return ob_get_clean();
    }

    /* Static Components */
    // Head Tag
    protected function head() {
        ob_start();
        include_once Application::$ROOT_DIR."/app/views/components/static/head.php";
        return ob_get_clean();
    }

    /** Content components inside body layout
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