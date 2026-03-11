import touchGroupLastActive from '../../utils/group/touchGroupLastActive.js';

const touchGroupLastActiveMiddleware = (req, res, next) => {
  res.on('finish', () => {
    const { groupCode } = req.context || {};

    if (groupCode) {
      touchGroupLastActive(groupCode);
    }
  });

  next();
};

export default touchGroupLastActiveMiddleware;
