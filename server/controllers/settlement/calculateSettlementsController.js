const calculateSettlementsController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;

    const settlements = await calculateSettlementsService(groupCode);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: { settlements },
    });
  } catch (error) {
    next(error);
  }
};
