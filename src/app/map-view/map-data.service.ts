import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IGeodata } from "./geodata";

@Injectable({
  providedIn: "root"
})
export class MapDataService {
  private domain: string = "https://sleepy-peak-69882.herokuapp.com";

  // private elevenLGAUrl = `${this.domain}/api/v1/geodata/elevenLGA`;
  // private wardUrl = `${this.domain}/api/v1/geodata/ward`;
  // private floodProneAreaUrl = `${this.domain}/api/v1/geodata/floodProneArea`;
  // private floodProneUrl = `${this.domain}/api/v1/floodGeodata/floodProne/coordinate`;
  // private floodPronePlusHistoryUrl = `${this.domain}/api/v1/floodGeodata/floodPronePlusHistory/coordinate`;

  // ================================

  private elevenLGAUrl = "/api/v1/geodata/elevenLGA";
  private wardUrl = "/api/v1/geodata/ward";
  private floodProneAreaUrl = "/api/v1/geodata/floodProneArea";
  private floodProneUrl = "/api/v1/floodGeodata/floodProne/coordinate";
  private floodPronePlusHistoryUrl =
    "/api/v1/floodGeodata/floodPronePlusHistory/coordinate";

  constructor(private http: HttpClient) {}

  getElevenLGA(): Observable<IGeodata> {
    return this.http
      .get<IGeodata>(this.elevenLGAUrl, { withCredentials: true })
      .pipe(
        // tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWard(): Observable<IGeodata> {
    return this.http
      .get<IGeodata>(this.wardUrl, { withCredentials: true })
      .pipe(
        // tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getFloodProneArea(): Observable<IGeodata> {
    return this.http
      .get<IGeodata>(this.floodProneAreaUrl, { withCredentials: true })
      .pipe(
        // tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getFloodProne(lat, lng): Observable<any> {
    return this.http
      .get<IGeodata>(`${this.floodProneUrl}/${lat},${lng}`, {
        withCredentials: true
      })
      .pipe(
        // tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getFloodPronePlusHistory(lat, lng): Observable<any> {
    return this.http
      .get<IGeodata>(`${this.floodPronePlusHistoryUrl}/${lat},${lng}`, {
        withCredentials: true
      })
      .pipe(
        // tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
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
