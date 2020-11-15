import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
      const hostClass = localStorage.getItem('hostClass');
      this.renderer.setAttribute(this.document.body, 'class', hostClass);

    }
  title = 'Anthony-Angatia';
  isDark:boolean = false;
  switchTheme(mode:string){
    if(mode == "dark"){
      this.isDark = true;
    }
    else{
      this.isDark = false;
    }
    const hostClass = this.isDark ? 'theme-dark mat-typography' : 'theme-light mat-typography';
    localStorage.setItem('hostClass', hostClass);
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }
}
