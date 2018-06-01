import { Component, OnInit, OnChanges } from '@angular/core';
import { MarvelCharactersService, ICharacters, ICharacter } from '../services/marvel-characters.service';

@Component({
  selector: 'app-character-all',
  templateUrl: './character-all.component.html',
  styleUrls: ['./character-all.component.scss']
})
export class CharacterAllComponent implements OnInit, OnChanges {

  private _search: string = "Thor";
  dataResults: ICharacter[];
  list: ICharacter[] = [];
  pageNumber : number = 1;
  setLimit = 6
  maxAmount = 100
  offset = 0
  limit: number[] = [5, 10, 25, 50]
  max = 100
  currentChar : ICharacter;

  constructor(private _mchs: MarvelCharactersService) { }

  ngOnInit() {
    this._mchs.getCharacters(this.setLimit, this.offset) 
          .subscribe(result => this.dataResults = this.MapResult(result))
  }

  ngOnChanges(){
    this._mchs.getCharacters(this.setLimit, this.offset) 
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
    this._mchs.getCharacters(this.setLimit, this.offset)
      .subscribe(result => { this.max = result.data.total; this.dataResults = this.MapResult(result) });
  }

  pressCharacter = (character : ICharacter): void => {
    this.currentChar = character;
    console.log("presscomic");
    console.log(character);
}

  private MapResult(result: ICharacters): ICharacter[] {
    this.list = [];
    for (var i = 0; i < result.data.results.length; i++) {
      var character: ICharacter = {
        id: result.data.results[i].id,
        name: result.data.results[i].name,
        comics: result.data.results[i].comics,
        thumbnail: result.data.results[i].thumbnail,
      }
      console.log(character);
      this.list.push(character);
    }
    console.log(this.list);
    return this.list;
  }

  get Search() {
    return this._search;
  }

  set Search(value: string) {
    this._search = value;
    this._mchs.getCharactersByName(this._search).subscribe(result => this.dataResults = this.MapResult(result));
  }

}
