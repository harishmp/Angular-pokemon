import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class DataService {

  constructor(private http: Http) { }

  getPokeApiList(limit: number, offset: number) {
    let _url: string = `${environment['baseUrl']}?limit=${limit}&offset=${offset}/`;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  getPokeApiDetail(name: string) {
    let _url: string = `${environment['baseUrl']}/${name}`;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  getPokemons(id: number) {
    let _url: string = `${environment['baseUrl']}/${id}`;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  getPokeMovesStats(url: string) {
    return this.http.get(url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  private _errorHandler(error: Response) {
    return Observable.throw(error)
  }

}