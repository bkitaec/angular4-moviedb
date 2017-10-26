import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MovieDbService } from './services/movie-db/movie-db.service';
import { UtilsService } from './services/utils/utils.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    MovieDbService, 
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
