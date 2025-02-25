import { Injectable } from "@angular/core";
import { IUser } from "./user";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private domain: string = "https://sleepy-peak-69882.herokuapp.com";
  // private domain: string = "http://127.0.0.1:4000";
  private signupUrl = `${this.domain}/api/v1/user/signup`;
  private loginUrl = `${this.domain}/api/v1/user/login`;
  private logoutUrl = `${this.domain}/api/v1/user/logout`;
  private isLoggedInUrl = `${this.domain}/api/v1/user/isLoggedIn`;
  private forgotPasswordUrl = `${this.domain}/api/v1/user/forgotPassword`;
  private updateMyPasswordUrl = `${this.domain}/api/v1/user/updateMyPassword`;
  private resetPasswordUrl = `${this.domain}/api/v1/user/resetPassword`;
  private deleteMeUrl = `${this.domain}/api/v1/user/deleteMe`;

  // ==============================

  // private signupUrl = "/api/v1/user/signup";
  // private loginUrl = "/api/v1/user/login";
  // private forgotPasswordUrl = "/api/v1/user/forgotPassword";
  // private updateMyPasswordUrl = "/api/v1/user/updateMyPassword";
  // private resetPasswordUrl = "/api/v1/user/resetPassword";
  // private deleteMeUrl = "/api/v1/user/deleteMe";

  currentUser: IUser;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  signupUser(body): Observable<any> {
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>(this.signupUrl, body, options).pipe(
      tap(data => {
        console.log("All: " + JSON.stringify(data));
        this.currentUser = data.data.user;
      }),
      catchError(this.handleError)
    );
  }

  loginUser(loginInfo) {
    // let loginInfo = { email: email, password: password };
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http
      .post<any>(this.loginUrl, loginInfo, options)
      .pipe(
        tap(data => {
          this.cookieService.set("jwt", data.token, 30);
          this.currentUser = data.data.user;
          console.log(data);
        })
      )
      .pipe(catchError(this.handleError));
  }

  // /////////////////////////////////////////////

  forgotPassword(body): Observable<IUser> {
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<IUser>(this.forgotPasswordUrl, body, options).pipe(
      // tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateMyPassword(body): Observable<IUser> {
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.patch<IUser>(this.updateMyPasswordUrl, body, options).pipe(
      // tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  resetPassword(body, resetToken): Observable<IUser> {
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .patch<IUser>(`${this.resetPasswordUrl}/${resetToken}`, body, options)
      .pipe(
        // tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //   deleteMe(body, resetToken): Observable<IUser> {
  //     let options = {
  //       headers: new HttpHeaders({ "Content-Type": "application/json" })
  //     };
  //     return this.http
  //       .delete<IUser>(`${this.deleteMeUrl}/${resetToken}`, body, options)
  //       .pipe(
  //         // tap(data => console.log("All: " + JSON.stringify(data))),
  //         catchError(this.handleError)
  //       );
  //   }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAutheticationStatus() {
    return this.http
      .get<any>(this.isLoggedInUrl, {
        withCredentials: true
      })
      .pipe(
        tap(data => {
          if (data instanceof Object) {
            this.currentUser = data.data.user;
            // console.log(data, "checking status");
          }
        })
      )
      .subscribe();
  }

  logout() {
    return this.http.get(this.logoutUrl).pipe(
      tap(data => {
        this.cookieService.delete("jwt");
        this.currentUser = undefined;
        // console.log(data);
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
