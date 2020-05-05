// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const dir = require("./dir");
const faker = require("faker");
const fs = require("fs");
const shell = require("shelljs");

// #endregion Imports
describe("restoreDotnetSolution", () => {
    let mockDir;
    beforeEach(() => {
        mockDir = faker.random.word();
    });

    describe("deleteIfExists", () => {
        test("when directory does not exist, it does not call shell.rm", () => {
            // Arrange
            jest.spyOn(fs, "existsSync").mockImplementation((dir) => false);
            const shellRmSpy = jest.spyOn(shell, "rm").mockImplementation();

            // Act
            dir.deleteIfExists(mockDir);

            // Assert
            expect(shellRmSpy).not.toHaveBeenCalled();
        });

        test("when directory exists, it calls shell.rm", () => {
            // Arrange
            jest.spyOn(fs, "existsSync").mockImplementation((dir) => true);
            const shellRmSpy = jest.spyOn(shell, "rm").mockImplementation();

            // Act
            dir.deleteIfExists(mockDir);

            // Assert
            expect(shellRmSpy).toHaveBeenCalled();
        });
    });

    describe("popd", () => {
        test("it calls shell.popd with '-q' flag", () => {
            // Arrange
            const shellPopdSpy = jest.spyOn(shell, "popd").mockImplementation();

            // Act
            dir.popd(mockDir);

            // Assert
            expect(shellPopdSpy).toHaveBeenCalledWith("-q", mockDir);
        });
    });

    describe("pushd", () => {
        test("it calls shell.pushd with '-q' flag", () => {
            // Arrange
            const shellPushdSpy = jest
                .spyOn(shell, "pushd")
                .mockImplementation();

            // Act
            dir.pushd(mockDir);

            // Assert
            expect(shellPushdSpy).toHaveBeenCalledWith("-q", mockDir);
        });
    });
});
