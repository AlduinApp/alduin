import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, memo } from 'react';
import { IconType } from 'react-icons';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
}

function IconButton(
  { Icon, ...props }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      className={clsx(props.className, 'hover:text-white')}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}

export default memo(forwardRef(IconButton));
