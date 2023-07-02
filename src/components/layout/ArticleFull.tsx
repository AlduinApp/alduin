import { memo } from 'react';

import useActiveArticle from '../../hooks/useActiveArticle';
import SanitizeHTML from '../utils/SanitizeHTML';

const NoArticle = () => (
  <div className="flex justify-center items-center h-full">
    No article selected.
  </div>
);

function ArticleFull() {
  const article = useActiveArticle();

  return (
    <div className="flex-[12_12_0%]">
      {article === null ? (
        <NoArticle />
      ) : (
        <div className="w-full h-full p-8 text-white">
          <div className="flex text-2xl justify-between items-center font-bold">
            <div className="text-white">{article.title}</div>
            <div className="text-orange-400 text-xl">
              {article.date.toLocaleDateString()}
            </div>
          </div>
          <div className="text-justify py-3">
            <SanitizeHTML html={article.content} />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ArticleFull);
