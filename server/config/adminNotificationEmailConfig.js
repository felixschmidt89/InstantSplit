import { Resend } from 'resend';
import { devLog, errorLog } from '../utils/errorUtils.js';

// TODO: Implement resend functionality
// const resend = new Resend(process.env.RESEND_API_KEY);

export const adminEmailAddresses = {
  sender: 'admin@notifications.instantsplit.de',
  recipient: 'felix.schmidt@directbox.com',
};

export const sendAdminEmailNotification = async (mailOptions) => {
  try {
    const { from, to, subject, text } = mailOptions;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
    });

    if (error) throw error;

    devLog('Admin email notification sent successfully');
    return data;
  } catch (error) {
    errorLog(
      error,
      'Error sending admin email:',
      'Failed to send notification email.',
    );
    return null;
  }
};
