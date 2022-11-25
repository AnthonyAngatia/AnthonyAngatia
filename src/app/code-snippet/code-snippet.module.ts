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
import {MatInputModule} from '@angular/material/input';
import { CommentAddComponent } from './snippet-display/comment/comment-add.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CodeSnippetComponent,
    SnippetDisplayComponent,
    TagsComponent,
    CommentComponent,
    CommentAddComponent,
    ArticleAddComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(
      {loader: HttpClient}
    ),
    MatInputModule,
    ReactiveFormsModule

  ]
})
export class CodeSnippetModule { }
