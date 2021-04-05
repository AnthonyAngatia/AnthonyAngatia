## Creating dark theme using Angular Material

Add angular material and select scss as your preferred styling method. Scss is like a superset of css therefore for those used to css don't shy away. P.S: Stick with css if you have it configured as your default style(Scroll to the last section of this page for more).

```bash
ng add @angular/material
```

Choose a theme. You can select one of the pre-defined theme provided or custom theme.
If you selected custom-theme when choosing a theme, a new file named custom-theme.scss will be formed as below.
If you selected a predefined theme, make sure you have this in your styles.scss file.

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

To create multiple themes e.g Dark theme, define alternate theme objects. From the above code we have one the object `$light-theme`. Define another theme object `$dark-theme`(use your preferred object name).

Define the mat-dark-theme() as shown below.

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

To include either of the theme in your application.

```scss
@include angular-material-theme($dark-theme); //or $light-theme
```

However, if you are only changing the color and not the entire theme use the function:

```scss
@include angular-material-color($dark-theme);
```

To toggle between the 2 themes, define 2 classes as below

```scss
.theme-dark {
  @include angular-material-color($dark-theme);
}
.theme-light {
  @include angular-material-color($light-theme);
}
```

Toggle the classes in the `<body></body>` tag of your DOM.
There are multiple ways of going about this. You can inject Renderer2 in your component and use it to change the class of the `<body>` element.

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
    if (event.checked) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
    //Since typography is configured globally, remember to add the class mat-typography(if you have your typography configured)
    const hostClass = this.isDark
      ? "theme-dark mat-typography"
      : "theme-light mat-typography";
    localStorage.setItem("hostClass", hostClass); //use localstorage to recall the users choice
    this.renderer.setAttribute(this.document.body, "class", hostClass);
  }
}
```

```html
<mat-slide-toggle (change)="onSwitch($event)" style="float:right">
  Dark Mode</mat-slide-toggle
>
```

# CSS

Create a new .scss file(in my case custom-theme.scss) and add it to angular.json file as shown below.

```json
 "styles": [
    "src/custom-theme.scss",
    "src/styles.css"
  ],
```

Continue with the snippet from the top.
