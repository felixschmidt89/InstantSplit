export const debugLog = (message = "debug", data) => {
  const isDevelopment =
    typeof process !== "undefined" && process.env.NODE_ENV === "development"
      ? true
      : typeof window !== "undefined" &&
        (window.location?.hostname === "localhost" ||
          window.location?.hostname === "127.0.0.1");

  if (isDevelopment) {
    if (data !== undefined) {
      if (data instanceof Error) {
        console.error(message, data);
      } else {
        console.log(message, data);
      }
    } else {
      console.log(message);
    }
  }
};
