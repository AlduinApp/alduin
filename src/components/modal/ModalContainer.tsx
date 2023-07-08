import { memo } from 'react';

import AboutModal from './AboutModal';
import AddFeedModal from './AddFeedModal';
import PreferenceModal from './PreferenceModal';

function ModalContainer() {
  return (
    <>
      <AddFeedModal />
      <PreferenceModal />
      <AboutModal />
    </>
  );
}

export default memo(ModalContainer);
