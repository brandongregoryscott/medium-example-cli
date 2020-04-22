// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dir = require("./dir");
const dotnetPath = require("./dotnet-path");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Dotnet restore command object
// -----------------------------------------------------------------------------------------

const dotnetRestore = {
    cmd: "dotnet restore",
    description() {
        return `Restore the dotnet solution from the root of the project (via ${this.cmd})`;
    },
    run() {
        dir.pushd(dotnetPath.solutionDir());
        shell.echo(`Restoring nuget packages (via ${this.cmd})...`);
        shell.exec(this.cmd);
        shell.echo("Dotnet solution restored");
        dir.popd();
    },
};

// #endregion Dotnet restore command object

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = dotnetRestore;

// #endregion Exports
