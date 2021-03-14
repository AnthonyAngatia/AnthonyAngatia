## Creating dark theme using Angular Material

The following code snippet is a step by step walkthrough on how to create dark theme using Angular material. This walkthrough has an example for situations where you are using css or scss as your styling method

Add angular material and select scss as your preferred styling method.

```terminal
ng add @angular/material
```

Choose a theme. You can select one of the pre-defined theme provided or custom theme

Select the styling type. If you choose css, you will have to create a new .scss file(in my case custom-theme.scss) and add it to angular.json file as shown below.

```json
 "styles": [
    "src/custom-theme.scss",
    "src/styles.css"
  ],
```

Paste the below boilerplate code in your custom-theme.scss

Incase you chose .scss as your default style, copy the below boilerplate code in your styles.scss file

If you selected custom-theme when choosing a theme, a new file named custom-theme.scss will be formed as below

```scss
// Custom Theming for Angular Material
// For more information: https://material.angular.io/guide/theming
@import "~@angular/material/theming";
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
$light-theme: mat-light-theme(
  (
    //!Changed the variable name to light theme
    color:
      (
        primary: $theme-test-primary,
        accent: $theme-test-accent,
        warn: $theme-test-warn,
      )
  )
);

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component
// that you are using.
@include angular-material-theme($theme-test-theme);
```

A custom theme file defines a theme data structure as the composition of configurations for the individual theming systems that is, color and typography. This object can be created by either the mat-light-theme function or the mat-dark-theme function. The output of this function is then passed to the angular-material-theme mixin, which will output all of the corresponding styles for the theme. Defining custom theme

Define the mat-dark-theme() as shown below.

custom-theme.scss

```scss
$dark-theme: mat-dark-theme(
  (
    color: (
      primary: $theme-test-primary,
      accent: $theme-test-accent,
      warn: $theme-test-warn,
    ),
  )
);
```

Define 2 css classes one for light theme and the other for dark theme

Since we are only going to change the color and not the entire theme, we will pass the theme mixins to the function angular-material-color() function. If you pass it to the function angular-material-theme(), you get a duplication warning on your terminal. For more information on this check out:Duplicating themes

Remember to change the light theme varibale to $light-theme

custom-theme.scss

```scss
.theme-dark {
  @include angular-material-color($dark-theme);
}
.theme-light {
  @include angular-material-color($light-theme);
}
```

We are going to toggle this classes when an event occurs. In this example we will add a slide toggle to toggle between the light-theme and dark-theme

Below is my app.component.html file

app.component.html

```html
<mat-slide-toggle (change)="onSwitch($event)" style="float:right"
  >Dark Mode</mat-slide-toggle
>
<p>
  <mat-toolbar>
    <span>My Application</span>
  </mat-toolbar>
</p>
```

app.component.ts

```typescript
import { DOCUMENT } from "@angular/common";
import { Component, Inject, Renderer2 } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "theme-test";
  isDark = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    const hostClass = localStorage.getItem("hostClass"); //Use localstorage to store the theme state on the clients browser
    this.renderer.setAttribute(this.document.body, "class", hostClass); // get the html element <body>
  }

  onSwitch(event) {
    console.log(event);
    if (event.checked) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
    //Since typography is configured globally, remember to add the class mat-typography
    const hostClass = this.isDark
      ? "theme-dark mat-typography"
      : "theme-light mat-typography";
    localStorage.setItem("hostClass", hostClass);
    this.renderer.setAttribute(this.document.body, "class", hostClass);
  }
}
```
