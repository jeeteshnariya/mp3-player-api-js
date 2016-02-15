<?php
namespace App\Model\Table;

use Core\Model\Table\Table;

class TracksTable extends Table
{
    protected $table = 'tracks';

    /**
     * Renvoie tout les tracks d'un album
     * @param $album_id
     * @return \App\Model\Entity\TracksEntity
     */
    public function allByAlbum($album_id)
    {
        return $this->query('SELECT tracks.*
                             FROM tracks
                             WHERE album_id = ?', [$album_id]);
    }

    /**
     * Renvoie le résultat d'une recherche en fonction du nom d'un track
     * @param $search
     * @return \App\Model\Entity\TracksEntity
     */
    public function searchByTrack($search)
    {
        return $this->query('SELECT tracks.*
                             FROM tracks
                             WHERE tracks.name LIKE ?', [$search]);
    }
}