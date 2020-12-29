import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  fileName:string = "main.js";
  terminal:string = "terminal:~";
  command1:string = "ng add @angular/material";
  customThemeFn:string = "custom-theme.scss";

  constructor() { }

  ngOnInit(): void {
  }
  response: HighlightResult;

  str = `
  import { Component, OnInit } from '@angular/core';
  import { HighlightResult } from 'ngx-highlightjs';

  @Component({
    selector: 'app-code-snippet',
    templateUrl: './code-snippet.component.html',
    styleUrls: ['./code-snippet.component.scss']
  })
  export class CodeSnippetComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
    response: HighlightResult;`;
  customTheme:string = `

  // Custom Theming for Angular Material
  // For more information: https://material.angular.io/guide/theming
  @import '~@angular/material/theming';
  // Plus imports for other components in your app.

  // Include the common styles for Angular Material. We include this here so that you only
  // have to load a single css file for Angular Material in your app.
  // Be sure that you only ever include this mixin once!
  @include mat-core();

  // Define the palettes for your theme using the Material Design palettes available in palette.scss
  // (imported above). For each palette, you can optionally specify a default, lighter, and darker
  // hue. Available color palettes: https://material.io/design/color/
  $theme-test-primary: mat-palette($mat-red);
  $theme-test-accent: mat-palette($mat-pink, A200, A100, A400);

  // The warn palette is optional (defaults to red).
  $theme-test-warn: mat-palette($mat-red);

  // Create the theme object. A theme consists of configurations for individual
  // theming systems such as "color" or "typography".
  $theme-test-theme: mat-light-theme((
    color: (
      primary: $theme-test-primary,
      accent: $theme-test-accent,
      warn: $theme-test-warn,
    )
  ));

  // Include theme styles for core and each component used in your app.
  // Alternatively, you can import and @include the theme mixins for each component
  // that you are using.
  @include angular-material-theme($theme-test-theme);

  `
  addCode:string =`$dark-theme: mat-dark-theme((
    color: (
      primary: $theme-test-primary,
      accent: $theme-test-accent,
      warn: $theme-test-warn,
    )
  ));`;

  cssClass:string = `
  .theme-dark {
    @include angular-material-color($dark-theme);
  }
  .theme-light {
    @include angular-material-color($light-theme);
  }`;
  appCompTsFn = "app.compoonent.ts";
  appCompTs = `
  import { DOCUMENT } from '@angular/common';
  import { Component, Inject, Renderer2 } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'theme-test';
    isDark = true;

    constructor(@Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2) {
        const hostClass = localStorage.getItem('hostClass');//Use localstorage to store the theme state on the clients browser
        this.renderer.setAttribute(this.document.body, 'class', hostClass); // get the html element <body>

      }

    onSwitch(event){
      console.log(event);
      if(event.checked){
        this.isDark = true;
      }
      else{
        this.isDark = false;
      }
      //Since typography is configured globally, remember to add the class mat-typography
      const hostClass = this.isDark ? 'theme-dark mat-typography' : 'theme-light mat-typography';
      localStorage.setItem('hostClass', hostClass);
      this.renderer.setAttribute(this.document.body, 'class', hostClass);

    }

  }
  `;
  appCompHtmlFn = "app.component.html";
  appCompHtml = `
    <mat-slide-toggle (change)= "onSwitch($event)" style="float:right">Dark Mode</mat-slide-toggle>
  <p>
      <mat-toolbar>
      <span>My Application</span>
      </mat-toolbar>
    </p>
    `

  onHighlight(e: { language: any; relevance: any; }) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
    console.log(this.response)
  }

}
