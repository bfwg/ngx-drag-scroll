import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdSlideToggleModule, MdToolbarModule } from '@angular/material';

// import 'style-loader!@angular/material/prebuilt-themes/indigo-pink.css';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DragScrollModule } from '../../src/index';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { GithubComponent } from './github/github.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    FooterComponent,
    GithubComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'drag-scroll-app'}),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DragScrollModule,
    MdToolbarModule,
    MdButtonModule,
    MdSlideToggleModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
