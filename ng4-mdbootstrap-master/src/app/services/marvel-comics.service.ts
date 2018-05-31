import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {Md5} from 'ts-md5/dist/md5';
import { Title } from '@angular/platform-browser';

@Injectable()
export class MarvelComicsService {

  ts: number;
  apiKey = "2fead6955ed20e05d01336b40ba08d80";
  privateKey = "cf550f5881bec012be5bcf3ad007579ebc7de100";
  link = "https://gateway.marvel.com/v1/public/comics?";
  public currentComic : IComic;



  getTimestamp(): number{
    return (Date.now()/1000)
}

createHash(): string{
    this.ts = this.getTimestamp()
    var prehash : string 
    prehash = this.ts.toString() + this.privateKey + this.apiKey
    return Md5.hashStr(prehash).toString()
}

  constructor(private _http: HttpClient) { }

    getComics() : Observable<IComics>
    {
      var hash = this.createHash();
      var req = this.link + "&ts=" + this.ts + '&apikey=' + this.apiKey + "&hash=" + hash;
      return this._http.get<IComics>(req)
    }

    getComicsByTitle(title) : Observable<IComics>
    {
        var req = this.link + '?titleStartsWith='+ title + "&ts=" + this.ts + '&apikey=' + this.apiKey + "&ts=" + this.ts;
        return this._http.get<IComics>(req)
    }
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Variant {
  resourceURI: string;
  name: string;
}

export interface Collection {
  resourceURI: string;
  name: string;
}

export interface CollectedIssue {
  resourceURI: string;
  name: string;
}

export interface Date {
  type: string;
  date: string;
}

export interface Price {
  type: string;
  price: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Image {
  path: string;
  extension: string;
}

export interface Item {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Creators {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}

export interface Item2 {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Characters {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item2[];
}

export interface Item3 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Stories {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item3[];
}

export interface Item4 {
  resourceURI: string;
  name: string;
}

export interface Events {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item4[];
}

export interface Result {
  id: string;
  digitalId: string;
  title: string;
  issueNumber: string;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: string;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Series;
  variants: Variant[];
  collections: Collection[];
  collectedIssues: CollectedIssue[];
  dates: Date[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
}

export interface Data {
  offset: string;
  limit: string;
  total: string;
  count: string;
  results: Result[];
}

export interface IComics {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data;
  etag: string;
}

export interface IComic {
  id: string,
  title: string,
  thumbnail: string,
  extension: string,
  issueNumber: string,
  description: string,
  pageCount: string
}