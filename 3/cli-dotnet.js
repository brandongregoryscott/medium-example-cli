#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const { spawnSync } = require("child_process");
const dotnetPath = require("./_modules/dotnet-path");
const dotnetBuild = require("./_modules/dotnet-build");
const dotnetClean = require("./_modules/dotnet-clean");
const dotnetRestore = require("./_modules/dotnet-restore");
const program = require("commander");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Dotnet command object
// -----------------------------------------------------------------------------------------

const dotnet = {
    cmd(mode) {
        return {
            args: [mode, "--no-restore"],
            cmd: "dotnet",
            toString() {
                return `${this.cmd} ${this.args.join(" ")}`;
            },
        };
    },
    description() {
        return `Runs the dotnet project`;
    },
    run(mode) {
        if (program.clean) {
            dotnetClean.run();
        }

        if (program.restore) {
            dotnetRestore.run();
        }

        dir.pushd(dotnetPath.webProjectFileDir());

        // Since the spawnSync function takes the base command and all arguments separately, we cannot
        // leverage the base dotnet command string here. We'll build out the arg list in an array.
        const { cmd, args } = this.cmd(mode);

        shell.echo(`Running dotnet (via ${cmd} ${args.join(" ")})...`);
        const result = spawnSync(cmd, args, {
            stdio: "inherit",
            shell: true,
        });

        if (result.status !== 0) {
            shell.echo(`Exited with error: ${result.status}`);
            shell.exit(result.status);
        }

        dir.popd();
    },
};

// #endregion Dotnet command object

// -----------------------------------------------------------------------------------------
// #region Entrypoint / Command router
// -----------------------------------------------------------------------------------------

program
    .usage("option(s)")
    .description(
        `${dotnet.description()} Certain options can be chained together for specific behavior ` +
            "(--clean and --restore can be used in conjunction with --build)."
    )
    .option("-b, --build", dotnetBuild.description())
    .option("-c, --clean", dotnetClean.description())
    .option("-R, --restore", dotnetRestore.description())
    .option("-r, --run", dotnet.description("run"))
    .option("-w, --watch", dotnet.description("watch run"))
    .parse(process.argv);

// Only run dotnet clean on its own if we aren't building, running, or watching in the same command
// Otherwise, those commands will run the clean.
if (!program.build && !program.run && !program.watch && program.clean) {
    dotnetClean.run();
}

// Only run dotnet restore on its own if we aren't building, running, or watching in the same command
// Otherwise, those commands will run the restore.
if (!program.build && !program.run && !program.watch && program.restore) {
    dotnetRestore.run();
}

if (program.build) {
    dotnetBuild.run(program.clean, program.restore);
}
if (program.run) {
    dotnet.run("run");
}
if (program.watch) {
    dotnet.run("watch run");
}

// If no options are passed in, runs dotnet
if (process.argv.slice(2).length === 0) {
    dotnet.run("run");
}

// #endregion Entrypoint / Command router
