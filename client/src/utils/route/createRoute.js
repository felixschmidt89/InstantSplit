import buildPath from "./buildPath.js";

const createRoute =
  (path) =>
  (...params) =>
    buildPath(path, params);

export default createRoute;
