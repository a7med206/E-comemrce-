import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './signing-form/Auth.service';
import { Subscription } from 'rxjs';
import { ProductsService } from './myProducts/Products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'E-commerce';
  private userSub: Subscription;
  isAuthenticated= false;
id:string;
DropDownToggle= true;
  constructor (private authService:AuthService,
    private router : Router) {}
  
  ngOnInit(){
    this.authService.autoLogin();
    this.userSub =  this.authService.user.subscribe(
   user =>{
     this.isAuthenticated = !user ? false : true;
   }
 );

  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  reload(){
    window.location.href="http://localhost:4200/myProducts" ;
  }
  dropDownToggle(){
this.DropDownToggle= !this.DropDownToggle;
  }
  
}
