import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { _isDefined } from "../util/type-utils";

@Injectable()
export class HttpRequestInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(environment.LOCAL_STORAGE_KEYS.TOKEN_NAME);

        if (_isDefined(token)) {
            // If we have a token, we set it to the header
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                console.log('http response event--->>>', event);
              }
      
              if (event instanceof HttpErrorResponse) {
                console.log('httpError response event--->>>', event);
                if (event.status === 401) {
                  // redirect the user to login page
                  // 401 unauthorised user
                }
              }
              return event;
            })
          )
        // throw new Error("Method not implemented.");
    }

}