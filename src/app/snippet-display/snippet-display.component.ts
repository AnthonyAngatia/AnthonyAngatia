import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet } from '../code-snippet/snippet';
import { SnippetService } from '../code-snippet/snippet.service';

@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.scss']
})
export class SnippetDisplayComponent implements OnInit {
  snippet: ISnippet;

  constructor(private route: ActivatedRoute, private snippetService: SnippetService) { }

  ngOnInit(): void {
    const titleId = this.route.snapshot.paramMap.get("snippetTitle");
    this.getSnippet(titleId);
  }
  //Ideally this method shold be in a service and returns an observable
  getSnippet(titleId: String): void{
    this.snippetService.getSnippets().subscribe({
      next:snippets => {
       for(let item of Object.values(snippets)){
         console.log(item);
         if(item.route == titleId){
           this.snippet = item;
           break;
         }
       }
      },
      error:err => console.log("Error getting Snippets"+ err)
    })
  }

}
