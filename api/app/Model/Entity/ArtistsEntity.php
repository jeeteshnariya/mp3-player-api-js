<?php
namespace App\Model\Entity;

use App\App;
use Core\Model\Entity\Entity;

class ArtistsEntity extends Entity
{
    /**
     * Récupère les albums d'un artiste
     */
    public function getAlbums()
    {
        if (isset($this->id)) {
            $this->albums       = App::getInstance()->getTable('Albums')->allByArtist($this->id);
            $this->total_albums = count($this->albums);
        }
    }
}