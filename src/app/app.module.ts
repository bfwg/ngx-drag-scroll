import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DragScrollModule } from '../../projects/ngx-drag-scroll/src/lib/ngx-drag-scroll.module';
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
    AppRoutingModule,
    DragScrollModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
