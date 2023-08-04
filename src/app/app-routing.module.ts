import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    //{ path: '', redirectTo: '/', pathMatch: 'full' },
    {path: '', component: MainComponent },
    { path: 'logo', component: IntroComponent },
    { path: 'abecadlowo', component: AppComponent },
    { path: '**', component: PagenotfoundComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
