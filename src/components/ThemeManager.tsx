import clsx from 'clsx';
import { memo, ReactNode } from 'react';

import useDark from '../hooks/useDark';

interface ThemeManagerProps {
  children: ReactNode;
}

function ThemeManager({ children }: ThemeManagerProps) {
  const isDark = useDark();

  return <div className={clsx(isDark && 'dark')}>{children}</div>;
}

export default memo(ThemeManager);
