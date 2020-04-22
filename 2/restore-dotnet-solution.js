const shell = require("shelljs");

// Wild-card searches used when finding the solution file. Ordered by most to least performant
const solutionFilePaths = ["*.sln", "dotnet/*.sln", "dotnet/*/*.sln"];

/**
 * Returns the first match of the provided file expression
 */
function getFirstFile(fileExpression) {
    const result = shell.ls(fileExpression)[0];
    return result;
}

/**
 * Retrieves the first dotnet solution file path from a list of common paths
 */
function getSolutionPath() {
    let solutionPath;
    for (var filePath of solutionFilePaths) {
        solutionPath = getFirstFile(filePath);
        if (solutionPath !== undefined) {
            return solutionPath;
        }
    }

    return undefined;
}

/**
 * Calls dotnet restore on the solution path (if found). Exits with an error message
 * if the restore command returns a failure exit code.
 *
 */
function restoreDotnetSolution() {
    const solutionPath = solutionPathOrExit();
    shell.echo("Running dotnet restore on the solution...");
    const result = shell.exec(`dotnet restore ${solutionPath}`);

    if (result.code !== 0) {
        shell.echo("Error running dotnet restore!");
        shell.exit(result.code);
    }

    shell.echo("Dotnet solution restored");
}

/**
 * Retrieves the dotnet solution file path or exits if it isn't found
 */
function solutionPathOrExit() {
    const solutionPath = restoreDotnetSolutionModule.getSolutionPath();
    if (solutionPath !== undefined) {
        return solutionPath;
    }

    shell.echo("Unable to find dotnet solution file");
    shell.exit(1);
}

const restoreDotnetSolutionModule = {
    getSolutionPath,
    getFirstFile,
    solutionPathOrExit,
    restoreDotnetSolution,
};

module.exports = restoreDotnetSolutionModule;
