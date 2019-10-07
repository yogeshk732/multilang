// @ts-nocheck
/*
|--------------------------------------------------------------------------
| Custom Notifications
|--------------------------------------------------------------------------
*/

const cNotification = function (options) {
    var $wrapper = $('#c-notifications');

    // Set defaults
    var settings = $.extend({
        title: 'New Notification',
        message: 'Shows Message Here..',
        delay: 5 * 1000,
        onClick: function () { },
        data: {},
    }, options);

    // Display cookie message on page

    var $message = $(`
            <div class="c-notification-wrapper">
                <h4>&#128276; ${settings.title} <i class="material-icons close-cnotification">close</i></h4>
                <div class='notification-wrapper'>${settings.message}</div>
            </div>
        `);
    $($wrapper).append($message);

    setTimeout(removeNotification, settings.delay);

    $message.on('click', '.notification-wrapper', function () {
        settings.onClick.apply(this, [settings.data]);
        removeNotification();
    });

    $message.on('click', '.close-cnotification', function () {
        removeNotification();
    });

    function removeNotification() {
        $message.fadeOut('slow', function () {
            $(this).remove();
        });
    }
};
