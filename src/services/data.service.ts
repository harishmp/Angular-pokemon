import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';
import { PokemonList, PokemonStats, PokemonDetailbyID, PokemonMoves, PokemonDetailbyName } from 'src/app/typed';

const baseUrl = `${environment['baseUrl']}`;

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getPokeApiList(limit: number, offset: number): Observable<PokemonList[]> {
    let _url: string = `${baseUrl}?limit=${limit}&offset=${offset}/`;
    return this.httpClient.get<PokemonList[]>(_url);
  };

  getPokeApiDetail(name: string): Observable<PokemonDetailbyName[]> {
    let _url: string = `${environment['baseUrl']}/${name}`;
    return this.httpClient.get<PokemonDetailbyName[]>(_url).catch(this._errorHandler);
  };

  getPokemons(id: number): Observable<PokemonDetailbyID[]> {
    let _url: string = `${environment['baseUrl']}/${id}`;
    return this.httpClient.get<PokemonDetailbyID[]>(_url).catch(this._errorHandler);
  };

  getPokeMoves(url: string): Observable<PokemonMoves[]> {
    return this.httpClient.get<PokemonMoves[]>(url).catch(this._errorHandler);
  };

  getPokeStats(url: string): Observable<PokemonStats[]> {
    return this.httpClient.get<PokemonStats[]>(url).catch(this._errorHandler);
  };

  private _errorHandler(error: Response) {
    return Observable.throw(error)
  }

}