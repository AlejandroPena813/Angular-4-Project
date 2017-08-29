import {Component, /*Input,*/ OnInit} from '@angular/core';//input for hero property shown below
import {Hero} from './hero';

import {ActivatedRoute, ParamMap} from '@angular/router';
import{Location} from '@angular/common';
import {HeroService} from './hero.service'
import 'rxjs/add/operator/switchMap';//to be used with route parameters Observable

@Component({//child to app component

    selector: 'hero-detail',//tag name representing HeroDetailComponent
    templateUrl: './hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
    /*template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
    `*/
})
export class HeroDetailComponent implements OnInit{
    constructor(//all these assist with setting up the :id for routing
      private heroService: HeroService,
      private route: ActivatedRoute, //info about route related to a component
      private location: Location //service for apps to interact with URL in browser
    ){}
   // @Input()
    hero: Hero;//used in the component above, originates from app.component
    //now Hero class moved from app.comp to its own file hero.ts- style is one class per file.

    ngOnInit(): void{
      this.route.paramMap
      .switchMap((params: ParamMap)=>this.heroService.getHero(+params.get('id')))
      .subscribe(hero=>this.hero = hero);
    }

    goBack(): void {//uses Location service injected
      this.location.back();
    }

    save(): void{//first calls update f(x), which is in hero service, then calls goBack()
      this.heroService.update(this.hero)
        .then(() => this.goBack());
    }
}

//hero is input property now, receives hero obj and bind it