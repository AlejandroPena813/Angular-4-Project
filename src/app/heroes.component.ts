import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; //importing router lib, injected into the constr

import {Hero} from './hero';
import {HeroService} from './hero.service';//importing heroes array service

//this lists all heroes

@Component({
  selector: 'my-heroes',
  //templateUrl: './app.component.html',
  //back ticks, html on diff lines
  templateUrl: './heroes.component.html' ,
  
  //styleUrls: ['./app.component.css'],

  styleUrls: ['./heroes.component.css'],//can be multiple style sheets

providers: []//showing injector how to create a heroservice when appcomp made
//now children of appcomp can use service too
//this is in app module

})
export class HeroesComponent implements OnInit { //eventually become a shell to hosts sub-components

  heroes: Hero[]; //uninitialized heroes array
  selectedHero: Hero;
  //heroes = HEROES;//heroes gets type from HEROES array, seperate from class impl bc will use data service

  constructor(
    private router: Router,
    private heroService: HeroService){}//parameter defines private service and injection site
  //creates instance of heroservice when creating app comp, providers:[] accompanies this

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes=>this.heroes = heroes); //calls private service instance and get data
  }//waits for Promise, when it resolves displays data

  onSelect(hero: Hero): void{//sets selectedHero to clicked hero
    this.selectedHero = hero;
  }

  ngOnInit(): void {//accompanied by getHeroes func
    this.getHeroes();
  }

  gotoDetail(): void{//this routing to hero details works differently than dashboard, same idea diff exec
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void{
    name = name.trim();
    if(!name) {return;}
    this.heroService.create(name)
      .then( hero=>{
        this.heroes.push(hero);
        this.selectedHero=null;
      });
  }

  delete(hero: Hero): void {
    this.heroService  
      .delete(hero.id)
      .then(()=> {
        this.heroes = this.heroes.filter(h => h!== hero);
        if(this.selectedHero === hero){this.selectedHero = null;}
      });
  }

}
