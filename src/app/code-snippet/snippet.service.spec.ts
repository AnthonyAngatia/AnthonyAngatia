import {TestBed} from '@angular/core/testing';

import {SnippetService} from './snippet.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ISnippet} from './snippet';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';

const articlesUrl = 'https://jsonplaceholder.typicode.com/posts';


describe('SnippetService', () => {
  let service: SnippetService;
  let contr: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SnippetService]
    });
    service = TestBed.inject(SnippetService);
    contr = TestBed.inject(HttpTestingController);
  });

  it('should perform a GET request on articles and return snippets', () => {
    const testData = [{
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }];
    let actualSnippets: ISnippet[] | undefined;
    service.getSnippets().subscribe(articles => {
      actualSnippets = articles;
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = contr.expectOne(articlesUrl);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    expect(actualSnippets).toEqual([{
      snippetId: 1,
      title: 'Creating a dark theme with Angular Material',
      subTitle: 'How to use theme your angular application using Angular Material',
      route: 'create-dark-theme-with-angular-and-angular-material',
      date: 'Dec 30,2020',
      tags: [
        'angular', 'angular-material'
      ],
      snippet: 'snippets/angular-dark-mode.md',
      author: 'Anthony Angatia',
      readTime: '3 min'
    }]);

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    contr.verify();
  });

  it('can test for 404 error', () => {
    const msg = 'deliberate error 404 msg';

    service.getSnippets().subscribe({
      next: () => fail('should have failed with 404'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      }
    });
    const req = contr.expectOne(articlesUrl);

    // Respond with  mock error
    req.flush(msg, {status: 404, statusText: 'Not found'});
  });


});
