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

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { environment } from 'src/environments/environment';





@NgModule({
  declarations: [
    AppComponent,
    CodeSnippetComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    HighlightModule,


  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    // useValue: {
    //   fullLibraryLoader: () => import('highlight.js'),
    // }//For importing all the languages
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        javascript: () => import('highlight.js/lib/languages/javascript')}
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
