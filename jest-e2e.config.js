const jestConfig = require("./jest.config");

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  ...jestConfig,
  testMatch: ["<rootDir>/__tests__/**/*.(spec|test).js"],
};

module.exports = config;
