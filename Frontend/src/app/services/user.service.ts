import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_ENDPLOINT: string = environment.apiUrl;

  httpHeaders = new HttpHeaders().set(
    'Content-Type','application/json'
  );

  constructor(private http:HttpClient) { }

  loginUser(obj:any) {
    return this.http.post(`${this.API_ENDPLOINT}/auth/login`, obj).pipe(
      catchError(this.handlerError)
    )
  }

  userVerify():Observable<any[]> {
    return this.http.get<any[]>(`${this.API_ENDPLOINT}/auth/me`)
    .pipe(catchError(this.handlerError))
  }

  getListUser(search):Observable<any[]> {
    return this.http.get<any[]>(`${this.API_ENDPLOINT}/users?q=${search}`)
    .pipe(catchError(this.handlerError))
  }

  getListParent():Observable<any[]> {
    return this.http.get<any[]>(`${this.API_ENDPLOINT}/users?role=parent`)
    .pipe(catchError(this.handlerError))
  }

  addUser(obj:any) {
    return this.http.post(`${this.API_ENDPLOINT}/users`, obj).pipe(
      catchError(this.handlerError)
    )
  }

  checkEmail(email: string) {
    return this.http.post(`${this.API_ENDPLOINT}/users-email-check`, { email: email}).pipe(
      catchError(this.handlerError)
    )
  }

  checkTel(tel: string) {
    return this.http.post(`${this.API_ENDPLOINT}/users-tel-check`, { tel: tel}).pipe(
      catchError(this.handlerError)
    )
  }

  getUserById(id:string):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPLOINT}/users/${id}`).pipe(
      catchError(this.handlerError)
    )
  }

  updateUser(updatedUser:any, id:string) {
    return this.http.put(`${this.API_ENDPLOINT}/users/${id}`, updatedUser).pipe(
      catchError(this.handlerError)
    )
  }

  deleteUserById(id:any){
    return this.http.delete(`${this.API_ENDPLOINT}/users/${id}`).pipe(
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
