import IDataModel from './IData.model';


export class ClassReservation extends IDataModel{
    
    classId: string;
    startDate: Date;
    endDate: Date;
    students: string[];
    total: number;
}