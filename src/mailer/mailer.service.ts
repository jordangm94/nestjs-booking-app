import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendAppointmentConfirmation(recipientEmail: string, dateTime: string) {
    const formattedDateTime = new Date(dateTime).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

    return await this.resend.emails.send({
      from: 'Booking App <onboarding@resend.dev>',
      to: recipientEmail,
      subject: 'Your Appointment is Confirmed',
      html: `<p>Hi there,</p>
             <p>Your appointment is confirmed for <strong>${formattedDateTime}</strong>.</p>
             <p>Thanks for booking!</p>`,
    });
  }
}
