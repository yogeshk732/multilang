// @ts-nocheck

// Initialize Firebase
let save_token_url = null;
let page_redirect_url = null;

var firebase_config = {
    apiKey: "AIzaSyBg56Zn-9L4MrtU0JkReZJ9_2cMe6ZsU5Q",
    authDomain: "eyenak-a35b2.firebaseapp.com",
    databaseURL: "https://eyenak-a35b2.firebaseio.com",
    projectId: "eyenak-a35b2",
    storageBucket: "eyenak-a35b2.appspot.com",
    messagingSenderId: "32363866084"
};
firebase.initializeApp(firebase_config);
const messaging = firebase.messaging();

async function getFCMToken() {
    let token = await messaging
        .requestPermission()
        .then(function () {
            console.log("Notification permission granted.");
            $('.overlay').fadeOut();
            // get the token in the form of promise
            return messaging.getToken();
        })
        .catch(() => $('.overlay').fadeOut());
    return token;
}

function listenForNotification() {
    messaging.onMessage(payload => drawNotification(payload));

    messaging.onTokenRefresh(function () {
        messaging.getToken().then(function (fcm_token) {
            saveToken({ fcm_token });
        }).catch(err => console.log(err));
    });
}

function drawNotification(payload, show_notification = true) {
    try {
        let extra_data = JSON.parse(payload.data.extraData);
        if (show_notification) {
            new Notification(payload.data.title, {
                body: extra_data.message_2,
                icon: appLogo
            });

            let sound = new Audio(notificationSound);
            sound.play();
        }

        // Append Notification in List
        let $target = $('#notification-wrapper');
        let $notificationCounts = $('#notification-counts');
        $target.find('.no-notifications').remove();
        $target.prepend(`
            <li class="notification-item not-read" data-ref_id="${extra_data.id}" data-bid="${extra_data.board_id}" data-tgid="${extra_data.task_group_id}" data-tid="${extra_data.task_id}" data-tmid="${extra_data.task_message_id}" data-type="${extra_data.notification_type}">
                <a href="javascript:void(0);">
                    <div class="icon-circle">
                        <img src="${extra_data.from_user.profile_image}" width="36" height="36">
                    </div>
                    <div class="menu-info">
                        <h4>${extra_data.message}</h4>
                        <p>
                            <i class="material-icons">access_time</i> ${extra_data.human_readable_date}
                        </p>
                    </div>
                </a>
                <div class="notification_menu_action_container">
                    <a href="javascript:void(0);" class="delete_notification bg_notification">
                        <i class="fa fa-times"></i>
                    </a>

                    <a href="javascript:void(0);" class="mark_read_notification bg_notification">
                        <i class="fa fa-check"></i>
                    </a>
                </div>
            </li>
        `);

        let current_count = parseInt($notificationCounts.text());
        current_count = isNaN(current_count) ? 1 : current_count + 1;
        $notificationCounts.text(current_count);
    }
    catch (e) {
        console.log(e);
    }
}

function saveToken({ fcm_token, url }) {
    save_token_url = url !== undefined ? url : save_token_url;

    let item_name = 'SpTbamIXJh';
    let uuid = localStorage.getItem(item_name) === null ? createUUID() : localStorage.getItem(item_name);
    let _token = $('meta[name="csrf-token"]').attr('content');
    let browser = browserDetect();

    $.post(save_token_url, {
        fcm_token,
        browser,
        uuid,
        _token
    }, () => localStorage.setItem(item_name, uuid));
}

const channel = new BroadcastChannel('eyenak-notification');
channel.addEventListener('message', event => drawNotification(event.data, false));