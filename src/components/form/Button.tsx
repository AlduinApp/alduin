import clsx from 'clsx';
import { ButtonHTMLAttributes, memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'danger';
}

function Button({ children, variant, className, ...props }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...props}
      className={clsx(
        className,
        'px-4 py-2 rounded text-white',
        variant === 'primary' &&
          'bg-blue-400 hover:bg-blue-500 dark:bg-zinc-400 dark:hover:bg-zinc-500',
        variant === 'danger' && 'bg-red-500 hover:bg-red-600',
      )}
    >
      {children}
    </button>
  );
}

export default memo(Button);
