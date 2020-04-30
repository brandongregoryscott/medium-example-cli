// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dir = require("./dir");
const dotnetPath = require("./dotnet-path");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Dotnet clean command object
// -----------------------------------------------------------------------------------------

const dotnetClean = {
    cmd() {
        return `dotnet clean ${dotnetPath.solutionDir()}`;
    },
    description() {
        return `Clean the dotnet solution from the root of the project (via ${this.cmd()})`;
    },
    run() {
        // Verify that the solution path exists or exit early.
        dotnetPath.solutionPathOrExit();

        dir.pushd(dotnetPath.solutionDir());

        // We clean 'bin' and 'obj' directories first incase they are preventing the SLN from building
        shell.echo("Recursively deleting 'bin' directories...");
        const binDirs = shell.find(".").filter((e) => {
            if (e.startsWith(".git")) {
                return false;
            } // If sln is on the root of repo, we must avoid cleaning .git
            if (e.includes("node_modules")) {
                return false;
            } // Disregard any in node_modules directories
            return e.match("bin");
        });
        if (binDirs.length > 0) {
            shell.rm("-rf", binDirs);
        }
        shell.echo("'bin' directories deleted successfully!");

        shell.echo("Recursively deleting 'obj' directories...");
        const objDirs = shell.find(".").filter((e) => {
            if (e.startsWith(".git")) {
                return false;
            } // If sln is on the root of repo, we must avoid cleaning .git
            if (e.includes("node_modules")) {
                return false;
            } // Disregard any in node_modules directories
            return e.match("obj");
        });
        if (objDirs.length > 0) {
            shell.rm("-rf", objDirs);
        }
        shell.echo("'obj' directory deleted successfully!");

        dir.popd();

        // Now we let the dotnet cli clean
        shell.echo(
            `Running dotnet clean (via ${this.cmd()}) on the solution...`
        );

        const output = shell.exec(this.cmd(), { silent: true });
        shell.echo(output);

        shell.echo("Dotnet solution cleaned");
    },
};

// #endregion Dotnet clean command object

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = dotnetClean;

// #endregion Exports
