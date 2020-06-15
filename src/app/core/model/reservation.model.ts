import IDataModel from './IData.model';
import { ClassReservation } from './class-reservation.model';
import { Class } from './classs.model';
import Student from './student.model';


export default class Reservation extends IDataModel{

    reservation: ClassReservation;
    class: Class;
    students: Array<Student>;
    constructor(){
        super();
        this.class = new Class();
    }
}