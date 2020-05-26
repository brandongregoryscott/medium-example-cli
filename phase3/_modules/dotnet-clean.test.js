// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetPath = require("./dotnet-path");
const dotnetClean = require("./dotnet-clean");
const dotnetRestore = require("./dotnet-restore");
const faker = require("faker");
const shell = require("shelljs");

// #endregion Imports

describe("dotnetClean", () => {
    let dotnetPathSpy;
    beforeEach(() => {
        dotnetPathSpy = jest
            .spyOn(dotnetPath, "solutionPathOrExit")
            .mockImplementation();

    });

    describe("run", () => {
        test("it verifies the dotnet solution can be found by calling dotnetPath module", () => {
            // Arrange & Act
            dotnetClean.run();

            // Assert
            expect(dotnetPathSpy).toHaveBeenCalled();
        });

        test("when no 'bin' or 'obj' directories exist, it does not call shell.rm", () => {
            // Arrange
            const shellFindSpy = jest.spyOn(shell, "find").mockImplementation(() => []);
            const shellRmSpy = jest.spyOn(shell, "rm");

            // Act
            dotnetClean.run();

            // Assert
            expect(shellFindSpy).toHaveBeenCalled();
            expect(shellRmSpy).not.toHaveBeenCalled();
        });

        test("when '.git' directory exists, it is not passed to shell.rm", () => {
            // Arrange
            const shellFindSpy = jest.spyOn(shell, "find").mockImplementation(() => [".git", "bin", "obj"]);
            const shellRmSpy = jest.spyOn(shell, "rm");

            // Act
            dotnetClean.run();

            // Assert
            expect(shellFindSpy).toHaveBeenCalled();
            expect(shellRmSpy).toHaveBeenCalledWith("-rf", ["bin"]);
            expect(shellRmSpy).toHaveBeenCalledWith("-rf", ["obj"]);
        });

        test("when 'node_modules' directory exists, it is not passed to shell.rm", () => {
            // Arrange
            const shellFindSpy = jest.spyOn(shell, "find").mockImplementation(() => ["node_modules", "bin", "obj"]);
            const shellRmSpy = jest.spyOn(shell, "rm");

            // Act
            dotnetClean.run();

            // Assert
            expect(shellFindSpy).toHaveBeenCalled();
            expect(shellRmSpy).toHaveBeenCalledWith("-rf", ["bin"]);
            expect(shellRmSpy).toHaveBeenCalledWith("-rf", ["obj"]);
        });
    });
});
