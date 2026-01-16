import { adminEmailAddresses } from '../config/adminNotificationEmailConfig.js';
import { isProductionEnvironment } from './isProductionEnvironment.js';

const getEmailSubjectPrefix = () =>
  isProductionEnvironment ? '[PROD] ' : '[DEV] ';

export const generateGroupCreationEmailOptions = (groupName) => ({
  from: adminEmailAddresses.sender,
  to: adminEmailAddresses.recipient,
  subject: `${getEmailSubjectPrefix()}New group ${groupName} created`,
  text: `GroupName: ${groupName}`,
});

export const generateFeedbackEmailOptions = (feedbackData) => {
  const { name, messageType, feedback, groupCode, fileId } = feedbackData;

  return {
    from: adminEmailAddresses.sender,
    to: adminEmailAddresses.recipient,
    subject: `${getEmailSubjectPrefix()}New feedback received`,
    text: `A new feedback has been sent by ${name}.
      
      Type: ${messageType}
      Text: ${feedback}
      Groupcode: ${groupCode}
      FileId: ${fileId || 'No file attached'}
      `,
  };
};
