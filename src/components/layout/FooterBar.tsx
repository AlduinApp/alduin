import { memo } from 'react';

import AboutModal from '../modal/AboutModal';

function FooterBar() {
  return (
    <div className="flex flex-row justify-end h-8 items-center text-white bg-orange-400 shrink-0">
      <AboutModal />
    </div>
  );
}

export default memo(FooterBar);
