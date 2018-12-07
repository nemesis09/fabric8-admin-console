import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, asyncScheduler, Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { RequestCache } from '../services/request-cache.service';

/**
 * If request is cachable (e.g., GET) and
 * response is in cache return the cached response as observable.
 *
 * If not in cache or not cachable,
 * pass request through to next()
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // continue if not cachable.
    if (!isCachable(req)) {
      return next.handle(req);
    }

    return Observable.create(observer => {
      let asyncResponse = this.cache.get(req);
      console.log(asyncResponse);

      if (!asyncResponse) {
        console.log(`cache miss`);
        asyncResponse = new AsyncSubject<HttpResponse<any>>();
        this.cache.set(req, asyncResponse);
        next.handle(req).subscribe(asyncResponse);
      }

      return asyncResponse.pipe(subscribeOn(asyncScheduler)).subscribe(observer);
    });
  }
}


/** Is this request cachable? */
function isCachable(req: HttpRequest<any>) {
  // Only GET requests are cachable
  return req.method === 'GET';
}