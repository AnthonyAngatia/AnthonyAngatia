import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet } from '../snippet';
import { SnippetService } from '../snippet.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  queryParamTag:string;
  snippets:ISnippet[] = [];
  tagClassExpression:string[] = [];

  constructor(private route:ActivatedRoute, private snippetService:SnippetService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe({
      next:params => this.queryParamTag = params.tag,
       error:err=> console.log(err+":Error retrieving queryParam tag")
      });
    this.getSnippets();
  }
  getSnippets(){
    this.snippetService.getSnippets()
    .subscribe(
      {
        next:data =>{
          data.forEach(element => {
          let tagArr = element.tags;
          for(let tagElement of tagArr){
            if(tagElement == this.queryParamTag){
              this.snippets.push(element);
              break;
            }
          }
        });
        }, error:err => console.log(err+"Error getting the snippets")
        , complete:()=> this.snippets = this.restructureTagArray(this.snippets)
      });
  }

  private restructureTagArray(snippets: ISnippet[]): ISnippet[] {
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
    }
    return snippets;
  }


}
