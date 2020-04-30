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
    cmd() {
        return "dotnet restore";
    },
    description() {
        return `Restore the dotnet solution from the root of the project (via ${this.cmd()})`;
    },
    run() {
        // Verify that the solution path exists or exit early.
        dotnetPath.solutionPathOrExit();

        dir.pushd(dotnetPath.solutionDir());
        shell.echo(`Restoring nuget packages (via ${this.cmd()})...`);
        shell.exec(this.cmd());
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
