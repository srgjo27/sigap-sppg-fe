import { cn } from '@/lib/cn';

/** Class sets per surface the list sits on: `dark` = `side-bg`. */
const tones = {
  dark: {
    number: 'bg-brand-500 text-white',
    connector: 'bg-side-line',
    title: 'text-white',
    description: 'text-side-muted',
  },
} as const;

export type StepItem = {
  title: string;
  description?: string;
};

type StepListProps = {
  items: StepItem[];
  /** Surface the list is placed on. */
  tone?: keyof typeof tones;
  className?: string;
};

export function StepList({ items, tone = 'dark', className }: StepListProps) {
  const toneClasses = tones[tone];

  return (
    <ol className={cn('flex flex-col', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={`${item.title}-${index}`} className="flex gap-4">
            <div className="flex shrink-0 flex-col items-center">
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
                  toneClasses.number,
                )}
              >
                {index + 1}
              </span>
              {!isLast && <span className={cn('min-h-7 w-0.5 flex-1', toneClasses.connector)} />}
            </div>
            <div className={cn('min-w-0', !isLast && 'pb-4')}>
              <p className={cn('text-base font-semibold', toneClasses.title)}>{item.title}</p>
              {item.description && (
                <p className={cn('text-sm', toneClasses.description)}>{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
