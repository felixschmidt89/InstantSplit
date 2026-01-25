export default {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@client-utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@client-constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@client-hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
