import { Component, OnInit } from '@angular/core';
import { ISnippet } from './snippet';
import { SnippetService } from './snippet.service';
import {ArticleAddComponent} from './article-add/article-add.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  snippets: ISnippet[]; // Array of a snippet interface
  tagClassExpression: string[] = [];
  tagsArray: object[] = [];


  constructor(private snippetService: SnippetService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSnippets();
    this.getTags();
  }

  private getAllSnippets(): void {
    this.snippetService.getSnippets().subscribe({
      next: snippets => {
        snippets = this.restructureTagArray(snippets);
        this.snippets = Object.values(snippets);
      },
      error: err => console.error('An error occurred retrieving the snippets' + err)
    });
  }

  private getTags(): void{
    this.snippetService.getTags().subscribe({
      next: tags => this.tagsArray = tags,
      error: err => console.log(err + ':Error over here')
    });
  }

  addComment(): void {

    const dialogRef = this.dialog.open(ArticleAddComponent, {
        width: '600px',
        maxHeight: '600px',
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('Aftwer closed subscrition');
      console.log(result);
    });

  }


  private restructureTagArray(snippets: ISnippet[]): ISnippet[] {
    for ( const item of Object.values(snippets)){
      let tags = [];
      if (item.tags !== null){
        item.tags.forEach(tagElement => {
          const classExpression: string = 'tag-' + tagElement;
          this.tagClassExpression.push(classExpression);
          // Declare new tag structure
          const tag = {
            name: '',
            classexpression: ''
          };
          tag.name = tagElement;
          tag.classexpression = 'tag-' + tagElement;
          tags.push(tag);
        });
      }

      item.tags = tags;
      tags = [];
    }
    return snippets;
  }
}
