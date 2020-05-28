import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { TwitterTrendsComponent } from './component/twitter-trends/twitter-trends.component';
import { TweetsComponent } from './component/tweets/tweets.component';
import { KeywordsComponent } from './component/keywords/keywords.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: TweetsComponent },
      { path: 'keyword', component: KeywordsComponent },
      { path: 'twitter-trends', component: TwitterTrendsComponent }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
