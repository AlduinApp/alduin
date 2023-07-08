import { memo, useCallback } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

import useModal from '../../hooks/useModal';
import IconButton from '../form/IconButton';

function FooterBar() {
  const { open } = useModal<undefined>('about');
  const handleOpenAbout = useCallback(() => {
    open();
  }, [open]);

  return (
    <div className="flex flex-row justify-end h-8 items-center text-white bg-orange-400 shrink-0 px-4">
      <div
        className="flex flex-row justify-center gap-2 cursor-pointer"
        onClick={handleOpenAbout}
      >
        <IconButton Icon={FaQuestionCircle} />
        <span className="hover:underline">About</span>
      </div>
    </div>
  );
}

export default memo(FooterBar);
