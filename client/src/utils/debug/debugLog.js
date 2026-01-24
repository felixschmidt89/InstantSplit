export const debugLog = (message = "debug", data) => {
  if (process.env.NODE_ENV === "development") {
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
