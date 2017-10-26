import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MDBApiKey, MDBApiUrl, MDBPosterUrl } from './movie-db.config';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class MovieDbService {

  private apiUrl = MDBApiUrl;
  private apiPosterUrl = MDBPosterUrl;
  private apiKey = `&api_key=${MDBApiKey}`;

  private movie = 'movie/'
  private sortByPopularity = '&sort_by=popularity.desc';
  private queryBegin = '?';

  constructor(private http: Http, private utilsService: UtilsService ) { }

  getConfig() {
    const { apiKey, apiUrl, apiPosterUrl } = this;
    return { apiKey, apiUrl, apiPosterUrl };
  }

  getPopularMovies() {
    return this.http.get(this.apiUrl + this.movie + 'popular' + this.queryBegin + this.apiKey);
  }

  searchMovies(query) {
    return this.http.get(this.apiUrl + 'search/movie' + this.queryBegin + '&query=' + query + this.sortByPopularity + this.apiKey);
  }

  addWatchLater(movie) {
    if(!this.isWatchedLaterMovie(movie)){
      let list = this.getWatchLater();
      list.push(movie);
      localStorage.setItem('watchLaterList', JSON.stringify(list));
    }
  }

  getWatchLater() {
    const list = JSON.parse(localStorage.getItem('watchLaterList'));
    return list?list:[];
  }

  isWatchedLaterMovie(movie) {
    const list = this.getWatchLater();
    return list.filter(data => this.utilsService.isEquivalentObjects(data, movie)).length > 0;

  }

}
