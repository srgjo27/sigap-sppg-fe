import { Plus } from 'lucide-react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { USERS_PAGE } from '@/data/users';

type UsersHeaderProps = {
  /** Id of the `<h1>`, referenced by the page section's `aria-labelledby`. */
  titleId: string;
  className?: string;
};

export function UsersHeader({ titleId, className }: UsersHeaderProps) {
  return (
    <PageHeader
      titleId={titleId}
      title={USERS_PAGE.title}
      // Kitchen name comes from the current-user endpoint, which doesn't exist yet.
      description={USERS_PAGE.description(undefined)}
      className={className}
      actions={
        // Disabled until a create endpoint and form design exist.
        <Button
          disabled
          title={USERS_PAGE.comingSoon}
          leftIcon={<Plus className="size-5" aria-hidden="true" />}
        >
          {USERS_PAGE.addUser}
        </Button>
      }
    />
  );
}
