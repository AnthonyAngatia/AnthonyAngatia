import { Component, OnInit } from '@angular/core';
import { ISnippet } from './snippet';
import { SnippetService } from './snippet.service';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  snippets:ISnippet[];//Array of a snippet interface
  tagClassExpression:string[] = [];


  constructor(private snippetService:SnippetService) { }

  ngOnInit(): void {
    this.snippetService.getSnippets().subscribe({
      next: snippets => {
        snippets = this.restructureTagArray(snippets);
        this.snippets = Object.values(snippets);
      },
      error: err => console.error("An error occurred retrieving the snippets"+err)
    });

  }


  private restructureTagArray(snippets: any[]): ISnippet[] {
    for( let item of Object.values(snippets)){
      let tags = [];
      item.tags.forEach(tagElement => {
        let classExpression: string = 'tag-' + tagElement;
        this.tagClassExpression.push(classExpression);
        let tag = {
          name: "",
          classexpression: ""
        };
        tag.name = tagElement;
        tag.classexpression = 'tag-' + tagElement;
        tags.push(tag);
      });
      item.tags = tags;
      tags = [];
      return snippets;
    }
  }
}
