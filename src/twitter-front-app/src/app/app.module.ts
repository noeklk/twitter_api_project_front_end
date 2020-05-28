import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { NavComponent } from './component/nav/nav.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { TweetComponent } from './template/tweet/tweet.component';
import { HashtagPipe } from './pipe/hashtag.pipe';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { TweetsComponent } from './component/tweets/tweets.component';
import { KeywordsComponent } from './component/keywords/keywords.component';
import { ChartistModule } from 'ng-chartist';
import { BarChartComponent } from './template/bar-chart/bar-chart.component';
import { UserInfosComponent } from './component/user-infos/user-infos.component';
import { MonthTranslateFrPipe } from './component/user-infos/month-translate-pipe';
import { DefaultUrlImgUserPipe } from './component/user-infos/default-url-img-user-pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    NavComponent,
    SignupFormComponent,
    TweetComponent,
    HashtagPipe,
    TweetsComponent,
    KeywordsComponent,
    BarChartComponent,
    HashtagPipe,
    UserInfosComponent,
    MonthTranslateFrPipe,
    DefaultUrlImgUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ChartistModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
