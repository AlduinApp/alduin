import { memo, useCallback } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

import useModal from '../../hooks/useModal';
import IconButton from '../form/IconButton';

import { ModalFormContent } from './AddFeedModal';
import Modal from './Modal';

const modalIdentifier = 'about';

function AboutModal() {
  const { open, isOpen } = useModal<ModalFormContent>(modalIdentifier);

  const handleOpen = useCallback(() => {
    open();
  }, [open]);

  return (
    <Modal identifier={modalIdentifier} open={isOpen}>
      <div
        className="flex flex-row justify-center gap-2 cursor-pointer"
        onClick={handleOpen}
      >
        <IconButton Icon={FaQuestionCircle} />
        About
      </div>
      {'About Alduin'}
      <div>Content</div>
      <p>Footer</p>
    </Modal>
  );
}

export default memo(AboutModal);
