import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-icon-login',
  templateUrl: './icon-login.component.html',
  styleUrls: ['./icon-login.component.scss'],
})
export class IconLoginComponent implements OnInit {

  uid:any;
  name:string;
  photo:any;

  constructor(
    @Inject(AuthenticationService) private authSvc: AuthenticationService,
  ) { this.name = this.authSvc.getUser()? this.authSvc.getUser().displayName:'';
  this.photo = this.authSvc.getUser()? this.authSvc.getUser().photoURL:'';}

  ngOnInit() {
    this.name = this.authSvc.getUser()? this.authSvc.getUser().displayName:'';
    this.photo = this.authSvc.getUser()? this.authSvc.getUser().photoURL:'';
  }


  signOut(){

  this.authSvc.signOut()
  .then(res=>{
    this.authSvc.Redirect('login');
  })
  }

 test()
{
  this.name = this.authSvc.getUser()? this.authSvc.getUser().displayName:'';
  this.photo = this.authSvc.getUser()? this.authSvc.getUser().photoURL:'';
}

}
