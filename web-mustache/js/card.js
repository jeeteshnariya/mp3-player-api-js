'use strict';

/**
 * Card constructor
 * @returns {Card}
 * @constructor
 */
function Card() {
    return this;
}

/**
 * Bind Card DOM event
 */
Card.prototype.bindEvent = function() {
    $('.material-card > .mc-btn-action').off('click');

    $('.material-card > .mc-btn-action').on('click', function() {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-arrow-left')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-bars');

            }, 800);
        } else {
            card.addClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-bars')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-arrow-left');

            }, 800);
        }
    });
};