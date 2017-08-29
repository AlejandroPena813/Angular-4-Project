import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';//NgModel
import {HttpModule} from '@angular/http';//HTTP services
//import {RouterModule} from '@angular/router';//controlls routes, in app-routing module


import {HeroDetailComponent} from './hero-detail.component';//to refer to hero detail comp
import { AppComponent } from './app.component';
import {HeroesComponent} from './heroes.component';
import {HeroService} from './hero.service';//importing heroes array service
import {DashboardComponent} from './dashboard.component';
import{HeroSearchComponent} from './hero-search.component';

import {AppRoutingModule} from './app-routing.module';//this module will handle the routes

//Imports for loading and configuring the in-memory web api
import{InMemoryWebApiModule} from 'angular-in-memory-web-api/in-memory-web-api.module';
import {InMemoryDataService} from './in-memory-data.service';

@NgModule({//list of components, pipes, and directives
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,//every component must be declared in one NgModule
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //ngModel
    AppRoutingModule, //created this, handles all routes
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
    /*RouterModule.forRoot([//route for heroes
      {
      path: 'heroes',
      component: HeroesComponent
      },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full' //this is required for redirect, says if path is '' then redirect
    },
    {//this is to display and access one hero object at at time ':' is a placeholder for actual id
      path: 'detail/:id',
      component: HeroDetailComponent
    }
    ]) */
  ],
  providers: [HeroService],//so all components access service
  bootstrap: [AppComponent] //first thing to load and startup app
})
export class AppModule { }

//all the imported libs
