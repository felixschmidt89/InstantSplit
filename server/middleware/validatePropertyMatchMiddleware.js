import { StatusCodes } from 'http-status-codes';
import User from '../models/Member.js';

/**
 * Checks if a provided property value in the request body matches the one in the database.
 * @param {string} propertyName - The name of the property to check.
 * @param {Model} model - The Mongoose model to query for comparison.
 */
export const validatePropertyValueMatchMiddleware = (propertyName, model) => {
  return async (req, res, next) => {
    try {
      // Destructure the property value and groupCode from the request body
      const { [propertyName]: propertyValue, groupCode } = req.body;

      // Use Mongoose's findOne method to check if a document exists with the specified properties
      const existingDocument = await model.findOne({
        groupCode,
        [propertyName]: propertyValue,
      });

      if (!existingDocument) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: `${model.modelName} does not exist in the database.`,
        });
      }
      next();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `Error checking ${propertyName} value database match:`,
          error,
        );
      }
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error. Please try again later.' });
    }
  };
};

/**
 * Checks if the provided userName in the request body matches the one in the database.
 */
export const checkUserNameMatchMiddleware =
  validatePropertyValueMatchMiddleware('userName', User);
