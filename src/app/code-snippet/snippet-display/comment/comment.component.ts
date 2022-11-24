import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommentService} from '../../comment.service';
import {IComment} from '../../comment';
import {MatDialog} from '@angular/material/dialog';
import {CommentAddComponent} from './comment-add.component';
import {ScrollStrategyOptions} from "@angular/cdk/overlay";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  comments: IComment[];

  @Input() private snippetId: number;

  constructor(private commentService: CommentService, private dialog: MatDialog) {
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

  addComment(): void {
    // Create an empty slot in IComment[]
    const comment: IComment = {
      postId: this.snippetId,
      id: null, // Ideally it should not be there in a new comment, assigned by the db
      name: 'my name',
      email: 'my-email',
      body: null
    };
    this.comments.unshift(comment);
    const dialogRef = this.dialog.open(CommentAddComponent, {
        width: '600px',
        maxHeight: '600px',
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('Aftwer closed subscrition');
      console.log(result);
      //Initiate a post request when the dialog has been closed
    });

  }

}
