<?php
/**
 * Routes pour les albums
 */
$router->get('/albums', 'Api\\Albums->getAll', 'albums.getAll');
$router->get('/albums/:id:', 'Api\\Albums->get', 'albums.get')->with('id', '[0-9]+');

/**
 * Routes pour les artistes
 */
$router->get('/artists', 'Api\\Artists->getAll', 'artistes.getAll');
$router->get('/artists/:id:', 'Api\\Artists->get', 'artistes.get')->with('id', '[0-9]+');

/**
 * Routes pour les tracks
 */
$router->get('/tracks', 'Api\\Tracks->getAll', 'tracks.getAll');
$router->get('/tracks/:id:', 'Api\\Tracks->get', 'tracks.get')->with('id', '[0-9]+');

/**
 * Routes pour les genres
 */
$router->get('/genres', 'Api\\Genres->getAll', 'genres.getAll');
$router->get('/genres/:id:', 'Api\\Genres->get', 'genres.get')->with('id', '[0-9]+');


/**
 * Route pour la recherche
 */
$router->post('/search/:type:', 'Api\\Search->find', 'search.find')->with('type', '[A-Za-z]+');