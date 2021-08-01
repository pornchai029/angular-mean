import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class Book {
  _id !: String;
  name !: String;
  price !: String;
  description !: String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API : string = 'http://localhost:8000/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')


  constructor(private httpClient: HttpClient) { }


  //add
  AddBook(data: Book): Observable<any> {
     let API_URL = `${this.REST_API}/add-book`;
     return this.httpClient.post(API_URL, data)
     .pipe(
       catchError(this.handleError)
     )

  }


  //get all object


  GetBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  //get single object
  GetBook(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/read-book/${id}`;
      return this.httpClient.get(API_URL, {headers : this.httpHeaders})
      .pipe(map((res:any) =>{
         return res || {}
      }),
         catchError(this.handleError)
      )
  }

    //update
    updateBook(id: any, data:any): Observable<any> {
      let API_URL = `${this.REST_API}/update-book/${id}`;
      return this.httpClient.put(API_URL, data, {headers : this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
    }

    //update
    deleteBook(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/delete-book/${id}`;

      console.log(API_URL)

      return this.httpClient.delete(API_URL, {headers:this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
    }


  //error
  handleError(error: HttpErrorResponse){
     let errorMessage = '';
     if(error.error instanceof ErrorEvent){
        // client error
        errorMessage = error.error.message;
     }else {
        // serverr error
        errorMessage = `Error Code : ${error.status}\n${error.message}`
     }
     console.log(errorMessage);
     return throwError(errorMessage)
  }
}
