import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, find, map, tap} from 'rxjs/operators';
import {ISnippet} from './snippet';
import {IComment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetUrl = 'assets/articles.json';
  private tagsUrl = 'assets/tags.json';

  constructor(private http: HttpClient) {

  }

  getSnippets(): Observable<ISnippet[]> {
    return this.http.get<ISnippet[]>(this.snippetUrl).pipe(
      tap(data => {
        // Returns an observable that is identical to the source. It does not modify the stream in any way.
        // Useful for logging, debugging etc
      }),
      catchError(this.handleError)
    );
  }

  // Search should be done by the database
  getSnippet(titleId: string): Observable<ISnippet> {
    return this.getSnippets().pipe(
      map(snippetArray => {
        for (const item of Object.values(snippetArray)) {
          if (item.route === titleId) {
            return item;
          }
        }
      }));
  }

  getTags(): Observable<object[]> {
    return this.http.get<ISnippet[]>(this.tagsUrl)
      .pipe(tap({
          next: data => {
          }
        }),
        catchError(this.handleError)
      );
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
