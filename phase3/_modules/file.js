// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region File command object
// -----------------------------------------------------------------------------------------

const file = {
    /**
     * Returns the first match of the provided file expression
     * @param {*} fileExpression
     */
    first(fileExpression) {
        shell.config.silent = true;
        const result = shell.ls(fileExpression)[0];
        shell.config.reset();
        return result;
    },
};

// #endregion File command object

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = file;

// #endregion Exports
