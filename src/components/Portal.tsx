import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { usePortalContext } from './context/PortalContext';

interface PortalProps {
  children: ReactNode;
}

export function Portal(props: PortalProps) {
  const element = usePortalContext();
  if (element === null) {
    return null;
  }
  return createPortal(props.children, element);
}
