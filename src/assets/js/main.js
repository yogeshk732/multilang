// @ts-nocheck

/* For select2 */
if ($.fn.modal != undefined) {
    $.fn.modal.Constructor.prototype.enforceFocus = function () { };
}

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function formatErrorMessage(jqXHR, exception) {
    if (jqXHR.status === 0) {
        return ajax_errors.http_not_connected;
    } else if (jqXHR.status == 400) {
        return ajax_errors.request_forbidden;
    } else if (jqXHR.status == 404) {
        return ajax_errors.not_found_request;
    } else if (jqXHR.status == 500) {
        return ajax_errors.session_expire;
    } else if (jqXHR.status == 503) {
        return ajax_errors.service_unavailable;
    } else if (exception === 'parsererror') {
        return ajax_errors.parser_error;
    } else if (exception === 'timeout') {
        return ajax_errors.request_timeout;
    } else if (exception === 'abort') {
        return ajax_errors.request_abort;
    } else {
        try {
            var message = '';
            if (jQuery.isEmptyObject(jqXHR.responseJSON) == false) {
                $.each(jqXHR.responseJSON.errors, function (key, value) {
                    $.each(value, function (key, row) {
                        message += '<p>' + row + '</p>';
                    });
                });
            }
            return message;
        } catch (e) {
            return 'Uncaught Error.\n' + jqXHR.responseText;
        }
    }
}

function initBasicCkEditor() {
    CKEDITOR.config.toolbar = [
        ['Styles', 'Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
        '/',
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Smiley', 'TextColor', 'BGColor', 'Source']
    ];
}

function reloadTable(table) {
    $(`#${table}`).DataTable().ajax.reload();
}

function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

var browserDetect = function () {
    var nav = window.navigator,
        ua = window.navigator.userAgent.toLowerCase();

    // Detect browsers (only the ones that have some kind of quirk we need to work around)
    if ((nav.appName.toLowerCase().indexOf("microsoft") != -1 || nav.appName.toLowerCase().match(/trident/gi) !== null))
        return "IE";
    if (ua.match(/chrome/gi) !== null)
        return "Chrome";
    if (ua.match(/firefox/gi) !== null)
        return "Firefox";
    if (ua.match(/safari/gi) !== null)
        return "Safari";
    if (ua.match(/webkit/gi) !== null)
        return "Webkit";
    if (ua.match(/gecko/gi) !== null)
        return "Gecko";
    if (ua.match(/opera/gi) !== null)
        return "Opera";

    // If any case miss we will return null
    return null
};

function updateModalWidthPosition() {
    let modalContainerWidth = parseInt($('#status-col-wrapper').width());
    let colorPickerContainerWidth = parseInt($('#status-col-wrapper .status-picker-color:first-child').width());
    let numItems = parseInt($('.status-picker-color').length);
    let totalMultiplier = Math.ceil((numItems / 5));
    totalMultiplier = numItems % 5 == 0 ? (++totalMultiplier) : totalMultiplier;

    let modalDialogWidth = parseInt(colorPickerContainerWidth * totalMultiplier);
    modalDialogWidth += totalMultiplier * 20;
    modalDialogWidth = modalDialogWidth < 300 ? 300 : modalDialogWidth;

    if (modalDialogWidth != modalContainerWidth) {
        $('#status-col-wrapper').parents('.modal-dialog').css({ width: `${modalDialogWidth}px` });
    }
}

// This is the actual copy function.
// It expects an HTML string to copy as rich text.

function copyText(html) {
    // Create an iframe (isolated container) for the HTML
    var container = document.createElement('div')
    container.innerHTML = html

    // Hide element
    container.style.position = 'fixed'
    container.style.pointerEvents = 'none'
    container.style.opacity = 0

    // Detect all style sheets of the page
    var activeSheets = Array.prototype.slice.call(document.styleSheets)
        .filter(function (sheet) {
            return !sheet.disabled
        })

    // Mount the iframe to the DOM to make `contentWindow` available
    document.body.appendChild(container)

    // Copy to clipboard
    window.getSelection().removeAllRanges()

    var range = document.createRange()
    range.selectNode(container)
    window.getSelection().addRange(range)

    document.execCommand('copy')

    // Remove the iframe
    document.body.removeChild(container)
}

const toNum = (val = 0) => !$.isNumeric($.trim(val)) ? 0 : parseFloat($.trim(val));

const number_format = (num, decimal_places = 2) => parseFloat(num).toFixed(decimal_places);

const array_sum = arr => number_format(arr.reduce((pv, cv) => parseFloat(pv) + (parseFloat(cv) || 0)));

const getNumFnVal = (dataArr = [], action = null) => {
    if (dataArr.length == 0) return 0;

    dataArr = dataArr.sort((a, b) => a - b);

    const count = (arr, non_zero = false) => {
        return arr.filter(val => {
            if (non_zero) {
                return $.trim(val) != '' && val > 0;
            } else {
                return $.trim(val) != '';
            }
        }).length
    };

    // 1.None, 2.Sum, 3.Average, 4.Median, 5.Min, 6.Max, 7.Count
    if (action == 1) {
        return '-';
    } else if (action == 2) {
        return number_format(array_sum(dataArr), 2);
    } else if (action == 3) {
        console.log(dataArr);

        return number_format(array_sum(dataArr) / count(dataArr), 2);
    } else if (action == 4) {
        if (count(dataArr) % 2 == 0) {
            return number_format(dataArr[(count(dataArr) / 2) - 1], 2);
        } else {
            return number_format(dataArr[((count(dataArr) + 1) / 2) - 1], 2);
        }
    } else if (action == 5) {
        return Math.min.apply(Math, dataArr.filter(val => val != 0));
    } else if (action == 6) {
        return Math.max.apply(Math, dataArr);
    } else {
        return count(dataArr, true);
    }
}


// Color Picker 
const initColorPicker = ({ default_color = '#C4BAD6', save_string }) => {
    $('.color-picker').each((i, el) => {
        let pickr = Pickr.create({
            el,
            container: 'body',
            theme: 'nano',
            default: default_color,
            swatches: [
                '#f44336',
                '#e91e63f2',
                '#9c27b0e6',
                '#673ab7d9',
                '#3f51b5cc',
                '#2196f3bf',
                '#03a9f4b3',
                '#00bcd4b3',
                '#009688bf',
                '#4caf50cc',
                '#8bc34ad9',
                '#cddc39e6',
                '#ffeb3bf2',
                '#ffc107',
            ],
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: false,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    save: true,
                    clear: false,
                }
            },
            strings: {
                save: save_string
            }
        });
        pickr
            .on('init', instance => {
                let color = $(instance._root.button).parent('.pickr').prev('input[type="hidden"]').val();
                instance.setColor(color);
            })
            .on('save', (color, instance) => {
                $(instance._root.button).parent('.pickr').prev('input[type="hidden"]').val(color.toHEXA().toString());
            });
    });
}

// For telInput Plugin
const dial_codes = {
    "358": "fi", "93": "af", "355": "al", "213": "dz", "1684": "as", "376": "ad", "244": "ao", "1264": "ai", "1268": "ag", "54": "ar", "374": "am", "297": "aw", "61": "cc", "43": "at", "994": "az", "1242": "bs", "973": "bh", "880": "bd", "1246": "bb", "375": "by", "32": "be", "501": "bz", "229": "bj", "1441": "bm", "975": "bt", "591": "bo", "387": "ba", "267": "bw", "55": "br", "246": "io", "1284": "vg", "673": "bn", "359": "bg", "226": "bf", "257": "bi", "855": "kh", "237": "cm", "1": "us", "238": "cv", "599": "cw", "1345": "ky", "236": "cf", "235": "td", "56": "cl", "86": "cn", "57": "co", "269": "km", "243": "cd", "242": "cg", "682": "ck", "506": "cr", "225": "ci", "385": "hr", "53": "cu", "357": "cy", "420": "cz", "45": "dk", "253": "dj", "1767": "dm", "593": "ec", "20": "eg", "503": "sv", "240": "gq", "291": "er", "372": "ee", "251": "et", "500": "fk", "298": "fo", "679": "fj", "33": "fr", "594": "gf", "689": "pf", "241": "ga", "220": "gm", "995": "ge", "49": "de", "233": "gh", "350": "gi", "30": "gr", "299": "gl", "1473": "gd", "590": "mf", "1671": "gu", "502": "gt", "44": "gb", "224": "gn", "245": "gw", "592": "gy", "509": "ht", "504": "hn", "852": "hk", "36": "hu", "354": "is", "91": "in", "62": "id", "98": "ir", "964": "iq", "353": "ie", "972": "il", "39": "va", "1876": "jm", "81": "jp", "962": "jo", "7": "ru", "254": "ke", "686": "ki", "383": "xk", "965": "kw", "996": "kg", "856": "la", "371": "lv", "961": "lb", "266": "ls", "231": "lr", "218": "ly", "423": "li", "370": "lt", "352": "lu", "853": "mo", "389": "mk", "261": "mg", "265": "mw", "60": "my", "960": "mv", "223": "ml", "356": "mt", "692": "mh", "596": "mq", "222": "mr", "230": "mu", "262": "re", "52": "mx", "691": "fm", "373": "md", "377": "mc", "976": "mn", "382": "me", "1664": "ms", "212": "eh", "258": "mz", "95": "mm", "264": "na", "674": "nr", "977": "np", "31": "nl", "687": "nc", "64": "nz", "505": "ni", "227": "ne", "234": "ng", "683": "nu", "672": "nf", "850": "kp", "1670": "mp", "47": "sj", "968": "om", "92": "pk", "680": "pw", "970": "ps", "507": "pa", "675": "pg", "595": "py", "51": "pe", "63": "ph", "48": "pl", "351": "pt", "974": "qa", "40": "ro", "250": "rw", "290": "sh", "1869": "kn", "1758": "lc", "508": "pm", "1784": "vc", "685": "ws", "378": "sm", "239": "st", "966": "sa", "221": "sn", "381": "rs", "248": "sc", "232": "sl", "65": "sg", "1721": "sx", "421": "sk", "386": "si", "677": "sb", "252": "so", "27": "za", "82": "kr", "211": "ss", "34": "es", "94": "lk", "249": "sd", "597": "sr", "268": "sz", "46": "se", "41": "ch", "963": "sy", "886": "tw", "992": "tj", "255": "tz", "66": "th", "670": "tl", "228": "tg", "690": "tk", "676": "to", "1868": "tt", "216": "tn", "90": "tr", "993": "tm", "1649": "tc", "688": "tv", "1340": "vi", "256": "ug", "380": "ua", "971": "ae", "598": "uy", "998": "uz", "678": "vu", "58": "ve", "84": "vn", "681": "wf", "967": "ye", "260": "zm", "263": "zw"
};

$(document).ready(function (e) {
    if ($('.select2-class').length > 0) { $('.select2-class').select2({ width: '100%' }); }
    if ($('.select2-class2').length > 0) { $('.select2-class2').select2({ width: '100%', allowClear: true }); }

    if ($('.date-picker').length > 0) {
        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyy-mm-dd'
        });
    }

    if ($('.dob-picker').length > 0) {
        $('.dob-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'dd M, yyyy',
            endDate: new Date(),
        });
    }

    if ($('.timepicker-class').length > 0) { $('.timepicker-class').timepicker(); }

    // regex: /^bg-/
    $.fn.removeClassRegex = function (regex) {
        return $(this).removeClass(function (index, classes) {
            return classes.split(/\s+/).filter(function (c) {
                return regex.test(c);
            }).join(' ');
        });
    };
});
