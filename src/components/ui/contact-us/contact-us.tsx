'use client';

import React, { useEffect } from 'react';
import { Input } from '../input';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import SubmitButton from '../submit-button';
import { sendEmail } from '@/actions/contact-us';

export const ContactUs = () => {
  const translate = useTranslations('labels');
  const [state, formAction] = useFormState(sendEmail, undefined);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="container flex items-center mt-20 mb-10 flex-col">
      <h1 className="text-3xl mb-4">{translate('contactUs')}</h1>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
        viverra enim, dignissim lacinia est.
      </p>
      <form action={formAction} className="flex flex-col gap-4 w-full sm:w-1/3">
        <Input name="email" type="email" placeholder={translate('email')} />
        <SubmitButton text={translate('send')} />
      </form>
    </div>
  );
};
