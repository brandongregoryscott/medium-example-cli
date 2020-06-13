// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const file = require("./file");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Tests
// -----------------------------------------------------------------------------------------

describe("dotnetPath", () => {
    let dotnetPath;
    beforeEach(() => {
        // Due to the way the dotnetPath module caches values, we need to isolate the module in each
        // test to prevent side effects and test behavior properly.
        // See https://stackoverflow.com/questions/48989643/how-to-reset-module-imported-between-tests
        jest.isolateModules(() => {
            dotnetPath = require("./dotnet-path");
        });
    });

    // -----------------------------------------------------------------------------------------
    // #region solutionDir
    // -----------------------------------------------------------------------------------------

    describe("solutionDir", () => {
        test("when solutionPath() returns undefined, it returns '.'", () => {
            // Arrange
            const solutionPathSpy = jest
                .spyOn(dotnetPath, "solutionPath")
                .mockImplementation(() => undefined);

            // Act
            const result = dotnetPath.solutionDir();

            // Assert
            expect(solutionPathSpy).toHaveBeenCalledTimes(1);
            expect(result).toBe(".");
        });
    });

    // #endregion solutionDir

    // -----------------------------------------------------------------------------------------
    // #region solutionPath
    // -----------------------------------------------------------------------------------------

    describe("solutionPath", () => {
        test("when file.first returns a non-null value, it returns that value", () => {
            // Arrange
            const fileFirstSpy = jest
                .spyOn(file, "first")
                .mockImplementation(() => "Example.sln");

            // Act
            const result = dotnetPath.solutionPath();

            // Assert
            expect(fileFirstSpy).toHaveBeenCalledTimes(1);
            expect(result).toBe("Example.sln");
        });

        test("when called consecutively, it returns the cached value", () => {
            // Arrange
            const fileFirstSpy = jest
                .spyOn(file, "first")
                .mockImplementation(() => "Example.sln");

            // Act
            const result1 = dotnetPath.solutionPath();
            const result2 = dotnetPath.solutionPath();

            // Assert
            // file.first() should only be called once, and the cached variable should be returned
            // on the second call to solutionPath()
            expect(fileFirstSpy).toHaveBeenCalledTimes(1);
            expect(result1).toBe("Example.sln");
            expect(result2).toBe("Example.sln");
        });
    });

    // #endregion solutionPath

    // -----------------------------------------------------------------------------------------
    // #region solutionPathOrExit
    // -----------------------------------------------------------------------------------------

    describe("solutionPathOrExit", () => {
        test("when solutionPath() returns a value, it returns that value", () => {
            // Arrange
            const solutionPathSpy = jest
                .spyOn(dotnetPath, "solutionPath")
                .mockImplementation(() => "Example.sln");

            // Act
            const result = dotnetPath.solutionPathOrExit();

            // Assert
            expect(solutionPathSpy).toHaveBeenCalledTimes(1);
            expect(result).toBe("Example.sln");
        });

        test("when solutionPath() returns undefined, it calls shell.exit", () => {
            // Arrange
            const solutionPathSpy = jest
                .spyOn(dotnetPath, "solutionPath")
                .mockImplementation(() => undefined);
            const shellExitSpy = jest.spyOn(shell, "exit").mockImplementation();

            // Act
            dotnetPath.solutionPathOrExit();

            // Assert
            expect(solutionPathSpy).toHaveBeenCalledTimes(1);
            expect(shellExitSpy).toHaveBeenCalledWith(1);
        });
    });

    // #endregion solutionPathOrExit
});

// #endregion Tests
