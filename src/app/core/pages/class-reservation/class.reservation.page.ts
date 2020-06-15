import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { Class } from '../../model/classs.model';
import { NotifierService } from 'angular-notifier';
import { DataBaseService } from '../../services/data-base.service';
import { ClassReservation } from '../../model/class-reservation.model';
import Student from '../../model/student.model';
import Reservation from '../../model/reservation.model';
import { AuthenticationService } from '../../services/authentication.service';




@Component({
  selector: 'app-class.reservation',
  templateUrl: './class.reservation.page.html',
  styleUrls: ['./class.reservation.page.scss'],
})

export class ClassReservationPage implements OnInit {

  selectClass: string;
  reservation = new ClassReservation;
  joinReservation = new Array<Reservation>();
  classes = new Array<Class>();
  students = new Array<Student>();
  classReservation = new Array<ClassReservation>();
  isAddReservation = false;
  uid: any;

  constructor(
    @Inject(NotifierService) private notifier: NotifierService,
    @Inject(DataBaseService) private baseSvc: DataBaseService,
    @Inject(AuthenticationService) private authSvc: AuthenticationService,
  ) {
    this.baseSvc.read('classes')
      .subscribe((snap) => {
        snap.forEach((item) => {
          const cls = item.data() as Class;
          cls.objectId = item.id;
          this.classes.push(cls);
        });
      });
    this.baseSvc.read('students')
      .subscribe((snap) => {
        snap.forEach((item) => {
          const st = item.data() as Student;
          st.objectId = item.id;
          this.students.push(st);
        });
      });
  }


  ngOnInit() {

    this.uid = this.authSvc.getUser() ? this.authSvc.getUser() : '';

    this.baseSvc.read('class-student')
      .subscribe((snap) => {
        snap.forEach((item) => {
          const cls = item.data() as ClassReservation;
          cls.objectId = item.id;
          this.classReservation.push(cls);
        });
      });
    this.getReservation();
  }


  getReservation() {

    const classRes = this.baseSvc.readOnlyRef('class-student');
    const classes = this.baseSvc.readOnlyRef('classes');
    const student = this.baseSvc.readOnlyRef('students');

    classRes.get().subscribe((res) => {
      res.forEach((r) => {
        const arr = new Reservation();
        let arrStudent;
        arr.reservation = r.data() as ClassReservation;
        classes.doc(r.data().classId).get().subscribe((cl) => {
          arr.class = cl.data() as Class;
        });

        r.data().students.forEach((st) => {
          arrStudent = new Array<Student>();
          student.doc(st).get().subscribe((s) => {
            arrStudent.push(s.data() as Student);
          });
        });
        arr.students = arrStudent;
        this.joinReservation.push(arr);
      });
    });

  }


  Save() {
    this.baseSvc.create('class-student', this.reservation)
      .then(() => {
        this.notifier.notify('Info', 'Data has been saved');
        this.isAddReservation = false;
      });
  }

  test() {
    this.baseSvc.readOnlyRef('price')
      .get()
      .subscribe((snap) => {
        snap.forEach((item) => {
          item.data().book.get().then((a) => {
            console.log(a.data().name);
          });
        });
      });
  }


  auth() {
    // let uid;
    // this.authSvc.signIn('test2@mail.com', 'qwerty12')
    // .then(res=>{
    //   //console.log( this.authSvc.getUser());
    //   uid = res.user.uid
    // })

    // //this.authSvc.signOut();

    // let onGroup = false;

    // this.baseSvc.readOnlyRef('groups').doc('HomeGroup').get()
    // .subscribe((snap)=>{
    //  snap.data().users.forEach((us)=>{
    //     if(uid == us){
    //       onGroup = true;
    //     }
    //     console.log(uid);
    //     console.log(us);
    //  })
    //  console.log('Auth : '+ onGroup);
    // })

    this.authSvc.signOut()
      .then(res => {
        this.authSvc.Redirect('login');
      });

  }

}
