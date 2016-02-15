<?php
namespace App\Model\Entity;

use App\App;
use Core\Model\Entity\Entity;

class GenresEntity extends Entity
{
    /**
     * Récupère les albums d'un genre
     */
    public function getAlbums()
    {
        if (isset($this->id)) {
            $this->albums       = App::getInstance()->getTable('Albums')->allByGenre($this->id);
            $this->total_albums = count($this->albums);
        }
    }
}