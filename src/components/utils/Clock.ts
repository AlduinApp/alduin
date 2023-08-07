import { memo } from 'react';
import { useInterval } from 'react-use';

import useFeeds from '../../hooks/useFeeds';
import useSync from '../../hooks/useSync';

const clockTick = 1000 * 30;

function Clock() {
  const { feeds } = useFeeds();
  const { sync } = useSync();

  useInterval(() => {
    for (const { identifier, interval, lastUpdated, url } of feeds) {
      if (Date.now() - (lastUpdated ?? 0) < interval * 60 * 1000) continue;
      sync([{ identifier, url }]);
    }
  }, clockTick);

  return null;
}

export default memo(Clock);
