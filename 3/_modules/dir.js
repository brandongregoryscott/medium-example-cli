// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const fs = require("fs");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Directory command object
// -----------------------------------------------------------------------------------------

const dir = {
    /**
     * Deletes the directory provided it exists
     * @param {string} dir Relative or absolute path to directory
     */
    deleteIfExists(dir) {
        if (!fs.existsSync(dir)) {
            shell.echo(`Directory '${dir}' does not exist. Nothing to delete.`);
            return;
        }

        shell.rm("-rf", dir);
        shell.echo(`Directory '${dir}' successfully deleted`);
    },
    popd(dir) {
        shell.popd("-q", dir);
    },
    pushd(dir) {
        shell.pushd("-q", dir);
    },
};

// #endregion Directory command object

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = dir;

// #endregion Exports
