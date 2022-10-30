import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TutorialService {

  private API_ENDPLOINT: string = environment.apiUrl;

  httpHeaders = new HttpHeaders().set(
    'Content-Type','application/json'
  );

  constructor(private http:HttpClient) { }

  getList(search: string):Observable<any[]> {
    return this.http.get<any[]>(`${this.API_ENDPLOINT}/tutorials?q=${search}`)
    .pipe(catchError(this.handlerError))
  }

  getListById(id: number):Observable<any[]> {
    return this.http.get<any[]>(`${this.API_ENDPLOINT}/tutorials/${id}`)
    .pipe(catchError(this.handlerError))
  }

  deleteById(id:any){
    return this.http.delete(`${this.API_ENDPLOINT}/tutorials/${id}`).pipe(
      catchError(this.handlerError)
    )
  }

  addData(obj:any) {
    return this.http.post(`${this.API_ENDPLOINT}/tutorials`, obj).pipe(
      catchError(this.handlerError)
    )
  }

  editData(id: number, obj: any) {
    return this.http.put(`${this.API_ENDPLOINT}/tutorials/${id}`, obj).pipe(
      catchError(this.handlerError)
    )
  }

  handlerError(error:HttpErrorResponse){
    console.log('💥 Error: ', error)
    let errMsg='';
    if(error.error instanceof ErrorEvent){
      errMsg = error.error.message;
    }else{
      errMsg = error.status + ',' + error.message;
    }
    return throwError(errMsg);
  }

}
