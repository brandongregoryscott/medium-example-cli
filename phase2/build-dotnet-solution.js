const shell = require("shelljs");
const {
    restoreDotnetSolution,
    solutionPathOrExit,
} = require("./restore-dotnet-solution");

function buildDotnetSolution() {
    // Check for the solution path before continuing. If we cannot find it here, the dotnet
    // restore will fail, but we're going to need the path later on anyway.
    const solutionPath = solutionPathOrExit();
    restoreDotnetSolution();

    shell.echo("Running dotnet build on the solution...");
    const result = shell.exec(`dotnet build ${solutionPath} --no-restore`);

    if (result.code !== 0) {
        shell.echo("Error running dotnet build!");
        shell.exit(result.code);
    }

    shell.echo("Dotnet solution built");
}

const buildDotnetSolutionModule = {
    buildDotnetSolution,
};

module.exports = buildDotnetSolutionModule;
