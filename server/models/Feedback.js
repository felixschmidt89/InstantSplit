import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    messageType: {
      type: String,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2500,
    },
    groupCode: {
      type: String,
    },
    fileId: {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
  },
  { timestamps: true },
);

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
