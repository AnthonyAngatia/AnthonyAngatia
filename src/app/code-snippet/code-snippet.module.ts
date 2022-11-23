import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from './code-snippet.component';
import { SnippetDisplayComponent } from './snippet-display/snippet-display.component';
import { TagsComponent } from './tags/tags.component';
import { AppRoutingModule } from '../app-routing.module';

import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared/shared.module';
import { CommentComponent } from './snippet-display/comment/comment.component';



@NgModule({
  declarations: [
    CodeSnippetComponent,
    SnippetDisplayComponent,
    TagsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(
      {loader: HttpClient}
    )

  ]
})
export class CodeSnippetModule { }
