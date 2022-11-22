import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet } from '../snippet';
import { SnippetService } from '../snippet.service';
import {Observable, Subscription} from 'rxjs';
import {CommentService} from '../comment.service';
import {IComment} from '../comment';

@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.scss']
})
export class SnippetDisplayComponent implements OnInit, OnDestroy {
  private titleId = this.route.snapshot.paramMap.get('snippetTitle');
  private snippetId: number;
  snippet: ISnippet;
  comments: IComment[];

  constructor(private route: ActivatedRoute, private snippetService: SnippetService,
              private commentService: CommentService) { }


  ngOnInit(): void {
    this.getSnippet(this.titleId);
    // this.snippetId = this.snippet.snippetId;
    console.log(this.snippetId);
  }

  ngOnDestroy(): void{
    this.getSnippet(this.titleId).unsubscribe();
    this.getCommentsInPost(this.snippetId).unsubscribe();
  }

  // Ideally this method should be in a service and returns an observable
  getSnippet(titleId: string): Subscription {
    return this.snippetService.getSnippet(titleId).subscribe({
      next: snippet => {
        this.snippet = snippet;
        this.snippetId = snippet.snippetId;
        this.getCommentsInPost(this.snippetId);
      },
      error: err => console.log('Error getting Snippets' + err)
    });
  }

  getCommentsInPost(snippetId: number): Subscription {
    return this.commentService.getCommentsInPost(this.snippetId).subscribe({
      next: comments => this.comments = Object.values(comments),
      error: err => console.log('Error retrieving comments')
    });
  }

}
