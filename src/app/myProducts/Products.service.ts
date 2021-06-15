import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {product } from './product.model';
import { map } from 'rxjs/operators'

@Injectable({providedIn:"root"})
export class ProductsService{
    
    constructor(private http: HttpClient,
        ){ }

id:string;



userId(id){
  
this.id=id;
  };  


path:string;

 storeProducts (name:string, info:string, image:string ){
     const productData: product = {
         ProductName: name,
         productDescription: info,
         productImage: image
                                 };
    console.log(productData);
    console.log(this.id);
    this.path= 'https://e-commerce-1350c.firebaseio.com/myProducts/'+ this.id + '.json' ;
    return this.http.post(this.path,
     productData
    ) ;
 }
fetchProducts(){
    console.log(this.id);
    this.path= 'https://e-commerce-1350c.firebaseio.com/myProducts/'+ this.id + '.json' ;
    console.log(this.path);
  return  this.http.get(this.path)
    .pipe(map(resData=>{
const productsArray = [];
for (const key in resData){
    if (resData.hasOwnProperty(key)){
    productsArray.push({...resData[key],id:key});
}}
return productsArray
} 
    ))

}

deletePosts(){
    return this.http.delete(this.path)
}

OnDeleteOneProduct(folderName:string){
 const singlePAth='https://e-commerce-1350c.firebaseio.com/myProducts/'+ this.id + "/" + folderName+ '.json' ;
 console.log(singlePAth);
 return this.http.delete(singlePAth);
}
onUpdateProduct(folderName:string, name:string, info:string,image:string){
    const singlePAth='https://e-commerce-1350c.firebaseio.com/myProducts/'+ this.id + "/" + folderName+ '.json' ;

return this.http.patch(singlePAth,{
    ProductName: name,
    productDescription: info,
productImage: image})
}
fetchAllProducts(){
    return  this.http.get('https://e-commerce-1350c.firebaseio.com/myProducts.json')
    .pipe(map(resData=>{
const productsArray = [];
for (const key in resData){
    if (resData.hasOwnProperty(key)){
    productsArray.push({...resData[key]}) };
}
return productsArray
} 
    ))
}
    }
