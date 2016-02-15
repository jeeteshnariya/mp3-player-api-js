<?php
namespace App;

use Core\Config;
use Core\Http\Router;
use Core\Model\Database;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

class App
{
    private static $instance;
    private        $config_instance;
    private        $router_instance;
    private        $db_instance;

    /**
     * Retourne l'instance du container App
     * @return self
     */
    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new App();
        }

        return self::$instance;
    }

    /**
     * Démarre l'application
     */
    public function start()
    {
        date_default_timezone_set('Europe/Paris');
        setlocale(LC_TIME, 'fr_FR.utf8', 'fra');

        if ($_SERVER['REQUEST_URI'] !== '/favicon.ico') {
            $date = new \DateTime();
            $log  = new Logger($this->getConfig('title'));
            $log->pushHandler(new StreamHandler(ROOT . '/log/' . $date->format('d-m-Y') . '.log', Logger::INFO));
            $log->info($_SERVER['REMOTE_ADDR'] . ' => ' . $_SERVER['REQUEST_METHOD'] . ' ' . $_SERVER['REQUEST_URI']);
        }

        $router = $this->getRouter(); // scope them all

        require(ROOT . '/config/route.php');

        return $this->getRouter()->run();
    }

    /**
     * Retourne l'instance du Router
     * @return \Core\Http\Router
     */
    public function getRouter()
    {
        if (is_null($this->router_instance)) {
            $this->router_instance = new Router($_GET['url']);
        }

        return $this->router_instance;
    }

    /**
     * Retourne l'instance de Config
     * @param $key
     * @return \Core\Config
     */
    public function getConfig($key)
    {
        if (is_null($this->config_instance)) {
            $this->config_instance = Config::getInstance();
        }

        return $this->config_instance->get($key);
    }

    /**
     * Retourne l'instance de Database
     * @return \Core\Model\Database
     */
    public function getDb()
    {
        if (is_null($this->db_instance)) {
            $this->db_instance = new Database(
                $this->getConfig('db_name'),
                $this->getConfig('db_user'),
                $this->getConfig('db_pass'),
                $this->getConfig('db_host'),
                $this->getConfig('db_port'),
                $this->getConfig('db_socket')
            );
        }

        return $this->db_instance;
    }

    /**
     * Retourne une table pour charger un modèle
     * @param $name
     * @return object
     */
    public function getTable($name)
    {
        $class_name = 'App\\Model\\Table\\' . ucfirst($name) . 'Table';

        return new $class_name($this->getDb());
    }
}