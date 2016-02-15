<?php
namespace App\Model\Table;

use Core\Model\Table\Table;

class GenresTable extends Table
{
    protected $table = 'genres';

    /**
     * Renvoie un genre avec ses albums
     * @param $id
     * @return \App\Model\Entity\GenresEntity
     */
    public function get($id)
    {
        $genre = $this->query('SELECT genres.*
                             FROM genres
                             WHERE genres.id = ?', [$id], true);


        return $this->call($genre, ['getAlbums']);
    }

    /**
     * Renvoie tout les genres d'un album
     * @param $album_id
     * @return \App\Model\Entity\GenresEntity
     */
    public function allByAlbum($album_id)
    {
        return $this->query('SELECT genres.*
                             FROM genres
                             LEFT JOIN genres_albums ON genres.id = genres_albums.genre_id
                             WHERE genres_albums.album_id = ?', [$album_id]);
    }

    /**
     * Renvoie le résultat d'une recherche en fonction du nom d'un genre
     * @param $search
     * @return \App\Model\Entity\GenresEntity
     */
    public function searchByGenre($search)
    {
        return $this->query('SELECT genres.*
                             FROM genres
                             WHERE genres.name LIKE ?', [$search]);
    }
}