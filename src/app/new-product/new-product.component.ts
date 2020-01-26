import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../myProducts/Products.service';
import { product } from '../myProducts/product.model';
import { AuthService } from '../signing-form/Auth.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  @ViewChild('newProduct', {static:false}) newProductDetails: NgForm;
  loadedProducts : product[] = [];
  productID:string;
  isLoading=false;

  constructor( private productService: ProductsService,
    private authService: AuthService) { }

  ngOnInit() {
  }


  
  addNewProduct(newProductDetails: NgForm){
    console.log(newProductDetails.value);
    this.isLoading=true;
    const product= this.newProductDetails.value.productName;
    const Description = this.newProductDetails.value.ProductInfo;
    const image = this.newProductDetails.value.productImage;
    this.productService.storeProducts(product,Description,image).subscribe(Response=>{
      console.log(Response);
      this.isLoading=false;
          }) ;
        this.newProductDetails.reset();
      
    }
}
