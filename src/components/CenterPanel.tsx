import { forwardRef, memo, useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useMedia } from 'react-use';

import ArticleFull from './ArticleFull';
import ArticleList from './ArticleList';
import FeedList from './FeedList';
import { PortalProvider } from './context/PortalContext';

function CenterPanel() {
  const [centerPanelRef, setCenterPanelRef] = useState<HTMLElement | null>(
    typeof document === 'undefined' ? null : document.body,
  );

  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setCenterPanelRef(node);
    }
  }, []);

  const isWide = useMedia('(min-width: 1024px)');

  return (
    <div ref={ref} className="bg-neutral-700 overflow-auto h-full relative">
      <PortalProvider innerRef={centerPanelRef}>
        {isWide ? (
          <div className="hidden flex-1 max-h-full h-full lg:flex">
            <FeedList />
            <ArticleList />
            <ArticleFull />
          </div>
        ) : (
          <div className="flex flex-1 max-h-full lg:hidden h-full">
            <Routes>
              <Route index path="/feeds" element={<FeedList />} />
              <Route path="/feeds/:feedId" element={<ArticleList />} />
              <Route
                path="/feeds/:feedId/:articleId"
                element={<ArticleFull />}
              />
              <Route path="*" element={<Navigate to="/feeds" replace />} />
            </Routes>
          </div>
        )}
      </PortalProvider>
    </div>
  );
}

export default memo(forwardRef(CenterPanel));
