import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';


import 'node_modules/prismjs/components/prism-typescript.min.js';
import 'node_modules/prismjs/components/prism-sql.min.js';
import 'node_modules/prismjs/components/prism-javascript.min.js';
import 'node_modules/prismjs/components/prism-json.min.js';
import 'node_modules/prismjs/components/prism-json5.min.js';
import 'node_modules/prismjs/components/prism-java.min.js';
import 'node_modules/prismjs/components/prism-bash.min.js';

import { CodeSnippetModule } from './code-snippet/code-snippet.module';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AngularFireAnalyticsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CodeSnippetModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
