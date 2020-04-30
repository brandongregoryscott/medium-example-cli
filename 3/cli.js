#!/usr/bin/env node

const program = require("commander");

// Description to display to the user when running the cli without arguments
program.description("Example cli written using ShellJS and Commander");

// Registers the dotnet command via 'cli-dotnet.js' in the same folder. Commands must be created
// in a file prefixed with the name of this main file (ie, 'cli-<command>')
program.command(
    "dotnet",
    "Run various dotnet test runner commands for the project"
);

// Attempt to parse the arguments passed in and defer to subcommands, if any.
// If no arguments are passed in, this will automatically display the help information for the user.
program.parse(process.argv);
