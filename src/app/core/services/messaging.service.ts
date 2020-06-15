import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class MessagingService {
    messaging = firebase.messaging();
    currentMessage = new BehaviorSubject(null);

    constructor(
        private db: AngularFireDatabase,
         private afAuth: AngularFireAuth,
        //  private db: AngularFireDatabase, private afAuth: AngularFireAuth
         ) {
          }


    updateToken(token) {
        // this.afAuth.authState.take(1).subscribe(user => {
        //     if (!user) { return; }

        //     const data = { [user.uid]: token }
        //     this.db.object('fcmTokens/').update(data)
        // });
    }

    getPermission() {
        this.messaging.requestPermission()
            .then(() => {
                console.log('Notification permission granted.');
                return this.messaging.getToken();
            })
            .then(token => {
                console.log(token);
                this.updateToken(token);
            })
            .catch((err) => {
                console.log('Unable to get permission to notify.', err);
            });
    }

    receiveMessage() {
        this.messaging.onMessage((payload) => {
            console.log('Message received. ', payload);
            this.currentMessage.next(payload);
        });

    }
    // currentMessage = new BehaviorSubject(null);

    // constructor(
    //     private angularFireDB: AngularFireDatabase,
    //     private angularFireAuth: AngularFireAuth,
    //     private angularFireMessaging: AngularFireMessaging) {

    //     this.angularFireMessaging.messaging.subscribe(
    //         (_messaging) => {
    //             _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //             _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //         }
    //     );
    // }

    // /**
    //  * update token in firebase database
    //  *
    //  * @param userId userId as a key
    //  * @param token token as a value
    //  */
    // updateToken(userId, token) {
    //     // we can change this function to request our backend service
    //     this.angularFireAuth.authState.pipe(take(1)).subscribe(
    //         () => {
    //             const data = {};
    //             data[userId] = token;
    //             console.log(userId);
    //             console.log(token);
    //             this.angularFireDB.object('fcmTokens/').update(data);
    //         });
    // }

    // /**
    //  * request permission for notification from firebase cloud messaging
    //  *
    //  * @param userId userId
    //  */
    // requestPermission(userId) {
    //     this.angularFireMessaging.requestToken.subscribe(
    //         (token) => {
    //             console.log(token);
    //             this.updateToken(userId, token);
    //         },
    //         (err) => {
    //             console.error('Unable to get permission to notify.', err);
    //         }
    //     );
    // }

    // /**
    //  * hook method when new notification received in foreground
    //  */
    // receiveMessage() {
    //     this.angularFireMessaging.messages.subscribe(
    //         (payload) => {
    //             console.log('new message received. ', payload);
    //             this.currentMessage.next(payload);
    //         });
    // }
}
