import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild ( 'navbarNav' , {static: false}) navbar;

  title = 'E-commerce';
  private userSub: Subscription;
  isAuthenticated= false;
id:string;
isOpen=true;
isClicked=true;
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

 this.navCollapse();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


  navCollapse(){
    const mediaQuery = window.matchMedia('(max-width:700px)')
      if(mediaQuery.matches){
        this.isOpen=false;
        this.isClicked=false;
      }
    }
navCollapseTwo(){
  this.navbar.nativeElement.classList.toggle("show");

}
  dropDownToggle(){
this.DropDownToggle= !this.DropDownToggle;
  }
  
}
