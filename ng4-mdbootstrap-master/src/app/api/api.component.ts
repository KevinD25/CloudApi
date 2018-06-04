import { Component, OnInit } from '@angular/core';
import { MarvelMoviesService, Movie } from '../services/marvel-movies.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class APIComponent implements OnInit {

  constructor(private _mms: MarvelMoviesService) { }

  movie: Movie;
  movies: Movie[];
  maxAmount : number = 100;
  pageNumber  : number = 0;

  ngOnInit() {
    this._mms.getMovies()
    .subscribe(result => {this.movies = result.data; this.maxAmount = result.length;})


    this.movie = {
      title: "",
      director: null,
      release: 1900,
      score: 0
    }
    this.Update();
  }


  Update = () => {
    this._mms.getMovies()
    .subscribe(result => {this.movies = result.data; this.maxAmount = result.length;})
  }

  btnClickAdd(){
    this._mms.postMovie(this.movie).subscribe(result => console.log(result))
  }

  btnClickRemove(){
    this._mms.deleteMovie(this.movie).subscribe(result => console.log(result))
  }

  btnClickUpdate(){
    this._mms.updateMovie(this.movie).subscribe(result => console.log(result))
  }
}
