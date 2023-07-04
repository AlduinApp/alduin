import { memo } from 'react';
import { useInterval } from 'react-use';

import useData from '../hooks/useData';
import useSync from '../hooks/useSync';

const clockTick = 1000 * 30;

function Clock() {
  const data = useData();
  const { sync } = useSync();

  useInterval(() => {
    for (const { identifier, interval, lastUpdated } of data.feeds) {
      if (Date.now() - lastUpdated < interval * 60 * 1000) continue;
      sync(identifier);
    }
  }, clockTick);

  return null;
}

export default memo(Clock);
