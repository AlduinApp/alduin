import { memo } from 'react';

import useActiveArticle from '../../hooks/useActiveArticle';
import useArticles from '../../hooks/useArticles';

import Article from './Article';

function ArticleList() {
  const activeArticle = useActiveArticle();

  const { articles } = useArticles();

  return (
    <div className="flex-[5_5_0%] flex flex-col max-w-full min-h-full overflow-y-scroll shadow-custom lg:w-[35rem]">
      {articles.map((article) => (
        <Article
          key={article.identifier}
          {...article}
          active={activeArticle?.identifier === article.identifier}
        />
      ))}
    </div>
  );
}

export default memo(ArticleList);
