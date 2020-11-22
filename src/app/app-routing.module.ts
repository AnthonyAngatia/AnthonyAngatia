import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'snippets', component: CodeSnippetComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
