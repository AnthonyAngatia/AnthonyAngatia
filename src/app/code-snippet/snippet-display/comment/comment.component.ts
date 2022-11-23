import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommentService} from '../../comment.service';
import {IComment} from '../../comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  comments: IComment[];

  @Input() private snippetId: number;

  constructor(private commentService: CommentService) {
  }

  ngOnDestroy(): void {
    this.getCommentsInPost(this.snippetId).unsubscribe();
  }

  ngOnInit(): void {
    this.getCommentsInPost(this.snippetId);
  }

  getCommentsInPost(snippetId: number): Subscription {
    return this.commentService.getCommentsInPost(snippetId).subscribe({
      next: comments => this.comments = Object.values(comments),
      error: err => console.log('Error retrieving comments')
    });

  }
}
