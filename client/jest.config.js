export default {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
    },
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!src/**/*.d.ts",
        "!src/**/index.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    testPathIgnorePatterns: ["/node_modules/"],
    transformIgnorePatterns: [
        "/node_modules/(?!(@firebase|socket.io-client|firebase)/)"
    ],
};