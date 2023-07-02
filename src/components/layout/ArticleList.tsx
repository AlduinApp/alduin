import { memo, useMemo } from 'react';

import useActiveArticle from '../../hooks/useActiveArticle';
import useActiveFeed from '../../hooks/useActiveFeed';

import Article from './Article';

function ArticleList() {
  const activeFeed = useActiveFeed();
  const activeArticle = useActiveArticle();

  const articles = useMemo(() => {
    if (activeFeed === null) return [];

    return activeFeed.articles;
  }, [activeFeed]);

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
