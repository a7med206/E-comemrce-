import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialsComponent } from './specials/specials.component';
import { ContactComponent } from './contact/contact.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ReturnsComponent } from './returns/returns.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { MyProductsComponent } from './myProducts/myProducts.component';
import { SigningFormComponent } from './signing-form/signing-form.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './signing-form/auth.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'Specials' , component:SpecialsComponent },
  {path: 'Contact', component:ContactComponent},
  {path:'sitemap',component:SiteMapComponent},
  {path:'myProducts',component:MyProductsComponent},
  {path:'Returns', component:ReturnsComponent ,   canActivate: [AuthGuard] }, 
  {path:'specialOffers',component:SpecialOffersComponent},
  {path:'signingForm',component:SigningFormComponent },
  {path:'newProduct',component:NewProductComponent},
  {path:'home',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
