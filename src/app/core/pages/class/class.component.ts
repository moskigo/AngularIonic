import { Component, OnInit, Inject } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DataBaseService } from '../../services/data-base.service';
import { Class } from '../../model/classs.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {

  classes = Array<Class>();
  class = new Class();
  newClass = new Class();
  addClass = false;


  constructor(
    @Inject(NotifierService) private notifier: NotifierService,
    @Inject(DataBaseService) private baseSvc: DataBaseService,
  ) { }

  ngOnInit() {

    this.baseSvc.read('classes')
      .subscribe((snap) => {
        this.classes = new Array<Class>();
        snap.forEach((item) => {
          this.class = item.data() as Class;
          this.class.objectId = item.id;
          this.classes.push(this.class);
        });
      });
  }


  addNewClass() {
    this.baseSvc.create('classes', this.newClass)
      .then(res => {
        this.classes.push(this.newClass);
        this.notifier.notify('info', 'Data was saved');
        this.addClass = false;
      });
  }


  DeleteClass(id: string) {
    this.baseSvc.readOnlyRef('class-student').get()
      .subscribe((snap) => {

        const hasReservation = snap.docs.findIndex(a => a.data().classId == id);
        if (hasReservation == -1) {
          this.baseSvc.delete('classes', id)
            .then(res => {
              this.notifier.notify('info', 'Data has been deleted');
            });
        } else {
          this.notifier.notify('warning', 'Class has reservation');
        }
        this.ngOnInit();
      });
  }

}
