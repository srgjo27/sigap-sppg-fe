import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

/** Loading placeholder block. Size and shape come from `className` so it mimics the real content. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-line animate-pulse rounded-lg motion-reduce:animate-none', className)}
      {...props}
    />
  );
}
