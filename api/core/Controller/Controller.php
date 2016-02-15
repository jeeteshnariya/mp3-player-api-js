<?php
namespace Core\Controller;

class Controller
{
    /**
     * JSON hard encode data
     * @param mixed $data
     * @return void
     */
    protected function json($data)
    {
        header('Content-Type: application/json');
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE, PATCH");
        header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
        die(json_encode($data));
    }
}