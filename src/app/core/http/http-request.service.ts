import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { URLUtils } from "../util/url";

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    private serverUrl = environment.APP_SERVER_URL;
    
    constructor(public http: HttpClient) { }

    /**
     * {@inheritdoc}
     */
    post(path: string, body: any, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.post(url, body, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    get(path: string, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.get(url, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    put(path: string, body: any, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.put(url, body, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    delete(path: string, options?: any): Observable<any> {
        const url = URLUtils.isWebURL(path) ? `${path}` : `${this.serverUrl}${path}`;
        return this.http.delete(url, options).pipe(
            // retry(1),
            catchError((err) => this.handleError(err))
        );
    }

    /**
     * {@inheritdoc}
     */
    handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //   this._errorState$.next({ status: +error.status, error: error.error, url: error.url });
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user friendly error message
        return throwError(error);
    }

    //   public defaultHttpHeaders(): HttpHeaders {
    //     const httpHeader = new HttpHeaders();
    //     httpHeader.append('Content-Type', 'application/json');
    //     return httpHeader;
    //   }

    //   /**
    //    * @description provide a file download functionnality to the application
    //    * @param url [[string]]
    //    */
    //   downloadFile(url: string, filename?: string, fileExtension?: string, params?: { [prop: string]: any }): Promise<any> {
    //     url = URLUtils.isWebURL(url) ? `${url}` : `${this.serverUrl}${url}`;
    //     // const headers = new HttpHeaders();
    //     // headers.append('Accept', 'text/plain');
    //     // headers.append('Content-type', 'application/octet-stream');
    //     return new Promise((_, __) => {
    //       this.loadServerFile(url, params)
    //         .then((res: any) => {
    //           if (!isDefined(filename)) {
    //             filename = isDefined(fileExtension) ? `${fileNameFromResponseHeaders(res)}.${fileExtension}` : `${fileNameFromResponseHeaders(res)}`;
    //           }
    //           Browser.saveFile(res, isDefined(fileExtension) ? `${filename}.${fileExtension}` : `${filename}`);
    //           _({});
    //         });
    //     });
    //   }

    //   /**
    //    * @description Load a file from the backend server
    //    * @param url [[string]]
    //    */
    //   loadServerFile(url: string, params?: { [prop: string]: any }): Promise<any> {
    //     const headers = new HttpHeaders();
    //     headers.append('Accept', 'text/plain');
    //     headers.append('Content-type', 'application/octet-stream');
    //     return new Promise((_, __) => {
    //       this.http
    //         .get(url, { headers, responseType: 'blob', params })
    //         .toPromise()
    //         .then((res: any) => {
    //           _(res);
    //         });
    //     });
    //   }


}