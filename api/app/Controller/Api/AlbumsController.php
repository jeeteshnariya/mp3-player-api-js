<?php
namespace App\Controller\Api;

use App\Controller\AppController;

class AlbumsController extends AppController
{
    /**
     * Renvoie tout les albums
     */
    public function getAll()
    {
        $this->json($this->Albums->all());
    }

    /**
     * Renvoie un album
     * @param $id
     */
    public function get($id)
    {
        $this->json($this->Albums->get($id));
    }
}