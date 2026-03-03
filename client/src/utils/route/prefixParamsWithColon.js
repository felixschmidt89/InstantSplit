const prefixParamsWithColon = (params) => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, `:${value}`]),
  );
};

export default prefixParamsWithColon;
