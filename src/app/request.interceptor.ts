import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor:', request);
    // Clone the request to add a new header
    const clonedRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      })
    });
    return next.handle(clonedRequest);
  }
}
