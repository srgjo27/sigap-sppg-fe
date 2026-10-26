import { AuthLayout } from '@/components/layout/AuthLayout';
import { ForgotPasswordInfo } from '@/components/sections/login/ForgotPasswordInfo';
import { LoginForm } from '@/components/sections/login/LoginForm';
import { LoginIntroPanel } from '@/components/sections/login/LoginIntroPanel';
import { Logo } from '@/components/ui/Logo';
import { BRAND } from '@/data/brand';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function LoginPage() {
  useDocumentTitle('Masuk');

  return (
    <AuthLayout
      asideLabel={`Tentang ${BRAND.name}`}
      aside={<LoginIntroPanel />}
      header={<Logo tone="light" name={BRAND.name} tagline={BRAND.tagline} />}
      footer={<ForgotPasswordInfo />}
    >
      {/* LoginForm holds the page's only <h1> */}
      <LoginForm />
    </AuthLayout>
  );
}
