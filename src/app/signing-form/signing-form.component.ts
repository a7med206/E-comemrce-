import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './Auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signing-form',
  templateUrl: './signing-form.component.html',
  styleUrls: ['./signing-form.component.css']
})
export class SigningFormComponent implements OnInit {
 @ViewChild('signingIn', {static: false})  signInForm : NgForm ;
 @ViewChild('signup', {static: false}) signingUpForm :NgForm;
correct=false;
errorMsg='' ;
isLoading= false;
id: string;

 
constructor(private authService: AuthService,
  private router:Router,
  ) { }

  ngOnInit() {
  }

  signIN() {
    this.correct=true ;
    let signIN = document.getElementById('signIn');
        signIN.classList.add('color');   

    let signUp = document.getElementById('signUp');
      signUp.classList.remove('color');
        }

  signUp(){
    this.correct=false;
    let signUP = document.getElementById('signUp');
    signUP.classList.add('color');   

   let signIn = document.getElementById('signIn');
    signIn.classList.remove('color');
  }
  

  onSignUpSubmit(signup: NgForm) {
   console.log(signup.value);
   this.errorMsg='';
   if (!signup.valid){
       return;
   }
   const email= signup.value.email;
   const password = signup.value.password;
   this.isLoading=true;
   this.authService.signUp(email,password).subscribe(resData =>{
     console.log(resData);
     this.isLoading=false;
     this.router.navigate(['./sitemap']);

   },
   errorMsge => {
     console.log(errorMsge);
    this.errorMsg=errorMsge;
    
    this.isLoading=false;
    

   } );
   this.signingUpForm.reset();
  }
  
  onSignIn(signInForm: NgForm) {
    console.log(signInForm.value);
    this.errorMsg='';
  
   const email :string = signInForm.value.email;
   const password  :string = signInForm.value.password;
   this.isLoading=true;
  this.authService.Login(email,password).subscribe(resData => {
    console.log(resData);
    this.isLoading=false;
    this.router.navigate(['./sitemap']);
this.id  = resData.localId;
  //  console.log(this.id)
  //  this.productService.id= this.id;
   console.log(this.id);
    }, 
  errorMsge => {
    console.log(errorMsge);
   this.errorMsg=errorMsge; 
   this.isLoading=false;
  });

    this.signInForm.reset();
  }
 

}
