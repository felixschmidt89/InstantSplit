export default {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(@shared-constants|@shared-utils)/)",
    "\\.pnp\\.[^\\/]+$",
  ],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@shared-constants/(.*)$": "<rootDir>/../shared/constants/$1",
    "^@shared-utils/(.*)$": "<rootDir>/../shared/utils/$1",
    "^@client-utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@client-constants/apiConstants$":
      "<rootDir>/src/constants/__mocks__/apiConstants.js",
    "^@client-constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@client-hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@client-api/(.*)$": "<rootDir>/src/api/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@/(.*)$": "$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
