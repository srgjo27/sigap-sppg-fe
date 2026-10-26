import { useId } from 'react';
import {
  CookingPot,
  House,
  ListChecks,
  MessageSquare,
  NotebookText,
  ShoppingCart,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@/api/auth/mutations';
import type { UserRole } from '@/api/auth/types';
import { Avatar } from '@/components/ui/Avatar';
import { Divider } from '@/components/ui/Divider';
import { Logo } from '@/components/ui/Logo';
import { ROUTES } from '@/constants/routes';
import { BRAND } from '@/data/brand';
import {
  NAV_GROUPS,
  ROLE_LABELS,
  SIDEBAR_TEXT,
  type NavGroup,
  type NavRouteKey,
} from '@/data/navigation';
import { cn } from '@/lib/cn';

/** Icon per navigable route; routes without an icon (e.g. LOGIN) are never listed in the menu. */
const NAV_ICONS: Partial<Record<NavRouteKey, LucideIcon>> = {
  HOME: House,
  MENU: NotebookText,
  PROCUREMENT: ShoppingCart,
  PRODUCTION: CookingPot,
  DISTRIBUTION: Truck,
  COMPLAINTS: MessageSquare,
  USERS: Users,
  ACTIVITY_LOG: ListChecks,
};

type NavGroupBlockProps = {
  group: NavGroup;
  className?: string;
};

function NavGroupBlock({ group, className }: NavGroupBlockProps) {
  const labelId = useId();

  return (
    <div className={className}>
      <p
        id={labelId}
        className="mb-2 px-3 text-xs font-semibold tracking-wider text-side-label uppercase"
      >
        {group.label}
      </p>
      <ul aria-labelledby={labelId} className="space-y-0.5">
        {group.items.map((item) => {
          const Icon = NAV_ICONS[item.key];
          return (
            <li key={item.key}>
              <NavLink
                to={ROUTES[item.key]}
                end={item.key === 'HOME'}
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-side-text transition-colors hover:bg-side-active focus-visible:ring-2 focus-visible:ring-side-link focus-visible:outline-none motion-reduce:transition-none',
                    isActive && 'bg-side-active font-semibold text-white',
                  )
                }
              >
                {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type AppSidebarProps = {
  /** Signed-in user. Optional until a current-user endpoint exists; the card is hidden without it. */
  user?: { name: string; role: UserRole };
  /** Kitchen name shown under the logo. Falls back to the app tagline. */
  kitchenName?: string;
  className?: string;
};

/** Content of the `AppLayout` sidebar slot: logo, grouped main navigation, user card and logout. */
export function AppSidebar({ user, kitchenName, className }: AppSidebarProps) {
  const navigate = useNavigate();
  const logout = useLogoutMutation();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate(ROUTES.LOGIN, { replace: true }),
    });
  };

  return (
    <div className={cn('flex flex-1 flex-col px-3.5 pt-5 pb-6', className)}>
      <Logo
        tone="dark"
        size="sm"
        name={BRAND.name}
        tagline={kitchenName ?? BRAND.tagline}
        className="px-2"
      />

      <nav aria-label={SIDEBAR_TEXT.navLabel} className="mt-8">
        {NAV_GROUPS.map((group, index) => (
          <NavGroupBlock key={group.label} group={group} className={cn(index > 0 && 'mt-5')} />
        ))}
      </nav>

      <div className="mt-auto">
        <Divider tone="dark" />
        <div className="mt-3 flex items-center gap-3 px-2.5">
          {user && (
            <>
              <Avatar name={user.name} tone="dark" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                <p className="truncate text-xs text-side-muted">{ROLE_LABELS[user.role]}</p>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={logout.isPending}
            className="h-8 shrink-0 rounded-lg px-1 text-sm font-semibold text-side-link transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-side-link focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"
          >
            {logout.isPending ? SIDEBAR_TEXT.loggingOut : SIDEBAR_TEXT.logout}
          </button>
        </div>
      </div>
    </div>
  );
}
