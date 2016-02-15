'use strict';

var self;

/**
 * Debounce helepr
 * @param callback
 * @param delay
 * @returns {Function}
 */
function debounce(callback, delay) {
    var timer;

    return function() {
        var args    = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, delay)
    }
}

/**
 * Constructeur de Searchbar
 * @param app
 * @constructor
 * @returns {Searchbar}
 */
function Searchbar(app) {
    self = this;

    this.app    = app;
    this.choice = 'albums';
    this.$input = $('#search');

    return this;
}

/**
 * Bind l'évènement de la recherche
 */
Searchbar.prototype.init = function() {
    self.$input.on('input', debounce(function() {
        self.choice = $('.navbar-fixed').find('li.active').attr('class').toString().split(' ')[0].replace('route-', '');

        if (self.choice === 'home') {
            self.choice = 'albums'; // proxy to albums
        }

        self.search();
    }, 350));
};

/**
 * Recherche call lors d'une frappe au formulaire
 */
Searchbar.prototype.search = function() {
    self.app.api('/search/' + self.choice, 'POST', function(data) {
        if (!data.length) {
            return false;
        }

        var searchFormatedObject = {};
        var infiniteOffset       = 0;
        var slicedResults        = data.slice(0, 30);

        searchFormatedObject[self.choice] = slicedResults;

        self.app.load(self.choice + '/' + self.choice + '.all', null, searchFormatedObject, function(template) {
            self.app.preloader(template, true, function() {
                $(window).off('scroll').on('scroll', function() {
                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                        infiniteOffset++;

                        slicedResults                     = data.slice(infiniteOffset * 30, (infiniteOffset + 1) * 30);
                        searchFormatedObject[self.choice] = slicedResults;

                        if (!slicedResults.length) {
                            return false;
                        }

                        self.app.load(self.choice + '/' + self.choice + '.all', null, searchFormatedObject, function(infiniteTemplate) {
                            $('main').append(infiniteTemplate);

                            new Card().bindEvent();
                        });
                    }
                });

                new Card().bindEvent();
            });
        });
    }, {search: self.$input.val()} || {search: ''});
};