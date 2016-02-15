<?php
namespace App\Controller\Api;

use App\Controller\AppController;

class ArtistsController extends AppController
{
    /**
     * Renvoie tout les artistes
     */
    public function getAll()
    {
        $this->json($this->Artists->all());
    }

    /**
     * Renvoie un artiste
     * @param $id
     */
    public function get($id)
    {
        $this->json($this->Artists->get($id));
    }
}