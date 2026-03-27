const extractAggregationTotal = (aggregationResult, fieldName = 'total') => {
  const hasResults = Boolean(aggregationResult?.length);

  if (!hasResults) {
    return 0;
  }

  return aggregationResult[0][fieldName] || 0;
};

export default extractAggregationTotal;
