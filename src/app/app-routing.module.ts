import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { HomeComponent } from './home/home.component';
import { SnippetDisplayComponent } from './code-snippet/snippet-display/snippet-display.component';
import { TagsComponent } from './code-snippet/tags/tags.component';

const routes: Routes = [
  {
    path: 'snippets',
    component: CodeSnippetComponent, // this is the component with the <router-outlet> in the template
  },
  {
    path: 'snippets/tags', // child route path dark-theme-angular-material
    component: TagsComponent, // child route component that the router renders
  },
  {
    path: 'snippets/:snippetTitle', // child route path dark-theme-angular-material
    component: SnippetDisplayComponent, // child route component that the router renders
  },
  {
    path:'about', component: AboutComponent
  },
  {path: '', component: HomeComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
