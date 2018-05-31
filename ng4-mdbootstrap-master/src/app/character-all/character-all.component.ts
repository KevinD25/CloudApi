import { Component, OnInit } from '@angular/core';
import { MarvelCharactersService, ICharacters, ICharacter } from '../services/marvel-characters.service';

@Component({
  selector: 'app-character-all',
  templateUrl: './character-all.component.html',
  styleUrls: ['./character-all.component.scss']
})
export class CharacterAllComponent implements OnInit {

  private _search: string = "Thor";
  dataResults: ICharacter[];
  list: ICharacter[] = [];
  pageNumber : number = 1;

  constructor(private _mchs: MarvelCharactersService) { }

  ngOnInit() {
    this._mchs.getCharacters() 
          .subscribe(result => this.dataResults = this.MapResult(result))
  }

  changePage(operation: string){
    if(operation == "+"){
        this.pageNumber++;
    }else if(operation == "-"){
      if(this.pageNumber>1) this.pageNumber--;
    }
  }

  pressComic = (character : ICharacter): void => {
    this._mchs.currentCharacter = character;
    console.log("presscomic");
    console.log(character);
}

  private MapResult(result: ICharacters): ICharacter[] {
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
