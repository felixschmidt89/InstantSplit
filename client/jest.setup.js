global.import = {
  meta: {
    env: {
      VITE_REACT_APP_API_URL: "http://localhost:5000/api",
    },
  },
};

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});
