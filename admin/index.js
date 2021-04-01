const admin = require('firebase-admin');
const serviceAccount = require('./fir-a22ad-firebase-adminsdk-37n2x-1a2a57f132.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-a22ad.firebaseio.com"
})

var message = {
    notification: {
        title: "Test From Admin SDK",
        body: "This is a test message from Admin SDK"
    },
    data: {

    },
    android: {
        notification: {
            sound: "default"
        },
    },
    apns: {
        payload: {
            aps: {
                sound : "default",
            },
        },
    },
    topic: "general"
}

admin.messaging().send(message)
.then(res => {
    console.log(`Successfully Sent Notification ${res}`);
})
.catch(err => {
    console.log(`Error Sending Notification ${err}`);
})