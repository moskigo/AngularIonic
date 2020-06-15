
import { Status } from './status.model';
import IDataModel from './IData.model';


export default class Student extends IDataModel {

     public constructor() { super(); }

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirthday: Date;
    status: string;
    
}
