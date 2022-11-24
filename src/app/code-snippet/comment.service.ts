import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {IComment} from './comment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {
  }


  getAllComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.commentUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCommentsInPost(postId: number): Observable<IComment[]> {
    const params = {postId: postId.toString()};
    return this.http.get<IComment[]>(this.commentUrl, {params}).pipe(
      catchError(this.handleError)
    );
  }

  getComment(id: number): Observable<IComment> {
    const url = `${this.commentUrl}/${id}`;
    return this.http.get<IComment>(url).pipe(catchError(this.handleError));
  }

  postComment(): Observable<IComment>{
    const url = `${this.commentUrl}`;
    const body = { postId: 1, name: 'My Name', email: 'email', body: 'My body is this'};
    return this.http.post<IComment>(url, body ).pipe(catchError(this.handleError));
  }



  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
