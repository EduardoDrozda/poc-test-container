/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  rootDir: "",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "html", "lcov"],
};

module.exports = config;
