import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/api/auth/mutations';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { ROUTES } from '@/constants/routes';
import { LOGIN_FORM } from '@/data/login';
import { cn } from '@/lib/cn';
import { isValidEmail } from '@/utils/validation';

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

type LoginFormProps = {
  className?: string;
};

function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  const { validation } = LOGIN_FORM;

  if (!values.email) errors.email = validation.emailRequired;
  else if (!isValidEmail(values.email)) errors.email = validation.emailInvalid;

  if (!values.password) errors.password = validation.passwordRequired;

  return errors;
}

/** Login heading, description and form; rendered as the main content of `AuthLayout`. */
export function LoginForm({ className }: LoginFormProps) {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLoginMutation();

  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof LoginValues) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: LoginValues = { email: values.email.trim(), password: values.password };
    const nextErrors = validate(payload);
    setErrors(nextErrors);

    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.password) {
      passwordRef.current?.focus();
      return;
    }

    mutate(payload, {
      onSuccess: () => navigate(ROUTES.USERS, { replace: true }),
    });
  };

  return (
    <div className={cn(className)}>
      <h1 className="text-ink text-3xl font-bold tracking-tight md:text-4xl">{LOGIN_FORM.title}</h1>
      <p className="text-muted mt-2 text-sm leading-relaxed md:text-base lg:hidden">
        {LOGIN_FORM.descriptionMobile}
      </p>
      <p className="text-muted mt-2 hidden text-sm leading-relaxed md:text-base lg:block">
        {LOGIN_FORM.descriptionDesktop}
      </p>

      <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField label={LOGIN_FORM.emailLabel} error={errors.email}>
          {(control) => (
            <Input
              {...control}
              ref={emailRef}
              readOnly={isPending}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={LOGIN_FORM.emailPlaceholder}
              value={values.email}
              onChange={handleChange('email')}
            />
          )}
        </FormField>

        <FormField label={LOGIN_FORM.passwordLabel} error={errors.password}>
          {(control) => (
            <PasswordInput
              {...control}
              ref={passwordRef}
              readOnly={isPending}
              name="password"
              value={values.password}
              onChange={handleChange('password')}
            />
          )}
        </FormField>

        {isError && <Alert title={LOGIN_FORM.errorTitle}>{error.message}</Alert>}

        <Button type="submit" fullWidth isLoading={isPending} loadingText={LOGIN_FORM.submitting}>
          {LOGIN_FORM.submit}
        </Button>
      </form>
    </div>
  );
}
