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

    console.log(validatedFields.data.email);

    // Send email using your email service
    await resend.emails.send({
      from: 'Miguel Santos <miguel_santos96@hotmail.com>',
      to: [validatedFields.data.email],
      subject: 'Contact Us Migstore!',
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
