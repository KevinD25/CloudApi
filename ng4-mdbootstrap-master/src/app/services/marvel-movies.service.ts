import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MarvelMoviesService {

  link = "http://localhost:5050/api/v1/";

  constructor(private _http: HttpClient) { }

  getMovies(title?, director?, sort?, dir?) {
    var request = ""
    if (title) {
      request += "title=" + title + "&"
    }
    if (director) {
      request += "director=" + director + "&"
    }
    if (sort) {
      request += 'sort=' + sort + '&'
    }
    if (dir) {
      request += 'dir=' + dir + '&'
    }
    request = request.substring(0, request.length - 1)
    var req = this.link + request;
    return this._http.get<IMovie>(req);
  }

  getMoviesbyId(id): Observable<Movie> {
    var req = this.link + 'movie/' + id;
    return this._http.get<Movie>(req)
  }

  postMovie(movie: Movie): Observable<Movie> {
    return this._http.post<Movie>(this.link + "movie", movie);
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    return this._http.delete<Movie>(this.link + "movie/" + movie.id)
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this._http.put<Movie>(this.link + "movie", movie)
  }

  getDirector(name?, firstName?, sort?, dir?) {
    var request = ""
    if (name) {
      request += "title=" + name + "&"
    }
    if (firstName) {
      request += "director=" + firstName + "&"
    }
    if (sort) {
      request += 'sort=' + sort + '&'
    }
    if (dir) {
      request += 'dir=' + dir + '&'
    }
    request = request.substring(0, request.length - 1)
    var req = this.link + request;
    return this._http.get<IDirector>(req);
  }

  postDirector(director: Director): Observable<Director> {
    return this._http.post<Director>(this.link + "director", director);
  }

  deleteDirector(director: Director): Observable<Director> {
    return this._http.delete<Director>(this.link + "director/" + director.id)
  }

  updateDirector(director: Director): Observable<Director> {
    return this._http.put<Director>(this.link + "director", director)
  }
}

export interface IMovie {
  length: number;
  data: Movie[];
}

export interface Movie {
  id?: number;
  title: string;
  director: string;
  release: number;
  score: number;
}

export interface IDirector {
  length: number;
  data: Director[];
}

export interface Director {
  id?: number;
  name: string;
  firstName: string;
  movies: Movie[];
}
