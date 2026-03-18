const IS_DEVELOPMENT =
  (typeof process !== "undefined" && process.env.NODE_ENV === "development") ||
  (typeof window !== "undefined" &&
    (window.location?.hostname === "localhost" ||
      window.location?.hostname === "127.0.0.1"));

export default IS_DEVELOPMENT;
