export interface ISnippet {
  snippetId: number;
  title: string;
  subTitle: string;
  route: string;
  date: Date;
  tags: any[];
  snippet: string;
  author: string;
  readTime?: string;

}
export interface Article {
  userId: number;
  id: number;
  title: string;
  body: string;
}
