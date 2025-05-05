/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @/ to the src directory
  },
  testPathIgnorePatterns: ["<rootDir>/.next/"],
};