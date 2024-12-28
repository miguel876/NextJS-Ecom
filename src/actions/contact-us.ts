'use server';

import ContactUsEmail from '@/app/emails/contact-us';
import { contactUsFormSchema } from '@/components/ui/contact-us/contact-us.schema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  try {
    // Validate form data
    const validatedFields = contactUsFormSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid fields',
      };
    }

    // Send email using your email service
    await resend.emails.send({
      from: 'You <onboarding@resend.dev>',
      to: validatedFields.data.email,
      subject: 'Welcome!',
      react: ContactUsEmail(),
    });

    return {
      message: 'Email sent successfully!',
    };
  } catch (error) {
    return {
      message: 'Failed to send email',
    };
  }
}
