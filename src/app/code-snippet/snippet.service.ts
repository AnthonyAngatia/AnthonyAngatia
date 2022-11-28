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



  addArticle(title: string, body: string, articleId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    if (articleId === 0){
      const post: Article = {
        title,
        body,
        userId: 1,
      };
      return this.http.post(this.articlesUrl, post, {headers} ).pipe(
        tap(response => {
        }),
        catchError(err => {
          console.log('Post request failed' + err);
          return throwError(err);
        })
      );
    }else{
      const post: Article = {
        title,
        body,
        userId: 1,
        id: articleId
      };
      console.log(post);
      const url = `${this.articlesUrl}/${articleId}`;
      return this.http.put(url, post, {headers} ).pipe(
        tap(response => {
        }),
        catchError(err => {
          console.log('PUT request failed' + err);
          return throwError(err);
        })
      );
    }
  }
  getSnippets(): Observable<ISnippet[]> {
    return this.http.get<Article[]>(this.articlesUrl).pipe(
      map(articles => {
        const snippetsArr: ISnippet[] = [];
        for (const article of articles){
          const x = this.transformToSnippet(article);
          snippetsArr.push(x);
        }
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

  deleteArticle(articleId: number): Observable<any> {
    return this.http.delete(`${this.articlesUrl}/${articleId}`).pipe(
      tap(response => {console.log(response); }),
      catchError(this.handleError)
    );
  }
}
