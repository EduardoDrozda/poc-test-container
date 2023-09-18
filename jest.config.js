/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  rootDir: "",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "html", "lcov"],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

module.exports = config;
