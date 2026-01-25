export default {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  // CODECHANGE: Allow transformation of the shared directory
  // and specific node_modules if needed.
  transformIgnorePatterns: [
    "/node_modules/(?!(@shared-constants)/)",
    "\\.pnp\\.[^\\/]+$",
  ],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@shared-constants/(.*)$": "<rootDir>/../shared/constants/$1",
    "^@client-utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@client-constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@client-hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
