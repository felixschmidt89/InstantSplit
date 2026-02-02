import { devLog } from "./errorUtils";

export const buildDynamicRoute = (ROUTE, parameters = {}) => {
  const dynamicRoute = Object.entries(parameters).reduce(
    (path, [key, value]) => {
      return path.replace(`:${key}`, value);
    },
    ROUTE,
  );

  devLog(`Dynamic Route built: ${ROUTE} -> ${dynamicRoute}`);
  return dynamicRoute;
};

export const createRoute =
  (ROUTE, parameterKeys) =>
  (...values) => {
    const parameters = parameterKeys.reduce((accumulator, key, index) => {
      return { ...accumulator, [key]: values[index] };
    }, {});

    devLog(`Mapping parameters for route: ${ROUTE}`, parameters);
    return buildDynamicRoute(ROUTE, parameters);
  };
