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
    });
});
