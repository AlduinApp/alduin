import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useCallback } from 'react';

import useViewDispatch from '../../hooks/useViewDispatch';
import { CLOSE_MODAL } from '../../state/view/ViewActionType';
import { ModalName } from '../../state/view/ViewReducer';
import { Portal } from '../Portal';

interface ModalProps {
  identifier: ModalName;
  open: boolean;
  title?: ReactNode;
  children: ReactNode[] | ReactNode;
}

export default function Modal({
  identifier,
  open,
  title,
  children,
}: ModalProps) {
  const viewDispatch = useViewDispatch();
  const onOpenChange = useCallback(
    (openState: boolean) => {
      if (openState) return;
      viewDispatch({
        type: CLOSE_MODAL,
        payload: { identifier },
      });
    },
    [identifier, viewDispatch],
  );

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        {open && (
          <>
            <RadixDialog.Overlay className="bg-black opacity-40 absolute z-30 w-full h-full top-0" />
            <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-neutral-50 dark:bg-neutral-700 z-40 flex flex-col text-black dark:text-white focus:outline-none">
              {title === undefined ? null : (
                <div className="flex justify-center border-b-2 border-dashed border-zinc-400">
                  <RadixDialog.Title className="text-2xl p-4">
                    {title}
                  </RadixDialog.Title>
                </div>
              )}
              <div className="p-4">{children}</div>
            </RadixDialog.Content>
          </>
        )}
      </Portal>
    </RadixDialog.Root>
  );
}
