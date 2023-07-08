import { getVersion } from '@tauri-apps/api/app';
import { memo } from 'react';
import { FaSpinner } from 'react-icons/fa';

import useModal from '../../hooks/useModal';
import usePromise from '../../hooks/usePromise';

import { ModalFormContent } from './AddFeedModal';
import Modal from './Modal';

const modalIdentifier = 'about';

function AboutModal() {
  const { isOpen } = useModal<ModalFormContent>(modalIdentifier);

  const { loading, value: version } = usePromise<string>(getVersion());

  return (
    <Modal identifier={modalIdentifier} open={isOpen}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center gap-8">
          <img src="/icon.png" className="w-20 h-20" />
          <div className="flex flex-col">
            <div className="flex items-end gap-2">
              <h2 className="text-2xl font-bold">Alduin</h2>
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <h3 className="text-xl font-semibold">{version}</h3>
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              An RSS, Atom and JSON feed aggregator available on Windows and
              Linux.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default memo(AboutModal);
