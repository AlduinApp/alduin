import styled from '@emotion/styled';
import { memo } from 'react';
import { FaAtom, FaQuestion, FaRss } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';

import usePreference from '../../hooks/usePreference';
import Feed from '../../types/Feed';

interface FeedIconProps {
  feed: Feed;
}

const ImageIcon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;

function FeedIcon({ feed }: FeedIconProps) {
  const { type, image } = feed;
  const { showFeedIcons } = usePreference();

  if (showFeedIcons && image !== null) {
    return <ImageIcon src={image.uri} alt={image.description || ''} />;
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
