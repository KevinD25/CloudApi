import { Component, OnInit } from '@angular/core';
import { MarvelComicsService, IComics } from '../services/marvel-comics.service';

@Component({
  selector: 'app-comic-all',
  templateUrl: './comic-all.component.html',
  styleUrls: ['./comic-all.component.scss']
})
export class ComicAllComponent implements OnInit {

  private _search: string = "Thor";
  dataResults: IComic[];
  list: IComic[] = [];

  constructor(private _mcs: MarvelComicsService) { }

  ngOnInit() {
    this._mcs.getComics()
      .subscribe(result => this.dataResults = this.MapResult(result))
    console.log(this.dataResults);
  }

  private MapResult(result: IComics): IComic[] {
    for (var i = 0; i < result.data.results.length; i++) {
      var comic: IComic = {
        id: result.data.results[i].id,
        title: result.data.results[i].title,
        issueNumber: result.data.results[i].issueNumber,
        description: result.data.results[i].description,
        pageCount: result.data.results[i].pageCount
      }
      console.log(comic);
      this.list.push(comic);
    }
    console.log(this.list);
    return this.list;
  }

  get Search() {
    return this._search;
  }

  set Search(value: string) {
    this._search = value;
    this._mcs.getComicsByTitle(this._search).subscribe(result => this.dataResults = this.MapResult(result));
  }

}
interface IComic {
  id: string,
  title: string,
  issueNumber: string,
  description: string,
  pageCount: string
}
