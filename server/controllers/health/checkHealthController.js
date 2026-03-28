import { StatusCodes } from 'http-status-codes';

const { OK } = StatusCodes;

const checkHealthController = (req, res) =>
  res.status(OK).json({
    success: true,
    data: null,
  });

export default checkHealthController;
