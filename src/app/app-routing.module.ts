import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
    //{ path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: MainComponent },
    { path: 'logo', component: IntroComponent },
    { path: 'game', component: GameComponent },
    { path: 'abecadlowo', component: AppComponent },
    { path: '**', component: PagenotfoundComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
