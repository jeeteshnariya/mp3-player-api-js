'use strict';

var that;

/**
 * Constructeur de player
 * @returns {Player}
 * @constructor
 */
function Player() {
    that = this;

    this.tracks        = [];
    this.supportsAudio = !!document.createElement('audio').canPlayType;
    this.index         = 0;
    this.playing       = false;

    if (!this.supportsAudio) {
        throw new TypeError('Désolé, votre navigateur n\'est pas compatible avec HTML5 !');
    }

    return this;
}

/**
 * Ajoute une liste de tracks au Player
 * @param musics
 * @returns {Player}
 */
Player.prototype.add = function(musics) {
    this.tracks     = musics;
    this.trackCount = this.tracks.length;

    this.renderTrack().bind().loadTrack(this.index);

    return this;
};

/**
 * Bind les évènements du DOM pour le Player
 * @returns {Player}
 */
Player.prototype.bind = function() {
    this.$npTitle = $('#npTitle');
    this.$btnPrev = $('#btnPrev');
    this.$btnNext = $('#btnNext');
    this.$audio   = $('#audio1').get(0);
    this.$tracks  = $('#plList li');

    this.$btnPrev.off('click').on('click', function() {
        if ((that.index - 1) > -1) {
            that.index--;
            that.loadTrack(that.index);

            if (that.playing) {
                that.$audio.play();
            }
        } else {
            that.$audio.pause();
            that.index = 0;
            that.loadTrack(that.index);
        }
    });

    this.$btnNext.off('click').on('click', function() {
        if ((that.index + 1) < that.trackCount) {
            that.index++;
            that.loadTrack(that.index);

            if (that.playing) {
                that.$audio.play();
            }
        } else {
            that.$audio.pause();
            that.index = 0;
            that.loadTrack(that.index);
        }
    });

    this.$tracks.on('click', function() {
        var id = parseInt($(this).index());

        if (id !== that.index) {
            that.playTrack(id);
        }
    });

    return this;
};

/**
 * Joue une musique
 * @returns {Player}
 */
Player.prototype.play = function() {
    this.playing = true;

    return this;
};

/**
 * Met le player en pause
 * @returns {Player}
 */
Player.prototype.pause = function() {
    this.playing = false;

    return this;
};

/**
 * Termine le player et reviens au début
 * @returns {Player}
 */
Player.prototype.ended = function() {
    if ((this.index + 1) < this.trackCount) {
        this.index++;
        this.loadTrack(this.index);
        this.$audio.play();
    } else {
        this.$audio.pause();
        this.index = 0;
        this.loadTrack(index);
    }

    return this;
};

/**
 * Joue un track
 * @param id
 * @returns {Player}
 */
Player.prototype.playTrack = function(id) {
    this.loadTrack(id);
    this.$audio.play();

    return this;
};

/**
 * Charge un track dans le Player
 * @param id
 * @returns {Player}
 */
Player.prototype.loadTrack = function(id) {
    $('.plSel').removeClass('plSel');
    $('#plList li:eq(' + id + ')').addClass('plSel');

    this.$npTitle.hide().text('(' + this.tracks[id].track_no + ') ' + this.tracks[id].name).show();
    this.index      = id;
    this.$audio.src = this.tracks[id].mp3;

    return this;
};

/**
 * Affiche le rendu HTML du DOM des tracks
 * @returns {Player}
 */
Player.prototype.renderTrack = function() {
    var start    = '<ul id="plList">';
    var end      = '</ul>';
    var template = '';
    var htmlTracks;

    template += '{{#tracks}}<li class="wow bounceInLeft">';
    template += '<div class="plItem"><div class="plNum">{{ track_no }}</div><div class="plTitle">{{ name }}</div>';
    template += '<div class="plLength">{{ time_duration }}</div></div></li>{{/tracks}}';

    htmlTracks = Mustache.render(template, {tracks: this.tracks});

    $('#plwrap').append(start + htmlTracks + end);

    return this;
};