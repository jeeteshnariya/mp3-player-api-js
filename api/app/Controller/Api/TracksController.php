<?php
namespace App\Controller\Api;

use App\Controller\AppController;

class TracksController extends AppController
{
    /**
     * Renvoie tout les tracks
     */
    public function getAll()
    {
        $this->json($this->Tracks->all());
    }

    /**
     * Renvoie un track
     * @param $id
     */
    public function get($id)
    {
        $this->json($this->Tracks->get($id));
    }
}