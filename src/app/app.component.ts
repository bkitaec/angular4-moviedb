import {Component, OnInit} from '@angular/core';
import {MovieDbService} from './services/movie-db/movie-db.service';
import {UtilsService} from './services/utils/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    public moviesList:any = [];
    public config:Object;
    public pageTitle:string;
    public watchLaterList:any;

    constructor(private movieDbService:MovieDbService, private utilsService: UtilsService) {
    }

    ngOnInit() {
        this.config = this.movieDbService.getConfig();
        this.pageTitle = "Popular Movies";
        this.watchLaterList = JSON.parse(localStorage.getItem('watchLaterList'));
        this.loadPopularMovies();
    }

    loadPopularMovies() {
        this.movieDbService.getPopularMovies().subscribe(
            data => {
                this.moviesList = JSON.parse(data['_body']).results;
                console.log(this.moviesList);
            },
            err => {
                console.log('err', err);
            });
    }

    startSearching(value:string) {
        this.pageTitle = "Searching begin";
        this.movieDbService.searchMovies(value).subscribe(
            data => {
                this.moviesList = JSON.parse(data['_body']).results;
                console.log(this.moviesList);
            },
            err => {
                console.log('err', err);
            });
    }

    addWatchLater(movie) {
        this.movieDbService.addWatchLater(movie);
        console.log(' this.watchLaterList', this.movieDbService.getWatchLater());
    }

    isSavedMovie(movie) {
        return this.movieDbService.isWatchedLaterMovie(movie);
    }

    loadWatchLater() {
        console.log(' this.watchLaterList', this.movieDbService.getWatchLater());
        this.moviesList = this.movieDbService.getWatchLater();
    }

}
