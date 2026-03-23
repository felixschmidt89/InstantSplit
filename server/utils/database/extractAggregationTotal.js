const extractAggregationTotal = (aggregationResult, fieldName = 'total') => {
  if (!Array.isArray(aggregationResult) || aggregationResult.length === 0) {
    return 0;
  }

  return aggregationResult[0][fieldName] || 0;
};

export default extractAggregationTotal;
