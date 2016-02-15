<?php
namespace App\Controller\Api;

use App\Controller\AppController;

class GenresController extends AppController
{
    /**
     * Renvoie tout les genres
     */
    public function getAll()
    {
        $this->json($this->Genres->all());
    }

    /**
     * Renvoie un genre
     * @param $id
     */
    public function get($id)
    {
        $this->json($this->Genres->get($id));
    }
}