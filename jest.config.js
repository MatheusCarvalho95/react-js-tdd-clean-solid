module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*.{ts,tsx}",
    "!<rootDir>/src/presentation/**/index.ts",
    "!<rootDir>/src/domain/**/index.ts",
    "!<rootDir>/src/presentation/components/router/**/*",
    "!<rootDir>/src/presentation/**/index.tsx",
    "!<rootDir>/src/validation/**/index.ts",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.scss$": "identity-obj-proxy",
  },
  testIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/main/test/cypress",
  ],
};
