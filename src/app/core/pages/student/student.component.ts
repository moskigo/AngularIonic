import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Status } from '../../model/status.model';
import { DataBaseService } from '../../services/data-base.service';
import Student from '../../model/student.model';
import { NotifierService } from 'angular-notifier';


import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import {AngularFireAuth} from '@angular/fire/auth';

import { AngularFireMessaging } from '@angular/fire/messaging';
import { MessagingService } from '../../services/messaging.service';
// import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [Camera, Push, AngularFireMessaging, MessagingService],
})
export class StudentComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  students: Array<Student> = [];
  newStudent: boolean;
  status = Status;
  createStudent = new Student();
  tableName = 'students';
  studentDetail: Student = null;
  showStudentDetail = false;
  myPhoto = null;
  lat: number;
  lon: number;


  message;

  constructor(
    private push: Push,
    // private fcm: FCM,

    private camera: Camera,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    // private msgService: MessagingService,
    // private angularFireMessaging: AngularFireMessaging,
    @Inject(NotifierService) private notifier: NotifierService,
    @Inject(DataBaseService) private baseSvc: DataBaseService,
    // @Inject(AngularFireAuth) private authSvc: AngularFireAuth,
  ) {
  }



  ngOnInit() {
    this.getData();
    // console.log(Push);

    this.pushService();

    //  this.getToken();
    this.getFirebaseData();

  }

  getFirebaseData() {
    // this.fcm.getToken()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  }

  getToken() {
    // this.msgService.getPermission();
    // this.msgService.receiveMessage();
    // this.message = this.msgService.currentMessage;
  }


  pushService() {
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          this.initPush();
          this.notifier.notify('error', 'We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
          this.notifier.notify('error', 'We do not have permission to send push notifications');
        }

      })
      .catch((err: any) => this.errorHandler(err));

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    // this.push.createChannel({
    //   id: 'testchannel1',
    //   description: 'My first test channel',
    //   // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    //   importance: 3
    // }).then(() => {
    //   console.log('Channel created');
    //   this.notifier.notify('error', 'Channel created');
    // });

    // Delete a channel (Android O and above)
    // this.push.deleteChannel('testchannel1').then(() => {
    //   console.log('Channel deleted');
    //   this.notifier.notify('error', 'Channel deleted');
    // });

    // this.push.listChannels().then((channels) => {
    //   console.log('List of channels', channels);
    //   this.notifier.notify('error', 'List of channels');
    // });

  }

  initPush() {
    const options: PushOptions = {
      android: {
        senderID: '455698471485'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      // windows: {},
      // browser: {
      //   pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      // }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Device registered', notification);
      this.presentAlert(notification);


    });

    pushObject.on('registration').subscribe((registration: any) => {
      // alert('Event=registration, registrationId=' + registration.registrationId);
      console.log('Device registered', registration);
      this.notifier.notify('error', 'Device registered');

    });

    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin', error);
      this.notifier.notify('error', 'Error with Push plugin');

    });
  }

  async presentAlert(notification) {
    const alert = await this.alertCtrl.create({
      header: 'Notification',
      subHeader: notification.title,
      message: notification.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getData() {
    this.baseSvc.read('students')
      .subscribe((snap) => {
        this.students = new Array<Student>();

        snap.forEach((item) => {
          let st = new Student();
          st = item.data() as Student;
          st.objectId = item.id;
          this.students.push(st);
        });
      });

  }

  getGeo() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: true })
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
      })
      .catch((err) => this.errorHandler(err));
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 80,
      targetHeight: 1000,
      targetWidth: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then((imageData) => this.myPhoto = 'data:image/jpeg;base64,' + imageData)
      .catch((err: any) => this.errorHandler(err));
  }

  loadData(event: any) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.getData();
      if (this.students.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }


  toggleInfiniteScroll() {
    // if (this.infiniteScroll) {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    console.log(this.infiniteScroll.disabled);
    // this.infiniteScroll.disabled = false;
    // }
  }

  CreateStudent(form: any) {
    if (form.valid) {
      this.baseSvc.create('students', this.createStudent)
        .then((res) => {
          this.newStudent = false;
          this.createStudent.objectId = res.id;
          this.students.push(this.createStudent);
          this.notifier.notify('info', 'Data was saved');
        });
    } else {
      form._submitted = true;
    }
  }

  DetailStudent(studetId: string) {
    this.baseSvc.readById('students', studetId)
      .subscribe((res) => {
        this.createStudent = res.data() as Student;
        this.createStudent.objectId = res.id;
        this.studentDetail = this.createStudent;
        this.showStudentDetail = true;
      });
  }

  Back() {
    this.ngOnInit();
    this.showStudentDetail = false;
  }

  RemoveStudent(studentId: string) {
    this.baseSvc.delete('students', studentId)
      .then((res) => {
        this.ngOnInit();
        this.notifier.notify('info', 'Data has been deleted');

      });
  }

  errorHandler(err: Error | any) {
    const errMsg = `${err.code ? err.code : ''} ${err.message ? err.message : ''}`;
    console.log(err); // only for dev_________
    this.notifier.notify('error', `${errMsg ? errMsg : 'Something went wrong'}  ${err}`);
  }

}
