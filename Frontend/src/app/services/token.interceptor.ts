import { AuthService } from './../modules/auth/_services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('userDetailToken'));
    const Token = localStorage.getItem('Token');
    const token = (Token) ? Token : null;
    const role = (currentUser) ? currentUser.role : null;
    
    if(req.url.indexOf("/auth/login") === -1){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      tap((ev: HttpEvent<any>) => { }),
      catchError((error: HttpErrorResponse) => {
        // cann't access admin
        if (error.status === 401) {
          this.authService.logout();
          if (role !== 'customer') {
            // this.router.navigate(['/admin']);
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/login']);
          }
        }else if(error.status === 401){
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}

