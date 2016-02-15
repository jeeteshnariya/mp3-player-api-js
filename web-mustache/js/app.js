'use strict';

// Array Shuffle elements
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i]           = itemAtIndex;
    }
    return input;
};

// Sidebar, searchbar, navbar materialize.css
(function($) {
    $(function() {
        $('.button-collapse').sideNav();
        $('#search-form-close').on('click', function() {
            $(this).parent().find('input').val(null);
        });
    });
})(jQuery);

// App start router
(function($) {
    $(function() {
        var router = new Navigo();
        var app    = new Request();

        new Searchbar(app).init();
        new WOW().init();

        router.on({
            'albums/:id': function(params) {
                app.api('/albums/' + params.id, 'GET', function(album) {
                    app.load('albums/albums.detail', '.route-albums', {album: album}, function(template) {
                        app.preloader(template, true, function() {
                            new Player().add(album.tracks);

                            new Card().bindEvent();
                        });
                    });
                });
            },
            'albums': function() {
                app.api('/albums', 'GET', function(albums) {
                    var infiniteOffset = 0;
                    var slicedAlbums   = albums.slice(0, 30);

                    app.load('albums/albums.all', '.route-albums', {albums: slicedAlbums}, function(template) {
                        app.preloader(template, true, function() {
                            $(window).on('scroll', function() {
                                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                                    infiniteOffset++;

                                    slicedAlbums = albums.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30);

                                    if (!slicedAlbums.length) {
                                        return false;
                                    }

                                    app.load('albums/albums.all', null, {albums: slicedAlbums}, function(infiniteTemplate) {
                                        $('main').append(infiniteTemplate);

                                        new Card().bindEvent();
                                    });
                                }
                            });

                            new Card().bindEvent();
                        });
                    });
                });
            },
            'artists/:id': function(params) {
                app.api('/artists/' + params.id, 'GET', function(artist) {
                    var infiniteOffset     = 0;
                    var slicedArtistAlbums = artist.albums.slice(0, 30);

                    app.load('artists/artists.detail', '.route-artists', {artist: artist}, function(template) {
                        app.load('albums/albums.all', null, {albums: slicedArtistAlbums}, function(albumsTemplate) {
                            app.preloader(template + albumsTemplate, true, function() {
                                $(window).on('scroll', function() {
                                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                                        infiniteOffset++;

                                        slicedArtistAlbums = artist.albums.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30);

                                        if (!slicedArtistAlbums.length) {
                                            return false;
                                        }

                                        app.load('albums/albums.all', null, {albums: slicedArtistAlbums}, function(infiniteTemplate) {
                                            $('main').append(infiniteTemplate);

                                            new Card().bindEvent();
                                        });
                                    }
                                });

                                new Card().bindEvent();
                            });
                        });
                    });
                });
            },
            'artists': function() {
                app.api('/artists', 'GET', function(artists) {
                    var infiniteOffset = 0;
                    var slicedArtists  = artists.slice(0, 30);

                    app.load('artists/artists.all', '.route-artists', {artists: slicedArtists}, function(template) {
                        app.preloader(template, true, function() {
                            $(window).on('scroll', function() {
                                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                                    infiniteOffset++;

                                    slicedArtists = artists.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30);

                                    if (!slicedArtists.length) {
                                        return false;
                                    }

                                    app.load('artists/artists.all', null, {artists: slicedArtists}, function(infiniteTemplate) {
                                        $('main').append(infiniteTemplate);
                                    });
                                }
                            });
                        });
                    });
                });
            },
            'genres/:id': function(params) {
                app.api('/genres/' + params.id, 'GET', function(genre) {
                    var infiniteOffset    = 0;
                    var slicedGenreAlbums = genre.albums.slice(0, 30);

                    app.load('genres/genres.detail', '.route-genres', {genre: genre}, function(template) {
                        app.load('albums/albums.all', null, {albums: slicedGenreAlbums}, function(albumsTemplate) {
                            app.preloader(template + albumsTemplate, true, function() {
                                $(window).on('scroll', function() {
                                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                                        infiniteOffset++;

                                        slicedGenreAlbums = genre.albums.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30);

                                        if (!slicedGenreAlbums.length) {
                                            return false;
                                        }

                                        app.load('albums/albums.all', null, {albums: slicedGenreAlbums}, function(infiniteTemplate) {
                                            $('main').append(infiniteTemplate);

                                            new Card().bindEvent();
                                        });
                                    }
                                });

                                new Card().bindEvent();
                            });
                        });
                    });
                });
            },
            'genres': function() {
                app.api('/genres', 'GET', function(genres) {
                    var infiniteOffset = 0;
                    var slicedGenres   = genres.slice(0, 30);

                    app.load('genres/genres.all', '.route-genres', {genres: slicedGenres}, function(template) {
                        app.preloader(template, true, function() {
                            $(window).on('scroll', function() {
                                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                                    infiniteOffset++;

                                    slicedGenres = genres.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30);

                                    if (!slicedGenres.length) {
                                        return false;
                                    }

                                    app.load('genres/genres.all', null, {genres: slicedGenres}, function(infiniteTemplate) {
                                        $('main').append(infiniteTemplate);
                                    });
                                }
                            });
                        });
                    });
                });
            },
            '*': function() {
                app.api('/albums', 'GET', function(albums) {
                    var infiniteOffset = 0;
                    var slicedAlbums   = albums.shuffle().slice(0, 30);

                    app.load('home', '.route-home', {albums: slicedAlbums}, function(template) {
                        app.preloader(template, true, function() {
                            $(window).on('scroll', function() {
                                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                                    infiniteOffset++;

                                    var slicedAlbums = albums.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30).shuffle();

                                    if (!slicedAlbums.length) {
                                        return false;
                                    }

                                    app.load('home', null, {albums: slicedAlbums}, function(infiniteTemplate) {
                                        $('main').append(infiniteTemplate);

                                        new Card().bindEvent();
                                    });
                                }
                            });

                            new Card().bindEvent();
                        });
                    });
                });
            }
        });
    });
})(jQuery);