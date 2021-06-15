import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
contactUs=true;
newsLetter=true;
specialGift=true;
Information=true;
ourCompany=true;
Category=true;
  constructor() { }

  ngOnInit() {
  
this.onSmallScreen();
  }
  
  onSmallScreen(){
    let mediaQuery= window.matchMedia('(max-width: 991px)');
  if(mediaQuery.matches){
    this.contactUs=false;
    this.newsLetter=false;
    this.specialGift=false;
    this.Information=false;
    this.ourCompany=false;
    this.Category=false;
  }
  }
onContactUS(){
  this.contactUs=!this.contactUs;
}

onNewsLetter(){
this.newsLetter=!this.newsLetter;
}
onSpecialGift(){
this.specialGift=!this.specialGift;
}
onInformation(){
  this.Information=!this.Information;
}
onOurCompany(){
  this.ourCompany=!this.ourCompany;
}
onCategory(){
  this.Category=!this.Category;
}
}
