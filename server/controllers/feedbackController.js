import { StatusCodes } from 'http-status-codes';
import { setGroupLastActivePropertyToNow } from '../utils/databaseUtils.js';
import Feedback from '../models/Feedback.js';
import { errorLog, sendInternalError } from '../utils/errorUtils.js';
import { createAdminEmailTransporter } from '../config/adminNotificationEmailConfig.js';
import { generateFeedbackEmailOptions } from '../utils/adminNotificationEmailTemplates.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, email, messageType, feedback, groupCode, fileId } = req.body;

    setGroupLastActivePropertyToNow(groupCode);

    const newFeedback = new Feedback({
      name,
      email,
      messageType,
      feedback,
      groupCode,
      fileId,
    });

    const savedFeedback = await newFeedback.save();

    const mailOptions = generateFeedbackEmailOptions({
      name,
      messageType,
      feedback,
      groupCode,
      fileId,
    });

    const transporter = createAdminEmailTransporter();

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        errorLog(
          error,
          'Error sending feedback email:',
          'Failed to send feedback email. Please try again later.',
        );
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      savedFeedback,
      message: 'Feedback received successfully - thanks!',
    });
  } catch (error) {
    errorLog(
      error,
      'Error creating feedback:',
      'Failed to create feedback. Please try again later.',
    );
    sendInternalError(res, error);
  }
};
