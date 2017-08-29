import {Component, OnInit} from '@angular/core';

import{Hero} from './hero';//importing the class
import{HeroService} from './hero.service';//importing the service, which imports hero obj

@Component({

    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    //template: '<h3>My Dashboard</h3>'
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{//when dashboard comp is initialized, loads ..
    //look up these two
    heroes: Hero[] = [];

    constructor(private heroService: HeroService){}

    ngOnInit(): void{
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

}