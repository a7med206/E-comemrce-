import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from './Products.service';
import { product } from './product.model';
import { AuthService } from '../signing-form/Auth.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-myProducts',
  templateUrl: './myProducts.component.html',
  styleUrls: ['./myProducts.component.css']
})
export class MyProductsComponent implements OnInit {
@ViewChild('updateProduct', {static:false}) updatingProduct :NgForm;
@ViewChildren('ids' )  newProductID:QueryList< ElementRef >;
isFetching = false;
loadedProducts : product[] = [];
newProduct=true;
userId:string;
idSArray:[];
productID:string;
isUpdating=false;
 constructor( private productService: ProductsService,
  private authService: AuthService) { };



  ngOnInit() {
  
   
  
 

  }

 



 
  

  fetchMyProducts(){
  this.productService.fetchProducts().
  subscribe(products =>{
    this.isFetching=true;
    console.log(products);
    this.loadedProducts= products;
    this.isFetching=false;
});
  }

  fetch(){
    this.productService.fetchProducts().
    subscribe(products =>{
      this.isFetching=true;
      console.log(products);
      this.loadedProducts= products;
      this.isFetching=false;

  });}

  onDeleteProducts(){
    this.isFetching=true;
    this.productService.deletePosts().subscribe(products=>{
      console.log(products);
      this.loadedProducts= [];
      this.isFetching=false;

    })
  }

  DeleteOneProduct(id:string){
  this.productID =  id;
    console.log(this.productID);
      this.productService.OnDeleteOneProduct(this.productID).subscribe(products=>{
        console.log(products);
        this.loadedProducts= [];
        this.fetch();
  })
}
OnUpdateProduct(updatingProduct: NgForm){
console.log(updatingProduct.value);
const product= this.updatingProduct.value.productName;
const Description = this.updatingProduct.value.ProductInfo;
const image = this.updatingProduct.value.productImage;
this.productID =this.updatingProduct.value.productID; ;  
console.log(this.productID);
this.productService.onUpdateProduct(this.productID,product,Description,image).subscribe(Response=>{
  console.log(Response);
})

this.isUpdating=false;
this.loadedProducts= [];
this.fetch();
}
  updateProduct(){
    this.isUpdating=true;
  }
  closeUpdateForm(){
    this.isUpdating=false;
  }
  ngAfterViewInit(){
    this.authService.user.pipe(map(userData=>{
      console.log(userData.id);
      this.userId=userData.id;
      this.productService.userId(this.userId);
      } ));
      console.log(this.productService.id);
this.fetch();
  }
}
 