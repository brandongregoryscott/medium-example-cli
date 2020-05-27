// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const file = require("./file");

// #endregion Imports

describe("dotnetPath", () => {
    let dotnetPath;
    beforeEach(() => {
        // Due to the way the dotnetPath module caches values, we need to isolate the module in each
        // test to prevent side effects and test behavior properly.
        jest.isolateModules(() => {
            dotnetPath = require("./dotnet-path");
        });
    });

    describe("solutionDir", () => {

    });


    describe("solutionPath", () => {
        test("when file.first returns a non-null value, it returns that value", () => {
            // Arrange
            const fileFirstSpy = jest.spyOn(file, "first").mockImplementation(() => "Example.sln");

            // Act
            const result = dotnetPath.solutionPath();

            // Assert
            expect(fileFirstSpy).toHaveBeenCalledTimes(1);
            expect(result).toBe("Example.sln");
        });

        test("when called consecutively, it returns the cached value", () => {
            // Arrange
            const fileFirstSpy = jest.spyOn(file, "first").mockImplementation(() => "Example.sln");

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

    describe("solutionPathOrExit", () => {

    });
});
