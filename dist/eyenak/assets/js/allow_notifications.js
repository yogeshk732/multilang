// @ts-nocheck

if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
}
else if (Notification.permission !== 'denied' || Notification.permission === "default") {
    Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (!permission === "granted") {
            return false;
        }
    });
}





let title = 'Monday';
let options = {
    body: 'Test Notifications',
    icon: '/assets/images/star.png',
    image: '/assets/images/star.png'
}

let newNotification = new Notification(title, options);

newNotification.onclick = function () {
    new Notification('Clicked');
    this.close();
};

// window.setTimeout(function () { newNotification.close(); }, 1000);