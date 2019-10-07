$(function () {
    $('[data-ref="notify"]').on('click', function () {
        var from = $(this).data('placement-from');
        var align = $(this).data('placement-align');
        var animate_enter = $(this).data('animate-enter');
        var animate_exit = $(this).data('animate-exit');
        var color_name = $(this).data('color-name');
        var message = $(this).data('color-text');

        showNotification({ color_name, message, from, align, animate_enter, animate_exit });
    });
});

function showNotification({
    color_name = 'bg-black',
    message = 'Notification',
    from = 'top',
    align = 'center',
    animate_enter = 'animated fadeIn',
    animate_exit = 'animated fadeOut',
    allowDismiss = true,
    time_out = 1000,
    newest_on_top = true,
    clear_prev = true
}) {
    if(clear_prev === true) {
        $.notifyClose();
    }

    const options = {
        type: color_name,
        allow_dismiss: allowDismiss,
        newest_on_top: newest_on_top,
        timer: time_out,
        placement: { from, align },
        animate: {
            enter: animate_enter,
            exit: animate_exit
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    };

    $.notify({ message }, options);
}