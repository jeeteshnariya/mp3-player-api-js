'use strict';

/**
 * Constructeur de Request
 * @constructor
 */
function Request() {
    this.templatePath = 'http://localhost/web-handlebars/template/';
    this.templateExt  = '.hbs';
    this.apiUrl       = 'http://localhost/api/';
}

/**
 * Execute une requête pour obtenir un template le callback en passant les données HTML
 * @param name
 * @param nav
 * @param data
 * @param callback
 */
Request.prototype.load = function(name, nav, data, callback) {
    $.get(this.templatePath + name + this.templateExt, function(response) {
        var tpl = Handlebars.compile(response);
        var html = tpl(data);

        if (nav !== null) {
            $('.navbar-fixed').find('li').removeClass('active');
            $(nav).addClass('active');
        }

        callback(html);
    });
};

/**
 * Execute une requête et récupère les données puis retourne le callback passé en paramètre
 * @param url
 * @param method
 * @param callback
 * @param params
 */
Request.prototype.api = function(url, method, callback, params) {
    if (method !== 'GET' && method !== 'POST') {
        throw new TypeError('Request 2nd parameter need to be valid method (GET/PUT/POST/DELETE) !');
    }

    if (typeof callback !== 'function') {
        throw new TypeError('Request 3rd parameter need to be valid callback !');
    }

    if (method === 'GET') {
        $.getJSON(this.apiUrl + url, function(data) {
            $(window).off('scroll');

            callback(data);
        });
    }

    if (method === 'POST') {
        $.ajax({
            url: this.apiUrl + url,
            type: 'POST',
            data: params || {}
        }).done(function(data) {
            $(window).off('scroll');
            callback(data);
        });
    }
};

/**
 * Preloader sur le contenu
 * @param template
 * @param empty
 * @param callback
 */
Request.prototype.preloader = function(template, empty, callback) {
    var $main = $('main');

    $main.fadeOut(250, function() {
        if (!empty) {
            $main.append(template).fadeIn(250, function() {
                $('html, body').animate({scrollTop: 0}, 'slow');
                callback();
            });
        } else {
            $main.empty().append(template).fadeIn(250, function() {
                $('html, body').animate({scrollTop: 0}, 'slow');
                callback();
            });
        }
    });
};