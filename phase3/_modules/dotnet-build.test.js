// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetBuild = require("./dotnet-build");
const dotnetPath = require("./dotnet-path");
const dotnetClean = require("./dotnet-clean");
const dotnetRestore = require("./dotnet-restore");
const faker = require("faker");
const shell = require("shelljs");

// #endregion Imports

describe("dotnetBuild", () => {
    let dotnetCleanSpy;
    let dotnetPathSpy;
    let dotnetRestoreSpy;
    let shellExitSpy;

    beforeEach(() => {
        dotnetCleanSpy = jest.spyOn(dotnetClean, "run").mockImplementation();
        dotnetPathSpy = jest
            .spyOn(dotnetPath, "solutionPathOrExit")
            .mockImplementation();
        dotnetRestoreSpy = jest
            .spyOn(dotnetRestore, "run")
            .mockImplementation();
        shellExitSpy = jest.spyOn(shell, "exit").mockImplementation();
    });

    describe("run", () => {
        test("it verifies the dotnet solution can be found by calling dotnetPath module", () => {
            // Arrange & Act
            dotnetBuild.run(faker.random.boolean(), faker.random.boolean());

            // Assert
            expect(dotnetPathSpy).toHaveBeenCalled();
        });

        test("when 'clean' is true, it calls dotnetClean module", () => {
            // Arrange & Act
            dotnetBuild.run(true, faker.random.boolean());

            // Assert
            expect(dotnetCleanSpy).toHaveBeenCalled();
        });

        test("when 'restore' is true, it calls dotnetRestore module", () => {
            // Arrange & Act
            dotnetBuild.run(faker.random.boolean(), true);

            // Assert
            expect(dotnetRestoreSpy).toHaveBeenCalled();
        });

        test("when dotnet command returns non-zero exit code, it calls shell.exit with that code", () => {
            // Arrange
            const exitCode = faker.random.number({ min: 1 });
            jest.spyOn(shell, "exec").mockImplementation(() => {
                return { code: exitCode };
            });

            // Act
            dotnetBuild.run(faker.random.boolean(), faker.random.boolean());

            // Assert
            expect(shellExitSpy).toHaveBeenCalledWith(exitCode);
        });
    });
});
