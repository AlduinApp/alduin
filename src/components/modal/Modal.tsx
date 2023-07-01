import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

import { Portal } from '../Portal';

interface ModalProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  children: [ReactNode, ReactNode, ReactNode, ReactNode];
}

export default function Modal({
  open,
  onOpenChange,
  children: [trigger, title, body],
}: ModalProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <Portal>
        {open && (
          <>
            <RadixDialog.Overlay className="bg-black opacity-40 absolute z-30 w-full h-full top-0" />
            <RadixDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-neutral-700 z-40 flex flex-col text-white focus:outline-none">
              <div className="flex justify-center border-b-2 border-dashed border-zinc-400">
                <RadixDialog.Title className="text-2xl p-4">
                  {title}
                </RadixDialog.Title>
              </div>
              <div className="p-4">{body}</div>
            </RadixDialog.Content>
          </>
        )}
      </Portal>
    </RadixDialog.Root>
  );
}
