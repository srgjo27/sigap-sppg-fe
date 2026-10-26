import { Divider } from '@/components/ui/Divider';
import { LOGIN_FORGOT } from '@/data/login';
import { cn } from '@/lib/cn';

type ForgotPasswordInfoProps = {
  className?: string;
};

/** Static "Lupa password?" note; rendered in the `footer` slot of `AuthLayout`. */
export function ForgotPasswordInfo({ className }: ForgotPasswordInfoProps) {
  return (
    <div className={cn(className)}>
      <Divider className="mt-7 mb-5" />
      <h2 className="text-ink text-sm font-semibold">{LOGIN_FORGOT.title}</h2>
      <p className="text-muted mt-1 text-sm leading-relaxed">{LOGIN_FORGOT.text}</p>
    </div>
  );
}
