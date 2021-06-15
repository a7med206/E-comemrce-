import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ProductsService } from '../myProducts/Products.service';

interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered ?: boolean;

}
@Injectable()
export class AuthService {
    user = new BehaviorSubject<User>(null);
    errorMsge: string='';
    id:string;
    private tokenExpirationTimer:any;
    constructor (private http: HttpClient,
        private router: Router,
        private productService: ProductsService ) {}

   
   signUp(email:string, password: string){
       return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyc-T2_TqTu5PCUytnv84dzB1misBtZ_w",
       {
           email: email,
           password: password,
           returnSecureToken: true
       } )
       .pipe(catchError(this.handleError),
        tap(resData =>{
           this.handleAuthentication(resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
       }) )
     }

    

   Login(email: string, password: string){
  return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyc-T2_TqTu5PCUytnv84dzB1misBtZ_w",
  {
   email: email,
   password:password,
   returnSecureToken: true

} )
.pipe(catchError(this.handleError),
tap(resData =>{
    this.handleAuthentication(resData.email,
     resData.localId,
     resData.idToken,
     +resData.expiresIn)
}))

 }
  handleAuthentication(email:string, userId:string, token:string, expiresIn:number){

    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000);
     const user = new User(
       email,
       userId,
       token,
       expirationDate
       );
       this.user.next(user) ;
       this.autoLogOut(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
 }

private handleError(errorRes:HttpErrorResponse){
    
    let errorMsge= "unknown error occurred";
    if (!errorRes.error || !errorRes.error.error){
        return throwError(errorMsge)
    }
   switch (errorRes.error.error.message){
   case 'EMAIL_EXISTS':
   errorMsge ='This email already exists';
   break;
   case 'INVALID_PASSWORD':
    errorMsge ='Password is incorrect';
    break;
    case 'EMAIL_NOT_FOUND':
    errorMsge ='Email was not found please try again or sign up';
        
     
} 
 return throwError(errorMsge);
}


autoLogin(){
     const userData: {
        email:string,
         id:string,
         _token:string,
         _tokenExpirationDate: string
     } = JSON.parse(localStorage.getItem('userData'));
     if (!userData) {
         return;
     }
     const loadedUser = new User(userData.email,
        userData.id,
        userData._token,
         new Date(userData._tokenExpirationDate));
         if (loadedUser.token) {
             this.user.next(loadedUser);
             const expirationDuration= new Date(userData._tokenExpirationDate).getTime() -
             new Date().getTime();
             this.autoLogOut(expirationDuration);
         }
         this.productService.id= userData.id;
}
logOut(){
    this.user.next(null);
    this.router.navigate(['./Specials']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['Specials']);
}
autoLogOut(expirationDuration: number){
    console.log(expirationDuration);
  this.tokenExpirationTimer=  setTimeout( () => {
        this.logOut();
    },expirationDuration)

}
}
