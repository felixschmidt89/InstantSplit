import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

const extractGroupCodeMiddleware = (req, res, next) => {
  const groupCode =
    req.headers[GROUPCODE.toLowerCase()] ||
    req.body?.groupCode ||
    req.params?.groupCode;

  const hasGroupCode = Boolean(groupCode);

  if (hasGroupCode) {
    req.groupCode = groupCode.toUpperCase();

    req.context = {
      ...req.context,
      groupCode: req.groupCode,
    };
  }

  next();
};

export default extractGroupCodeMiddleware;
