import { Resend } from 'resend';
import { devLog, errorLog } from '../utils/errorUtils.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const adminEmailAddresses = {
  sender: 'admin@instantsplit.de',
  recipient: 'felix.schmidt@directbox.com',
};

export const sendAdminNotification = async (mailOptions) => {
  try {
    const { from, to, subject, text } = mailOptions;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
    });

    if (error) {
      throw error;
    }

    devLog('Admin notification sent successfully');
    return data;
  } catch (error) {
    errorLog(
      error,
      'Error sending admin notification via Resend:',
      'Failed to send notification email. Please try again later.',
    );
    return null;
  }
};
