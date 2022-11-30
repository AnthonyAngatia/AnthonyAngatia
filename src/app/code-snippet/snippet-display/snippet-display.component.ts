import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ISnippet} from '../snippet';
import {SnippetService} from '../snippet.service';
import { Subscription} from 'rxjs';
import {CommentAddComponent} from './comment/comment-add.component';
import {MatDialog} from '@angular/material/dialog';
import {ArticleAddComponent} from '../article-add/article-add.component';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.scss']
})
export class SnippetDisplayComponent implements OnInit, OnDestroy {
  private titleId = this.route.snapshot.paramMap.get('snippetTitle');
  snippetId: number;
  snippet: ISnippet;
  snippetSubscription: Subscription;

  constructor(private route: ActivatedRoute, private snippetService: SnippetService,
              private dialog: MatDialog, private router: Router ) {
  }


  ngOnInit(): void {
    this.snippetSubscription = this.getSnippet(this.titleId);
    // this.snippetId = this.snippet.snippetId;
    // console.log(this.snippetId);
  }

  ngOnDestroy(): void {
    this.snippetSubscription.unsubscribe();
  }

  // Ideally this method should be in a service and returns an observable
  getSnippet(titleId: string): Subscription {
    return this.snippetService.getSnippet(titleId).subscribe({
      next: snippet => {
        this.snippet = snippet;
        this.snippetId = snippet.snippetId;
      },
      error: err => console.log('Error getting Snippets ' + err)
    });
  }


  updateArticle(): void {
    const dialogRef = this.dialog.open(ArticleAddComponent, {
      width: '600px',
      maxHeight: '600px',
      data: {title: this.snippet.title, body: this.snippet.snippet, articleId: this.snippet.snippetId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.router.url);
      this.router.navigate([`/snippets/${this.snippet.snippetId}`]);
      // Initiate a post request when the dialog has been closed
    });
  }

  onDelete(): void {
    if (window.confirm('This item will be deleted')){
      this.snippetService.deleteArticle(this.snippet.snippetId).subscribe({
        next: snippet => {
          window.alert('Deletion successful');
          this.router.navigate(['/snippets']);
        }
      });
    }

  }
}
