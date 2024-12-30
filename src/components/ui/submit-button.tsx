'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './button';
import { useTranslations } from 'next-intl';

interface SubmitButtonProps {
  text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const translate = useTranslations('labels');

  return (
    <Button type="submit" disabled={pending}>
      <span>{pending ? translate('loading') : text}</span>
    </Button>
  );
};

export default SubmitButton;
