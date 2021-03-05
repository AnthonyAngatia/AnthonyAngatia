import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { environment } from 'src/environments/environment';
import { MarkdownModule } from 'ngx-markdown';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import "node_modules/prismjs/components/prism-typescript.min.js"
import "node_modules/prismjs/components/prism-typescript.min.js";
import { SnippetDisplayComponent } from './snippet-display/snippet-display.component'






@NgModule({
  declarations: [
    AppComponent,
    CodeSnippetComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    SnippetDisplayComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AngularFireAnalyticsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MarkdownModule.forRoot(
      {loader: HttpClient}
    ),



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
