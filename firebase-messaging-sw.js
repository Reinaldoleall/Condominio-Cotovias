// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyByyM8RvGNM5pyrQIQ7nCH6mmgYAIpq0bc",
    authDomain: "rifas-c414b.firebaseapp.com",
    databaseURL: "https://rifas-c414b-default-rtdb.firebaseio.com",
    projectId: "rifas-c414b",
    storageBucket: "rifas-c414b.appspot.com",
    messagingSenderId: "770195193538",
    appId: "1:770195193538:web:48e585ac5661d27f3dc55b"
});

const messaging = firebase.messaging();

// Background message handler
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Click handler para notificações
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received.', event);
    event.notification.close();

    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});