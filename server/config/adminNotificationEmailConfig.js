import nodemailer from 'nodemailer';

export const adminEmailTransporter = nodemailer.createTransport({
  host: 'smtp.strato.de',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
