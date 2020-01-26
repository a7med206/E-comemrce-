import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../myProducts/Products.service';
import { product } from '../myProducts/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadedProducts : product[] = [];
  allProducts: any;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
  this.fetch();
  }
  fetch(){
    this.productService.fetchAllProducts().
    subscribe(products =>{
      console.log(products);
     products.forEach(elem=>{
      this.allProducts = Object.keys(elem).map(key => elem[key]);
      console.log(this.allProducts);   
      // const products = Object.keys(this.allProducts).map(key => this.allProducts[key]);

for( const key in this.allProducts){
  if(this.allProducts.hasOwnProperty(key)){
    this.loadedProducts.push({...this.allProducts[key],id:key})
  }
}
       })


})
  console.log(this.loadedProducts);

  }

}
