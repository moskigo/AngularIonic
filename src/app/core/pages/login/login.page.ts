import { Component, OnInit, Inject } from '@angular/core';
// import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationStart } from '@angular/router';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  uiConfig: any;
  ui: any;
  email: string;
  pass: string;


  constructor(
    @Inject(AuthenticationService) private authSvc: AuthenticationService,
    @Inject(NotifierService) private notifier: NotifierService,

    public router: Router
  ) {
    // this.uiConfig = {
    //   signInSuccessUrl: '<url-to-redirect-to-on-success>',
    //   signInOptions: [
    //     // Leave the lines as is for the providers you want to offer your users.
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //     firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //     firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //     firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    //   ],
    //   // tosUrl and privacyPolicyUrl accept either url string or a callback
    //   // function.
    //   // Terms of service url/callback.
    //   tosUrl: '<your-tos-url>',
    //   // Privacy policy url/callback.
    //   privacyPolicyUrl: function() {
    //     window.location.assign('<your-privacy-policy-url>');
    //   }
    // };
    // this.ui = null;
    // this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  }

  ngOnInit() {

    this.auth();
  }


  auth() {
    // this.ui.start('#firebaseui-auth-container', this.uiConfig)
  }

  Login() {

    this.authSvc.signIn(this.email, this.pass)
      .then(res => {
        this.router.navigate(['class']);
      })
      .catch(err => {
        this.notifier.notify('warning', err);
      });
  }

  LoginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.authSvc.signInGoogle(provider);
  }

}
