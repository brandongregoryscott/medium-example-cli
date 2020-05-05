// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dir = require("./dir");
const faker = require("faker");
const fs = require("fs");
const shell = require("shelljs");

// #endregion Imports
describe("restoreDotnetSolution", () => {
    describe("deleteIfExists", () => {
        test("when directory does not exist, it does not call shell.rm", () => {
            // Arrange
            jest.spyOn(fs, "existsSync").mockImplementation((dir) => false);
            const shellRmSpy = jest.spyOn(shell, "rm").mockImplementation();

            // Act
            dir.deleteIfExists(faker.random.word());

            // Assert
            expect(shellRmSpy).not.toHaveBeenCalled();
        });

        test("when directory exists, it calls shell.rm", () => {
            // Arrange
            jest.spyOn(fs, "existsSync").mockImplementation((dir) => true);
            const shellRmSpy = jest.spyOn(shell, "rm").mockImplementation();

            // Act
            dir.deleteIfExists(faker.random.word());

            // Assert
            expect(shellRmSpy).toHaveBeenCalled();
        });
    });
});
