const generateDynamicRoute = (basePath, params) => {
  return `${basePath}/${params.join("/")}`;
};

export default generateDynamicRoute;
