interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  date: string;
  link: string;
}

type SyncResponse = ArticleResponse[];

export default SyncResponse;
