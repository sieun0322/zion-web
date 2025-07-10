'use client';

import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md font-semibold transition',
        'bg-light-accent text-white dark:bg-dark-accent',
        'hover:opacity-90',
        className
      )}
    >
      {children}
    </button>
  );
}
