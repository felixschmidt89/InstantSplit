import API_HEADER_CONSTANTS from '../../../shared/constants/api/apiHeaderConstants.js';

const { HEADERS } = API_HEADER_CONSTANTS;
const { GROUPCODE } = HEADERS;

// TODO: Move to JWS token verification eventually
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
