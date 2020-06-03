# medium-example-cli

Contains runnable examples from [Building a CLI to Improve Developer Productivity](https://medium.com/p/1791b001d9b5). Each part of the blog post is broken out into a "phase" which is listed in the article.

## Usage
All of these examples assume you are running these commands from a directory that has a dotnet solution below it. For brevity, directories have been stripped out of the example commands. You will need to provide an absolute or relative path to the scripts in the following examples, i.e. `source ~/medium-example-cli/dotnet-restore.sh && restoreDotnetSolution`

### Phase 1 [(src)](https://github.com/brandongregoryscott/medium-example-cli/tree/master/phase1)
[`dotnet-restore.sh`](https://github.com/brandongregoryscott/medium-example-cli/blob/master/phase1/dotnet-restore.sh) offers a simple example of a bash script that restores a dotnet solution based on a variable. To run it on your own machine, edit the `DOTNET_SOLUTION_FILE_PATH` variable to be a path to one of your own dotnet projects. 

Then, in a terminal run it with: `source dotnet-restore.sh && restoreDotnetSolution`

[`find-dotnet-solution-ex1.sh`](https://github.com/brandongregoryscott/medium-example-cli/blob/master/phase1/find-dotnet-solution-ex1.sh) and [`find-dotnet-solution-ex2.sh`](https://github.com/brandongregoryscott/medium-example-cli/blob/master/phase1/find-dotnet-solution-ex2.sh) both have solutions to more dynamically locate your dotnet project. 

In a terminal, run `source find-dotnet-solution-ex1.sh && findDotnetSolution`

### Phase 2 [(src)](https://github.com/brandongregoryscott/medium-example-cli/tree/master/phase2)
Run `npm install` from the `phase2` directory to install the project dependencies. From there, [`main.js`](https://github.com/brandongregoryscott/medium-example-cli/blob/master/phase2/main.js) acts as the entrypoint for this iteration of the project. It imports and runs a `buildDotnetSolution()` function which will restore and build the dotnet project underneath your current directory. It includes some Jest tests for the 'dotnetRestore' module. Its structure is not optimal, but it gets the point across. 

In a terminal, run `./main.js`. You can run the tests with `npm test`.

### Phase 3 [(src)](https://github.com/brandongregoryscott/medium-example-cli/tree/master/phase3)
Run `npm install` from the `phase3` directory to install the project dependencies. It has options to clean, restore, and build your dotnet project separately. The modules are fully unit tested.

In a terminal, run `./cli.js dotnet` to see all available options. Run `./cli.js dotnet --clean --build --restore` to run all 3 modules, or any variation of these flags (such as `./cli.js dotnet --clean --restore`, though not all combinations might make sense.) You can run the tests with `npm test`.

## Questions or comments
If you have a question about how to navigate this project, found an issue, or want to suggest an improvement, [open up an issue](https://github.com/brandongregoryscott/medium-example-cli/issues) here on Github. 
