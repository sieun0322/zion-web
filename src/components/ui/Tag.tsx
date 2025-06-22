'use client';

import React from 'react';
import { getTagClasses, TagVariant } from '@/lib/tagVariants';

type TagProps = {
  children: React.ReactNode;
  variant?: TagVariant;
};

export default function Tag({ children, variant = 'primary' }: TagProps) {
  const baseClasses = `
    inline-block px-3 py-1 text-sm font-medium rounded-md
    transition
  `;
  const variantClasses = getTagClasses(variant);

  return <span className={`${baseClasses} ${variantClasses}`}>{children}</span>;
}
