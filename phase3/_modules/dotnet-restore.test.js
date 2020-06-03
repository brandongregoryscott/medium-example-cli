// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetPath = require("./dotnet-path");
const dotnetRestore = require("./dotnet-restore");
const faker = require("faker");
const shell = require("shelljs");

// #endregion Imports

describe("dotnetRestore", () => {
    let dotnetPathSpy;
    let shellExitSpy;

    beforeEach(() => {
        dotnetPathSpy = jest
            .spyOn(dotnetPath, "solutionPathOrExit")
            .mockImplementation();
        shellExitSpy = jest.spyOn(shell, "exit").mockImplementation();
    });

    describe("run", () => {
        test("it verifies the dotnet solution can be found by calling dotnetPath module", () => {
            // Arrange & Act
            dotnetRestore.run();

            // Assert
            expect(dotnetPathSpy).toHaveBeenCalled();
        });

        test("when dotnet command returns non-zero exit code, it calls shell.exit with that code", () => {
            // Arrange
            const exitCode = faker.random.number({ min: 1 });
            jest.spyOn(shell, "exec").mockImplementation(() => {
                return { code: exitCode };
            });

            // Act
            dotnetRestore.run();

            // Assert
            expect(shellExitSpy).toHaveBeenCalledWith(exitCode);
        });
    });
});
