const IS_DEVELOPMENT =
  (typeof process !== "undefined" && process.env.NODE_ENV === "development") ||
  (typeof window !== "undefined" &&
    (window.location?.hostname === "localhost" ||
      window.location?.hostname === "127.0.0.1"));

const IS_PRODUCTION =
  typeof process !== "undefined" && process.env.NODE_ENV === "production";

const ENVIRONMENT = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
};

export default ENVIRONMENT;
