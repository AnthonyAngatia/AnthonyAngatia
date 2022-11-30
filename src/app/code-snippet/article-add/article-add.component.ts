import {Component, Inject, OnInit} from '@angular/core';
import {Article} from '../snippet';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SnippetService} from "../snippet.service";
import {IComment} from "../comment";
import {CommentAddComponent} from "../snippet-display/comment/comment-add.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {
  article: Article;
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private snippetService: SnippetService,
              public dialogRef: MatDialogRef<ArticleAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.articleForm = this.fb.group(
      {
        title: [this.data.title, [Validators.required]],
        body: [this.data.body, [Validators.required, Validators.minLength(10)]],
        articleId: this.data.articleId,
        // body: new FormControl()
      }
    );
  }

  save() {
    this.snippetService.addOrUpdateArticle(this.f.title.value, this.f.body.value, this.f.articleId.value).subscribe(
      post => {
        window.alert("Article saved: Response from server" + JSON.stringify(post));
        this.dialogRef.close();
      })
  }

  get f() {
    return this.articleForm.controls;
  }
}

export interface DialogData {
  title: string;
  body: string;
  articleId:number
}
