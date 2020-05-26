// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dotnetPath = require("./dotnet-path");
const file = require("./file");
const faker = require("faker");
const shell = require("shelljs");

// #endregion Imports

describe("dotnetPath", () => {
    beforeEach(() => {
    });

    describe("solutionDir", () => {

    });


    describe("solutionPath", () => {
        test("when file.first returns a non-null value, it returns that value", () => {
            // Arrange
            const fileFirstMock = jest.spyOn(file, "first").mockImplementation(() => "Example.sln");

            // Act
            const result = dotnetPath.solutionPath();

            // Assert
            expect(fileFirstMock).toHaveBeenCalledTimes(1);
            expect(result).toBe("Example.sln");
        });
    });

    describe("solutionPathOrExit", () => {

    });

});
