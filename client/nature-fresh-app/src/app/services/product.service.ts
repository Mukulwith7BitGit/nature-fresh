import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductView } from '../models/ProductView';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public createProduct(product: ProductView): Observable<ProductView> {
    let url: string = `http://127.0.0.1:5000/api/v1/products`;
    console.log("url:", url, "product:", product);
    return this.httpClient.post<ProductView>(url, product).pipe(
      catchError(this.handleError)
    );
  }

  public updateProduct(productId: string, product: ProductView): Observable<ProductView> {
    let url: string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.put<ProductView>(url, product).pipe(
      catchError(this.handleError)
    );
  }

  public getAllProducts(): Observable<ProductView[]> {
    let url: string = `http://127.0.0.1:5000/api/v1/products/`;
    return this.httpClient.get<ProductView[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  public getProduct(productId: string): Observable<ProductView> {
    let url: string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.get<ProductView>(url).pipe(
      catchError(this.handleError)
    );
  }

  public deleteProduct(productId: string): Observable<ProductView> {
    let url: string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.delete<ProductView>(url).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = '';
    if (err.status === 0) {
      errorMessage = 'An error occured: ' + err.error;
    } else {
      errorMessage = `Backend returned status code ${err.status}, with body: ${err.error}`;
    }
    errorMessage += "\n Something went wrong!!! Please try again later.";
    return throwError(errorMessage);
  }
}