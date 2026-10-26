import type { Key, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type DataTableColumn<T> = {
  /** Unique column id, used as React key. */
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  /** Extra classes for the body cells of this column. */
  className?: string;
  /** Extra classes for the header cell (e.g. `sr-only` content inside, or alignment). */
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => Key;
  /** Accessible table name, visually hidden. */
  caption: string;
  className?: string;
};

/** Presentational table inside a bordered card; scrolls horizontally when wider than its container. */
export function DataTable<T>({ columns, rows, getRowKey, caption, className }: DataTableProps<T>) {
  return (
    <div className={cn('border-line bg-surface overflow-x-auto rounded-2xl border', className)}>
      <table className="w-full min-w-max text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'border-line text-muted h-10 border-b px-5 text-xs font-semibold tracking-wider uppercase',
                  column.headerClassName,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-line-soft-3 border-b last:border-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn('text-ink h-16 px-5 align-middle', column.className)}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
