/**
 * Created by Viacheslav Osadchiy on 26.06.2017.
 */

import {Injectable, Injector} from "@angular/core";
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { AppSettings } from '../appSettings';

import { Storage } from '@ionic/storage';


@Injectable()
export class HttpInterceptor extends Http {
  userToken:string;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private storage:Storage) {
    super(backend, defaultOptions);
    storage.get('user')
      .then(user => {
        if (user) this.userToken = user.token;

      })
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private setHeaders(options?: RequestOptionsArgs) {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    new Promise((resolve,reject) => {
      this.storage.get('user')
        .then(user => {
          console.log(options);
          options.withCredentials = true;
          options.headers.set('x-access-token', '48fj3f');
          console.log(options);
          resolve(options)
        })
    })
    /*console.log(options);
     return options;*/
  }


  private updateUrl(req: string) {
    console.log('updating url');
    return  AppSettings.API_ENDPOINT + req;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    options.withCredentials = true;
    console.log(this.userToken);
    if (this.userToken) options.headers.set('x-access-token', this.userToken);
    console.log(options);
    return options
  }
}
