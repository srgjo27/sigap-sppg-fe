import { useState, type ComponentProps } from 'react';

import { Button } from './Button';
import { Input } from './Input';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type' | 'endAdornment'> & {
  /** Toggle label while the password is hidden. */
  showLabel?: string;
  /** Toggle label while the password is visible. */
  hideLabel?: string;
};

export function PasswordInput({
  id,
  disabled,
  autoComplete = 'current-password',
  showLabel = 'Tampilkan',
  hideLabel = 'Sembunyikan',
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      {...props}
      id={id}
      type={isVisible ? 'text' : 'password'}
      disabled={disabled}
      autoComplete={autoComplete}
      endAdornment={
        <Button
          variant="link"
          type="button"
          aria-controls={id}
          disabled={disabled}
          onClick={() => setIsVisible((visible) => !visible)}
        >
          {isVisible ? hideLabel : showLabel}
        </Button>
      }
    />
  );
}
