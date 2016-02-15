<?php
namespace App\Model\Table;

use Core\Model\Table\Table;

class ArtistsTable extends Table
{
    protected $table = 'artists';

    /**
     * Renvoie un artiste avec ses albums
     * @param $id
     * @return \App\Model\Entity\ArtistsEntity
     */
    public function get($id)
    {
        $artist = $this->query('SELECT artists.*
                             FROM artists
                             WHERE artists.id = ?', [$id], true);


        return $this->call($artist, ['getAlbums']);
    }

    /**
     * Renvoie le résultat d'une recherche en fonction du nom d'un artiste
     * @param $search
     * @return \App\Model\Entity\ArtistsEntity
     */
    public function searchByArtist($search)
    {
        return $this->query('SELECT artists.*
                             FROM artists
                             WHERE artists.name LIKE ?', [$search]);
    }
}