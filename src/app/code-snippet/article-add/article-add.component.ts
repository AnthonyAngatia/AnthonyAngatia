import {Component, OnInit} from '@angular/core';
import {Article} from '../snippet';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SnippetService} from "../snippet.service";
import {IComment} from "../comment";
import {CommentAddComponent} from "../snippet-display/comment/comment-add.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {
  article: Article;
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private snippetService: SnippetService, public dialogRef: MatDialogRef<ArticleAddComponent>) {
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
    this.snippetService.addArticle(this.f.title.value, this.f.body.value).subscribe(
      post => {
        window.alert("Article saved: Response from server" + JSON.stringify(post));
        this.dialogRef.close();
      })
  }

  get f() {
    return this.articleForm.controls;
  }
}
