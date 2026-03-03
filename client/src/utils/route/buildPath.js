const buildPath = (path, params = []) => {
  if (params.length === 0) return path;
  return `${path}/${params.join("/")}`;
};

export default buildPath;
