import { StatusCodes } from 'http-status-codes';
import Feedback from '../models/Feedback.js';
import { errorLog, sendInternalError } from '../utils/errorUtils.js';
import { sendAdminEmailNotification } from '../config/adminNotificationEmailConfig.js';
import { generateFeedbackEmailOptions } from '../utils/adminNotificationEmailTemplates.js';
import { touchGroupLastActive } from '../utils/group/touchGroupLastActive.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, email, messageType, feedback, groupCode, fileId } = req.body;

    touchGroupLastActive(groupCode);

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

    sendAdminEmailNotification(mailOptions);

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
