import { Schema, model } from 'mongoose';

const fileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    mimetype: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
    },
    cloudinaryURL: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const File = model('File', fileSchema);

export default File;
