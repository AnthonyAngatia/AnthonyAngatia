import {Component, OnInit} from '@angular/core';
import {Article} from '../snippet';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SnippetService} from "../snippet.service";

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {
  article: Article;
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private snippetService:SnippetService) {
  }

  ngOnInit(): void {
    this.articleForm = this.fb.group(
      {
        title: ['', [Validators.required]],
        body: ['', [Validators.required, Validators.minLength(10)]]
        // body: new FormControl()
      }
    );
  }

  save() {
    console.log('Saved: ' + JSON.stringify(this.articleForm.value));
    this.snippetService.addArticle(this.articleForm.value.title, this.articleForm.value.body )

  }
}
