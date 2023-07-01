import useData from './useData';
import useView from './useView';

export default function useActiveFeed() {
  const view = useView();
  const data = useData();
  return data.feeds.find((feed) => feed.identifier === view.activeFeed) ?? null;
}
