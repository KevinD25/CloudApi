import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarvelComicsService } from './services/marvel-comics.service';
import { HttpClientModule } from '@angular/common/http';
import { ComicListComponent } from './comic-list/comic-list.component';
import { RouterModule } from "@angular/router";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ComicAllComponent } from './comic-all/comic-all.component';
import { CharacterAllComponent } from './character-all/character-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComicListComponent,
    NavBarComponent,
    ComicAllComponent,
    CharacterAllComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'characters', component: CharacterAllComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: "**", component: HomeComponent }
    ], { useHash: true }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MarvelComicsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
