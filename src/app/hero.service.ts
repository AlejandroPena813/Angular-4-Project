import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Hero} from './hero';//bringing in class
//import {HEROES} from './mock-heroes';//bringing in array of const heroes



@Injectable()//decorator for the service, consistencies and future-proofing
export class HeroService{

    /////Beginning of http services
    private heroesUrl = 'api/heroes'; //url to web api

    constructor(private http: Http){}

    //////////////update/put function

    private headers = new Headers({'Content-Type': 'application/json'});

    update(hero: Hero): Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(()=> hero)
            .catch(this.handleError);
    }
    /////////////

    ///////create, how does it know to continue id number?
    create(name: string): Promise<Hero>{
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void>{
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(()=> null)
        .catch(this.handleError);
    }
    ///////

    getHeroes(): Promise<Hero[]>{//old impl below
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])//json method of HTTP response, extracts response data
            .catch(this.handleError);//handleError defined below
    }

    private handleError(error: any): Promise<any>{
        console.error('An error occurred', error);// for demo purposes only
        return Promise.reject(error.message || error);
    }
    //////

    /* getHeroes(): Promise<Hero[]>{
        return Promise.resolve(HEROES); //giving access to heroes array
    } */

   getHero(id: number): Promise<Hero>{
       const url = `${this.heroesUrl}/${id}`;

       return this.http.get(url)
        .toPromise()
        .then(response =>response.json().data as Hero)
        .catch(this.handleError);
   }
   
   /* getHero(id: number): Promise<Hero>{
        return this.getHeroes()
            .then(heroes => heroes.find(hero=> hero.id ===id));
    } */
}