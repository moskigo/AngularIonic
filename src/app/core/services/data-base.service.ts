import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore/firestore';


@Injectable({
  providedIn: 'root'
})


export class DataBaseService {
  private key: string;
  private value: any;

  constructor
    (
      @Inject(AngularFireDatabase) private _db: AngularFireDatabase,
      @Inject(AngularFirestore) private firestore: AngularFirestore,
  ) { this.test(); }



  read(tableName: string) {
    return this.firestore.collection(tableName)
      .get();
  }

  readById(tableName: string, id: string) {
    return this.firestore.collection(tableName).doc(id).get();
  }


  create(tableName: string, object: any) {
    return this.firestore.collection(tableName).add(JSON.parse(JSON.stringify(object)));
  }

  delete(tableName: string, id: string) {
    return this.firestore.collection(tableName).doc(id).delete();
  }

  readOnlyRef(tableName: string) {
    return this.firestore.collection(tableName);
  }

  test() {

  }


  // fire data base
  // create = (tableName:string, collection: any): any => {
  //   return new Observable((res)=>{
  //     collection.objectId = this._db.database.ref(tableName).push().key;
  //     res.next(this._db.list(tableName).push(collection));
  //   })
  // }


  // read = (tableName:string):Observable<any> => {
  //   return this._db.list<Student>(tableName).valueChanges();
  // }


  // update = (item:any): Observable<any> =>{
  //   this._db.list('students').remove();
  //    return
  // }


  // // delete = (id:any): Observable<any> =>{

  // //   // return new Observable((res)=>{
  // //   //   this._db.list('students').remove()
  // //   // })


  // // }

  // test(){
  // return this._db.database.ref('students');

  // }

  // test2(id:string){

  //     return this._db.database.ref('students').child(id)
  // }

}
