import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatCommonModule, MatIconModule, MatSlideToggleModule, MatToolbarModule,
  MatButtonModule } from '@angular/material';

import 'style-loader!@angular/material/prebuilt-themes/indigo-pink.css';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DragScrollModule } from '../../src/angular2-drag-scroll';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { GithubComponent } from './github/github.component';
import { FlexLayoutModule } from '@angular/flex-layout';



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
    AppRoutingModule,
    DragScrollModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatCommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
