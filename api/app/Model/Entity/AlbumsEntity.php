<?php
namespace App\Model\Entity;

use App\App;
use Core\Model\Entity\Entity;

class AlbumsEntity extends Entity
{
    /**
     * Formate automatiquement la date en français
     */
    public function __construct()
    {
        if (isset($this->id)) {
            $this->formated_release_date = date('d-m-Y', $this->release_date);
            $this->random_album_color    = $this->getRandomColor();

        }
    }

    /**
     * Renvoie une couleur au hasard pour les cartes des albums
     */
    private function getRandomColor()
    {
        $colors = ['red', 'blue', 'green', 'orange-red', 'orange'];

        shuffle($colors);

        return $colors[0];
    }

    /**
     * Récupère les tracks d'un album
     */
    public function getTracks()
    {
        if (isset($this->id)) {
            $this->tracks       = App::getInstance()->getTable('Tracks')->allByAlbum($this->id);
            $this->total_tracks = count($this->tracks);
        }
    }

    /**
     * Récupère les genres d'un album
     */
    public function getGenres()
    {
        if (isset($this->id)) {
            $this->genres       = App::getInstance()->getTable('Genres')->allByAlbum($this->id);
            $this->total_genres = count($this->genres);
        }
    }
}