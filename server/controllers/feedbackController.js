import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import { setGroupLastActivePropertyToNow } from '../utils/databaseUtils.js';

import Feedback from '../models/Feedback.js';

import { errorLog, sendInternalError } from '../utils/errorUtils.js';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

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

    const transporter = nodemailer.createTransport({
      host: 'smtp.strato.de',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'admin@instantsplit.de',
      to: 'felix.schmidt@directbox.com',
      subject: 'New feedback created',
      text: `A new feedback has been created by ${name}.
      
      Type: "${messageType}"

      Text: "${feedback}"

      Groupcode: "${groupCode}"

      FileId: "${fileId || 'No file attached'}"
      `,
    };

    // Log error, else send
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
