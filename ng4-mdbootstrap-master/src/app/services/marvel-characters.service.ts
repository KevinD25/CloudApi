import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MarvelCharactersService {

  ts: number;
  apiKey = "2fead6955ed20e05d01336b40ba08d80";
  privateKey = "cf550f5881bec012be5bcf3ad007579ebc7de100";
  link = "https://gateway.marvel.com/v1/public/characters?";
  public currentCharacter: ICharacter;

  getTimestamp(): number {
    return (Date.now() / 1000)
  }

  createHash(): string {
    this.ts = this.getTimestamp()
    var prehash: string
    prehash = this.ts.toString() + this.privateKey + this.apiKey
    return Md5.hashStr(prehash).toString()
  }

  constructor(private _http: HttpClient) { }

  getCharacters(): Observable<ICharacters> {
    var hash = this.createHash();
    var req = this.link + "&ts=" + this.ts + '&apikey=' + this.apiKey + "&hash=" + hash;
    return this._http.get<ICharacters>(req)
  }

  getCharactersByName(name): Observable<ICharacters> {
    var req = this.link + '?nameStartsWith=' + name + "&ts=" + this.ts + '&apikey=' + this.apiKey + "&ts=" + this.ts;
    return this._http.get<ICharacters>(req)
  }
}


export interface Url {
  type: string;
  url: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Item {
  resourceURI: string;
  name: string;
}

export interface Comics {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}

export interface Item2 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Stories {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item2[];
}

export interface Item3 {
  resourceURI: string;
  name: string;
}

export interface Events {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item3[];
}

export interface Item4 {
  resourceURI: string;
  name: string;
}

export interface Series {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item4[];
}

export interface Result {
  id: string;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}

export interface Data {
  offset: string;
  limit: string;
  total: string;
  count: string;
  results: Result[];
}

export interface ICharacters {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data;
  etag: string;
}

export interface ICharacter {
  id: string;
  name: string;
  comics: Comics;
  thumbnail: Thumbnail;
}
