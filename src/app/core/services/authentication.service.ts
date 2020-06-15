import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements CanActivate {



  canActivate(): boolean {
    if (this.db.auth.currentUser != null) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }


  constructor(
    @Inject(AngularFireAuth) private db: AngularFireAuth,

    public router: Router
  ) {


  }

  signInGoogle(provider: any) {
    this.db.auth.signInWithPopup(provider)
      .then((res) => {

        this.router.navigate(['class']);
      })
      .catch(err => {
        console.log(err);

      });

  }

  signIn(email: string, password: string) {

    return this.db.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.db.auth.signOut();
  }

  getUser() {
    return this.db.auth.currentUser;
  }

  Redirect(url: string) {
    this.router.navigate([url]);
  }

}
