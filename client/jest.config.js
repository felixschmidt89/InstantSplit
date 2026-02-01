export default {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  transformIgnorePatterns: ["node_modules", "\\.pnp\\.[^\\/]+$"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^.*constants/apiConstants$":
      "<rootDir>/src/constants/__mocks__/apiConstants.js",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
