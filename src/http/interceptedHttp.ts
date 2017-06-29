/**
 * Created by Viacheslav Osadchiy on 26.06.2017.
 */

import {Injectable, Injector} from "@angular/core";
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, ResponseOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { AppSettings } from '../appSettings';

import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../providers/utils';


@Injectable()
export class HttpInterceptor extends Http {
  userToken:string;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private storage:Storage, private utils:UtilsProvider) {
    super(backend, defaultOptions);
    this.updateUser();
  }

  private updateUser() {
    this.storage.get('user')
      .then(user => {
        if (user) this.userToken = user.token;

      })
  }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.updateUser();
    return super.request(url, options)
      .catch(this.catchErrors());
  }

  private catchErrors() {
    return (response: Response) => {
      if (response.status === 403) {
        console.warn('403 status, clearing storage')
        // this.utils.clearStorage();

      }
      return Observable.throw(response);
    };
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
    if (this.userToken) options.headers.set('x-access-token', this.userToken); else this.updateUser();
    console.log(this.userToken);
    return options
  }
}
