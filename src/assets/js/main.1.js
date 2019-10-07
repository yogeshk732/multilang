if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                navigator.serviceWorker.ready.then(
                    function (serviceWorkerRegistration) {
                        console.log('Service Worker Registered Successfully.');
                    });
            }, function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

if ('PushManager' in window) {
    function askPermission() {
        return new Promise(function (resolve, reject) {
            const permissionResult = Notification.requestPermission(function (result) {
                resolve(result);
            });

            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
            .then(function (permissionResult) {
                if (permissionResult !== 'granted') {
                    throw new Error('We weren\'t granted permission.');
                }
            });
    }

    askPermission().then(response => console.log(response));
}
