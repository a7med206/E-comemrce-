import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../signing-form/Auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isObject } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
private userSub: Subscription;
isAuthenticated = false;
  constructor(private authService: AuthService,
   private router: Router) { }

  ngOnInit() {
    this.userSub= this.authService.user.subscribe(
      user => {
this.isAuthenticated= !user ? false : true;
      }
    );
  }
  onLogOut(){
    this.authService.logOut();
  }
  Logging(){
    if( !this.isAuthenticated ){
      this.router.navigate(['signingForm'])
    } else {
      this.router.navigate(['Contact']);

    }
  }
 
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
