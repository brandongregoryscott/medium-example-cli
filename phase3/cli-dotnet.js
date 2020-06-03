#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetBuild = require("./_modules/dotnet-build");
const dotnetClean = require("./_modules/dotnet-clean");
const dotnetRestore = require("./_modules/dotnet-restore");
const program = require("commander");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint / Command router
// -----------------------------------------------------------------------------------------

program
    .usage("option(s)")
    .description(
        `Run various commands for the dotnet project. Certain options can be chained together for specific behavior
        (--clean and --restore can be used in conjunction with --build).`
    )
    .option("-b, --build", dotnetBuild.description())
    .option("-c, --clean", dotnetClean.description())
    .option("-R, --restore", dotnetRestore.description())
    .parse(process.argv);

// Only run dotnet clean on its own if we aren't building in the same command
// Otherwise, that command will run the clean.
if (!program.build && program.clean) {
    dotnetClean.run();
}

// Only run dotnet restore on its own if we aren't building in the same command
// Otherwise, that command will run the restore.
if (!program.build && program.restore) {
    dotnetRestore.run();
}

if (program.build) {
    dotnetBuild.run(program.clean, program.restore);
}

// If no options are passed in, output help
if (process.argv.slice(2).length === 0) {
    program.outputHelp();
}

// #endregion Entrypoint / Command router
