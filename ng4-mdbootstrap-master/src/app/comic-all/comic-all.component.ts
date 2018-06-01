import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MarvelComicsService, IComics, IComic, Result } from '../services/marvel-comics.service';
import { ComicListComponent } from '../comic-list/comic-list.component';
@Component({
  selector: 'app-comic-all',
  templateUrl: './comic-all.component.html',
  styleUrls: ['./comic-all.component.scss']
})
export class ComicAllComponent implements OnInit {

  private _search: string = "Thor";
  dataResults: IComic[];
  list: IComic[] = [];
  pageNumber: number = 1;
  setLimit = 10
  maxAmount = 100
  offset = 0
  limit: number[] = [5, 10, 25, 50]
  max = 100

  constructor(private _mcs: MarvelComicsService) { }

  ngOnInit() {
    this._mcs.currentComic = null;
    console.log(this.setLimit + " " + this.offset)
    this._mcs.getComics(this.setLimit, this.offset)
      .subscribe(result => this.dataResults = this.MapResult(result))
  }

  changePage(operation: string) {
    if (operation == "+") {
      if (this.offset + this.setLimit < this.maxAmount) {
        this.offset = this.offset + this.setLimit
        this.pageNumber++;
        this.Update();
      }
    } else if (operation == "-") {
      if (this.offset - this.setLimit > -1) {
        this.offset = this.offset - this.setLimit
        this.pageNumber--;
        this.Update()
      } 
    }
  }
  get SetLimit() {
    return this.setLimit
  }

  set SetLimit(value: number) {
    this.setLimit = value;
    this.Update();
  }

  Update = () => {
    this._mcs.getComics(this.setLimit, this.offset)
      .subscribe(result => { this.max = result.data.total; this.dataResults = this.MapResult(result) });
  }

  pressComic = (comic: IComic): void => {
    this._mcs.currentComic = comic;
  }

  private MapResult(result: IComics): IComic[] {
    this.list = [];
    for (var i = 0; i < result.data.results.length; i++) {
      var comic: IComic = {
        id: result.data.results[i].id,
        title: result.data.results[i].title,
        thumbnail: result.data.results[i].thumbnail.path,
        extension: result.data.results[i].thumbnail.extension,
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
