import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpecialsComponent } from './specials/specials.component';
import { ContactComponent } from './contact/contact.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ReturnsComponent } from './returns/returns.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { MyProductsComponent } from './myProducts/myProducts.component';
import { SigningFormComponent } from './signing-form/signing-form.component';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService } from './signing-form/Auth.service';
import { NewProductComponent } from './new-product/new-product.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpecialsComponent,
    ContactComponent,
    SiteMapComponent,
    ReturnsComponent,
    SpecialOffersComponent,
    MyProductsComponent,
    SigningFormComponent,
    NewProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
