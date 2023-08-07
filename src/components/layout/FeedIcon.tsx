import styled from '@emotion/styled';
import { memo } from 'react';
import { FaAtom, FaQuestion, FaRss } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';

import usePreferences from '../../hooks/usePreferences';
import { IFeed } from '../../services/FeedService';

interface FeedIconProps {
  feed: IFeed;
}

const ImageIcon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
  object-position: center;
`;

function FeedIcon({ feed }: FeedIconProps) {
  const { type, imageUrl } = feed;
  const { showFeedIcons } = usePreferences();

  if (showFeedIcons && imageUrl !== null) {
    return <ImageIcon src={imageUrl} />;
  }

  return (
    <>
      {type === 'rss' && <FaRss className="w-8 h-6" />}
      {type === 'atom' && <FaAtom className="w-8 h-6" />}
      {type === 'json' && <VscJson className="w-8 h-6" />}
      {type === null && <FaQuestion className="w-8 h-6" />}
    </>
  );
}
export default memo(FeedIcon);
