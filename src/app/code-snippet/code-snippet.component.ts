import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  fileName:string = "main.js";

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

  onHighlight(e) {
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
