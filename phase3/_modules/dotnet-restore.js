// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetPath = require("./dotnet-path");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Dotnet restore command object
// -----------------------------------------------------------------------------------------

const dotnetRestore = {
    cmd() {
        return `dotnet ${dotnetPath.solutionPath()} restore`;
    },
    description() {
        return `Restore the dotnet solution from the root of the project (via ${this.cmd()})`;
    },
    run() {
        // Verify that the solution path exists or exit early.
        dotnetPath.solutionPathOrExit();

        shell.echo(`Restoring nuget packages (via ${this.cmd()})...`);

        const restoreResult = shell.exec(this.cmd());
        if (restoreResult.code !== 0) {
            shell.echo("Solution failed to restore. See output for details.");
            shell.exit(restoreResult.code);
        }

        shell.echo("Dotnet solution restored");

        return restoreResult.code;
    },
};

// #endregion Dotnet restore command object

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = dotnetRestore;

// #endregion Exports
