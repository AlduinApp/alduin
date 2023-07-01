import { createContext, ReactNode, useContext } from 'react';

const defaultPortalContext =
  typeof document === 'undefined' ? null : document.body;

const portalContext = createContext<HTMLElement | null>(defaultPortalContext);

export function usePortalContext() {
  const context = useContext(portalContext);
  return context;
}

interface PortalProviderProps {
  innerRef: HTMLElement | null;
  children: ReactNode;
}

export function PortalProvider({ innerRef, children }: PortalProviderProps) {
  return (
    <portalContext.Provider value={innerRef}>{children}</portalContext.Provider>
  );
}
