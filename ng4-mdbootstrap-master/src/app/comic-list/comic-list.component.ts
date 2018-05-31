import {Component, OnChanges, SimpleChanges, Input, HostBinding, OnInit} from '@angular/core';
import { MarvelComicsService, IComics, IComic } from '../services/marvel-comics.service';
import * as _ from "lodash";


@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {

  dataResults: IComic;
  imageUrl : string;
  _nr : number = 0;
  comicTitle : string;
  comic : IComic;

  constructor(private _mcs: MarvelComicsService) { }

ngOnInit(){
  setInterval(this.ChangeImage, 3000);
}

  ngOnChanges(changes : SimpleChanges){
    for (let propName in changes) {  
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
            console.log(curVal);
            console.log(prevVal);
         }
  }


  private MapResult(result: IComics): IComic {
      var comic: IComic = {
        id: result.data.results[0].id,
        title: result.data.results[0].title,
        thumbnail: result.data.results[0].thumbnail.path,
        extension: result.data.results[0].thumbnail.extension,
        issueNumber: result.data.results[0].issueNumber,
        description: result.data.results[0].description,
        pageCount: result.data.results[0].pageCount
      }
      this.comic = comic;
    return comic;
  }

  ChangeImage = () =>
  {
    this._nr++;
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
