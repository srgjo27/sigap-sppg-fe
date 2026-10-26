import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/cn';

const SKELETON_ROWS = 6;

type UsersTableSkeletonProps = {
  className?: string;
};

/** Loading placeholder mimicking the users table card: header bar + rows (avatar + 2 text lines). */
export function UsersTableSkeleton({ className }: UsersTableSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('border-line bg-surface overflow-hidden rounded-2xl border', className)}
    >
      <div className="border-line flex h-10 items-center gap-8 border-b px-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="hidden h-3 w-16 md:block" />
        <Skeleton className="hidden h-3 w-20 md:block" />
        <Skeleton className="hidden h-3 w-16 lg:block" />
      </div>
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div
          key={index}
          className="border-line-soft-3 flex h-16 items-center gap-8 border-b px-5 last:border-0"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none">
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <Skeleton className="hidden h-3 w-24 md:block" />
          <Skeleton className="hidden h-3 w-32 md:block" />
          <Skeleton className="hidden h-6 w-16 rounded-full lg:block" />
        </div>
      ))}
    </div>
  );
}
