<?php
namespace App\Controller;

use App\App;
use Core\Controller\Controller;

class AppController extends Controller
{
    /**
     * Load all models
     */
    public function __construct()
    {
        $this->loadModel('Albums');
        $this->loadModel('Artists');
        $this->loadModel('Genres');
        $this->loadModel('Tracks');
    }

    /**
     * Load model into controller
     * @param string $model
     * @return void
     */
    protected function loadModel($model)
    {
        $this->$model = $this->app()->getTable($model);
    }

    /**
     * App container
     * @return object
     */
    protected function app()
    {
        return App::getInstance();
    }
}
