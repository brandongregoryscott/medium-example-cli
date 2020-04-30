// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetClean = require("./dotnet-clean");
const dotnetPath = require("./dotnet-path");
const dotnetRestore = require("./dotnet-restore");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Dotnet build command object
// -----------------------------------------------------------------------------------------

const dotnetBuild = {
    cmd() {
        return `dotnet build ${dotnetPath.solutionPath()} --no-restore`;
    },
    description() {
        return `Builds the dotnet project (via ${this.cmd()})`;
    },
    run(clean, restore) {
        // Verify that the solution path exists or exit early.
        dotnetPath.solutionPathOrExit();

        if (clean) {
            dotnetClean.run();
        }

        if (restore) {
            dotnetRestore.run();
        }

        shell.echo(`Building solution (via ${this.cmd()})...`);

        const buildResult = shell.exec(this.cmd(), { silent: true });
        shell.echo(formatters.dotnet(buildResult));

        if (buildResult.code !== 0) {
            echo.error("Solution failed to build. See output for details.");
            shell.exit(buildResult.code);
        }

        return buildResult.code;
    },
};

// #endregion Dotnet build command object

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = dotnetBuild;

// #endregion Exports
