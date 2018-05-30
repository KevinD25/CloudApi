import { Component, OnInit } from '@angular/core';
import {MarvelComicsService, IComics} from '../services/marvel-comics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataResults : IComic[];
  list : IComic[] = [];

  constructor(private _mcs : MarvelComicsService) { }

  ngOnInit() {
    this._mcs.getComics()
            .subscribe(result => this.dataResults = this.MapResult(result))
    console.log(this.dataResults);
  }


  private MapResult(result : IComics) :IComic[]{
    for(var i=0; i < result.data.results.length; i++){
      var comic : IComic = {
        id : result.data.results[i].id,
        title : result.data.results[i].title,
        thumbnail : result.data.results[i].thumbnail.path,
        issueNumber : result.data.results[i].issueNumber,
        description : result.data.results[i].description,
        pageCount : result.data.results[i].pageCount
      }
      console.log(comic);
      this.list.push(comic);
    }
    console.log(this.list);
    return this.list;
}
}

interface IComic{
  id: string,
  title : string,
  thumbnail : string,
  issueNumber: string,
  description: string,
  pageCount: string
}
