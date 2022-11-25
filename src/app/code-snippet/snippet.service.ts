import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Article, ISnippet} from './snippet';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetUrl = 'assets/articles.json';
  private tagsUrl = 'assets/tags.json';
  private articlesUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {

  }

  transformToSnippet(article: Article): ISnippet{
    return {
      snippetId: article.id,
      title: article.title,
      subTitle: article.body,
      route: article.id.toString(),
      date: null,
      tags: null,
      snippet: article.body,
      author: null,
      readTime: null
    };

}

  addArticle(title: string, body: string): void{
    console.log('Addign article');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const post: Article = {
      title,
      body,
      userId: 1,
    };
    console.log(post, ">>");
    console.log(this.http.post);
    this.http.post(this.articlesUrl, post, {headers} ).pipe(
      tap(response => {
        console.log(response);
        console.log('response');
      }),
      catchError(err => {
        console.log('Post request failed' + err);
        return throwError(err);
      })
    );
  }
  getSnippets(): Observable<ISnippet[]> {
    return this.http.get<Article[]>(this.articlesUrl).pipe(
      map(articles => {
        const snippetsArr: ISnippet[] = [];
        for (const article of articles){
          const x = this.transformToSnippet(article);
          snippetsArr.push(x);
        }
        console.log(snippetsArr);
        return snippetsArr;
      })
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
