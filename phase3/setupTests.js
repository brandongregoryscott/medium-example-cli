// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Mocks
// -----------------------------------------------------------------------------------------

// Globally mocking shell.echo to suppress additional output
shell.echo = jest.fn();

// Globally mocking shell.exec to prevent tests from firing off child processes
shell.exec = jest.fn(() => {
    return { code: 0, stdout: "", stderr: "" };
});

// Globally mocking shell.exit to prevent exit calls from killing tests
shell.exit = jest.fn();

// #endregion Mocks
