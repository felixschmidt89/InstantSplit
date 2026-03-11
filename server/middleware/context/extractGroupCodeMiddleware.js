import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

const extractGroupCodeMiddleware = (req, res, next) => {
  const groupCode =
    req.headers[GROUPCODE.toLowerCase()] ||
    req.body?.groupCode ||
    req.params?.groupCode;

  if (groupCode) {
    req.context = {
      ...req.context,
      groupCode: groupCode.toUpperCase(),
    };
  }

  next();
};

export default extractGroupCodeMiddleware;
