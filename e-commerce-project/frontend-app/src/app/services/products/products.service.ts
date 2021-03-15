import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../../models/products.model';
import { ProductImage } from '../../models/productimage.model';
import { Constants } from '../../lib/constants';


@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(public constants: Constants, public http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get<any>(`${this.constants.productUrl}/Product/all?includes=ProductImages`).pipe(
            map((res: any) => <Product[]>res),
            catchError((err: any) => throwError(err))
        );
    }

    getProduct(id: any): Observable<any> {
        return this.http.get<any>(`${this.constants.productUrl}/Product/${id}?includes=ProductImages`).pipe(
            map((res: any) => <Product[]>res),
            catchError((err: any) => throwError(err))
        );
    }

    addProduct(product: any) {
        return this.http.post<any>(`${this.constants.productUrl}/Product`, product).pipe(
            map((res: any) => <ProductImage[]>res),
            catchError((err: any) => throwError(err))
        );
    }

    updateProduct(product: any) {
        return this.http.put<any>(`${this.constants.productUrl}/Product/${product.id}`, product).pipe(
            map((res: any) => <ProductImage[]>res),
            catchError((err: any) => throwError(err))
        );
    }

    getProductImages(productId: any): Observable<any> {
        return this.http.get<any>(`${this.constants.productUrl}/ProductImage/Product/${productId}`).pipe(
            map((res: any) => <ProductImage[]>res),
            catchError((err: any) => throwError(err))
        );
    }

    deleteProductImage(imageId: any) {
        return this.http.delete<any>(`${this.constants.productUrl}/ProductImage/${imageId}`).pipe(
            map((res: any) => res),
            catchError((err: any) => throwError(err))
        );
    }

    deleteProduct(productId: any) {
        return this.http.delete<any>(`${this.constants.productUrl}/Product/${productId}`).pipe(
            map((res: any) => res),
            catchError((err: any) => throwError(err))
        );
    }

    uploadImageToAzure(url: any, byteArray: any) {
        let headers = {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            "Access-Control-Allow-Headers": "Origin, Content-Type, x-ms-*",
            "Content-type": "image/jpeg",
            "x-ms-blob-type": "BlockBlob"
        };
        return this.http.put<any>(url, byteArray, { headers: headers }).pipe(
            map((res: any) => res),
            catchError((err: any) => throwError(err))
        );
    }

    addProductImage(product: any) {
        return this.http.post<any>(`${this.constants.productUrl}/ProductImage`, product).pipe(
            map((res: any) => <ProductImage[]>res),
            catchError((err: any) => throwError(err))
        );
    }
}