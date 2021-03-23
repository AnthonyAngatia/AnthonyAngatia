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
  tagsArray:Object[] = [];


  constructor(private snippetService:SnippetService) { }

  ngOnInit(): void {
    this.getAllSnippets();
    this.getTags();
  }

  private getAllSnippets() {
    this.snippetService.getSnippets().subscribe({
      next: snippets => {
        snippets = this.restructureTagArray(snippets);
        this.snippets = Object.values(snippets);
      },
      error: err => console.error("An error occurred retrieving the snippets" + err)
    });
  }

  private getTags(){
    this.snippetService.getTags().subscribe({
      next:tags => this.tagsArray = tags,
      error:err => console.log(err+":Error over here")
    })
  }


  private restructureTagArray(snippets: ISnippet[]): ISnippet[] {
    for( let item of Object.values(snippets)){
      let tags = [];
      item.tags.forEach(tagElement => {
        let classExpression: string = 'tag-' + tagElement;
        this.tagClassExpression.push(classExpression);
        //Declare new tag structure
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
    }
  return snippets;
  }
}
