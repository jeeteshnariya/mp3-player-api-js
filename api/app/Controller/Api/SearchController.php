<?php
namespace App\Controller\Api;

use App\Controller\AppController;

class SearchController extends AppController
{
    /**
     * Renvoie les résultats d'une recherche
     */
    public function find($type)
    {
        $search = str_replace('%', '', (isset($_POST['search']) ? $_POST['search'] : null));

        if (empty($search)) {
            $this->json(new \stdClass());
        }

        $search = "%{$search}%";

        switch ($type) {
            case 'albums':
                $result = $this->Albums->searchByAlbum($search);
                break;
            case 'genres':
                $result = $this->Genres->searchByGenre($search);
                break;
            case 'artists':
                $result = $this->Artists->searchByArtist($search);
                break;
            case 'tracks':
                $result = $this->Tracks->searchByTrack($search);
                break;
            default:
                $result = $this->Albums->searchByAlbum($search);
        }

        $this->json($result);
    }
}