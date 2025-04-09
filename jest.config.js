export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "^@src/(.*)": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTest.js"
  ],
};
