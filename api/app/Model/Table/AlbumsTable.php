<?php
namespace App\Model\Table;

use Core\Model\Table\Table;

class AlbumsTable extends Table
{
    protected $table = 'albums';

    /**
     * Renvoie tout les albums avec leur artiste
     * @return \App\Model\Entity\AlbumsEntity
     */
    public function all()
    {
        return $this->query('SELECT albums.*,
                             artists.name AS "artist_name",
                             artists.description AS "artist_description",
                             artists.bio AS "artist_bio",
                             artists.photo AS "artist_photo"
                             FROM albums
                             LEFT JOIN artists ON albums.artist_id = artists.id');
    }


    /**
     * Renvoie un album avec son artiste, ses tracks, son total de tracks, ses genres, son total de genres
     * @param $id
     * @return \App\Model\Entity\AlbumsEntity
     */
    public function get($id)
    {
        $album = $this->query('SELECT albums.*,
                             artists.name AS "artist_name",
                             artists.description AS "artist_description",
                             artists.bio AS "artist_bio",
                             artists.photo AS "artist_photo"
                             FROM albums
                             LEFT JOIN artists ON albums.artist_id = artists.id
                             WHERE albums.id = ?', [$id], true);


        return $this->call($album, ['getTracks', 'getGenres']);
    }

    /**
     * Renvoie tout les albums d'un artiste
     * @param $artist_id
     * @return \App\Model\Entity\AlbumsEntity
     */
    public function allByArtist($artist_id)
    {
        return $this->query('SELECT albums.*
                             FROM albums
                             WHERE albums.artist_id = ?', [$artist_id]);
    }

    /**
     * Renvoie tout les albums d'un genre
     * @param $genre_id
     * @return \App\Model\Entity\AlbumsEntity
     */
    public function allByGenre($genre_id)
    {
        return $this->query('SELECT albums.*
                             FROM albums
                             LEFT JOIN genres_albums ON albums.id = genres_albums.album_id
                             WHERE genres_albums.genre_id = ?', [$genre_id]);
    }

    /**
     * Renvoie le résultat d'une recherche en fonction du nom d'un album
     * @param $search
     * @return \App\Model\Entity\AlbumsEntity
     */
    public function searchByAlbum($search)
    {
        return $this->query('SELECT albums.*
                             FROM albums
                             WHERE albums.name LIKE ?', [$search]);
    }
}