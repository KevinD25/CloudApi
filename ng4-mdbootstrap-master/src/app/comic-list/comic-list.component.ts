import { Component, OnInit } from '@angular/core';
import { MarvelComicsService, IComics } from '../services/marvel-comics.service';
import * as _ from "lodash";


@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {


  dataResults: IComic[];
  list: IComic[] = [];
  imageUrl : string;
  _nr : number = 0;
  comicTitle : string;

  constructor(private _mcs: MarvelComicsService) { }

  ngOnInit() {
    this._mcs.getComics()
      .subscribe(result => this.dataResults = this.MapResult(result))
    
    console.log("DATA");
    console.log(this.dataResults);
    console.log("LIST");
    console.log(this.list);
    setInterval(this.ChangeImage , 2000);
  }

  private MapResult(result: IComics): IComic[] {
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

  ChangeImage = () =>
  {
    this._nr++;
    console.log("NUMMER");
    console.log(this._nr);
  }

  get imageNr()
  {
      return this._nr;
  }

  set imageNr(value: number)
  {
      this._nr = value;
  }

}
interface IComic {
  id: string,
  title: string,
  thumbnail: string,
  extension: string,
  issueNumber: string,
  description: string,
  pageCount: string
}
