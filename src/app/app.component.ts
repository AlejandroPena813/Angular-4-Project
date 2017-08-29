import {Component} from '@angular/core'


@Component({
    selector: 'my-app',//was called app-root in index.html
    styleUrls: ['app.component.css'],
    //routerLink allows navigation to heroes list, routerOutlet ties in hero component via router in module
    template: `<h1>{{title}}</h1>
    <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>`
//nav tag is for styling
    // <my-heroes></my-heroes>` 
//routerLinkActive Lets you add a CSS class to an element when the link's route becomes active.
})

export class AppComponent{
      title = 'Tour of Heroes';
}