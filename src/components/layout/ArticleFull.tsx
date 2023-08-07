import { memo, useEffect, useRef } from 'react';

import useActiveArticle from '../../hooks/useActiveArticle';
import SanitizeHTML from '../utils/SanitizeHTML';

const NoArticle = () => (
  <div className="flex justify-center items-center h-full">
    No article selected.
  </div>
);

function ArticleFull() {
  const article = useActiveArticle();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  return (
    <div className="flex-[12_12_0%] max-h-full" ref={containerRef}>
      {article === null ? (
        <NoArticle />
      ) : (
        <div className="w-full h-full p-8 text-black dark:text-white overflow-y-auto max-h-full">
          <div className="flex text-2xl justify-between items-center font-bold">
            <div className="text-black dark:text-white">{article.title}</div>
            <div className="text-orange-400 text-xl">
              {new Date(article.date).toLocaleDateString()}
            </div>
          </div>
          <div className="text-justify py-3 overflow-y-auto">
            <SanitizeHTML html={article.content} />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ArticleFull);
