import { Logo } from '@/components/ui/Logo';
import { StepList } from '@/components/ui/StepList';
import { BRAND } from '@/data/brand';
import { LOGIN_INTRO } from '@/data/login';
import { cn } from '@/lib/cn';

type LoginIntroPanelProps = {
  className?: string;
};

/** Desktop left panel of the login page; rendered inside the `aside` slot of `AuthLayout`. */
export function LoginIntroPanel({ className }: LoginIntroPanelProps) {
  return (
    <div className={cn('flex flex-1 flex-col justify-between', className)}>
      <Logo tone="dark" name={BRAND.name} tagline={BRAND.tagline} />

      <div>
        {/* Decorative copy, not a heading: the page's only h1 lives in the login form. */}
        <p className="max-w-xl text-4xl font-bold xl:text-5xl tracking-tight text-white">
          {LOGIN_INTRO.tagline}
        </p>
        <StepList items={LOGIN_INTRO.steps} className="mt-8" />
      </div>

      <p className="text-xs text-side-muted">{LOGIN_INTRO.footnote}</p>
    </div>
  );
}
