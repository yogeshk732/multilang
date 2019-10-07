// IIFE to ensure safe use of $
(function ($) {
    $.fn.cTooltip = function (options) {
        var $tooltip, $el;

        return this.each(function () {
            $el = $(this);

            var content = $el.data('title');
            if (options !== undefined && options.content !== undefined) {
                content = options.content;
            } else if (content === undefined) {
                content = 'Tooltip';
            }

            $tooltip = $(`<div class="c-tooltip"><div class="c-tooltip-inner">${content}</div><div class="arrow"></div></div>`);
            $(this).append($tooltip);


            // Reposition tooltip, in case of page movement e.g. screen resize
            var linkPosition = $el.position();

            $tooltip.css({
                top: linkPosition.top - $tooltip.outerHeight() - 13,
                left: linkPosition.left - ($tooltip.width() / 2)
            });

            // Adding class handles animation through CSS
            $tooltip.addClass("active");

            if (options !== undefined && options.ajax !== undefined) {
                $.get(options.ajax, response => {
                    if(response.data == '') {
                        $el.mouseout();
                        return false;
                    }
                    
                    $tooltip
                        .hide()
                        .find('.c-tooltip-inner')
                        .html(response.data);

                    $tooltip.css({
                        top: linkPosition.top - $tooltip.outerHeight() - 13,
                        left: linkPosition.left - ($tooltip.width() / 2)
                    });

                    setTimeout(() => $tooltip.show(), 50);
                }, 'json');
            }

            $el.on('mouseout', function (e) {
                var $tooltipObj = $el.children('.c-tooltip');
                $tooltipObj.addClass('out');

                setTimeout(function () {
                    $tooltipObj.remove();

                }, 300);
            });
        });
    }
})(jQuery);