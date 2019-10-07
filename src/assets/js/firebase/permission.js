if ('PushManager' in window) {
    function askPermission() {
        return new Promise(function (resolve, reject) {
            if (typeof app_settings === 'undefined') {
                $('.overlay').fadeIn();
            }
            const permissionResult = Notification.requestPermission(function (result) {
                resolve(result);
            });

            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
            .then(function (permissionResult) {
                if (typeof app_settings === 'undefined') {
                    $('.overlay').fadeOut();
                }
                if (permissionResult !== 'granted') {
                    throw new Error('We weren\'t granted permission.');
                }
            });
    }

    askPermission();
}
showCompatibilityAlert();

function showCompatibilityAlert() {
    let features = [];
    if(!('PushManager' in window)) {
        features.push('Notifications');
    }
    if(!('indexedDB' in window)) {
        features.push('IndexedDB');
    }
    if(!('localStorage' in window)) {
        features.push('Local Storage');
    }
    
    if(features.length > 0) {
        $.fn.ihavecookies.cookie('preferences');
        $('body').ihavecookies({
            title: '&#128276; Browser Features Alert',
            message: `Sorry! Your browser doesn\'t support ${features.join(', ')}. <br><br> Kindly update your browser or change it.`,
            delay: 600,
            expires: 365,
            moreInfoLabel: '',
            acceptBtnLabel: 'Close',
            cookieTypes: [
                {
                    type: 'Site Preferences',
                    value: 'preferences',
                },
            ],
        });
    }
}