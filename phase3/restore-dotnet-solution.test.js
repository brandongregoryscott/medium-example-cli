const faker = require("faker");
const shell = require("shelljs");
const sut = require("./restore-dotnet-solution");

describe("restoreDotnetSolution", () => {
    afterEach(() => {
        // Clear out any mocked functions and restore their original implementations after each test
        jest.restoreAllMocks();
    });

    describe("getFirstFile()", () => {
        test("when more than 1 file is found, it returns the first one", () => {
            // Arrange
            jest.spyOn(shell, "ls").mockImplementation(() => [
                "file1.jpg",
                "file2.jpg",
            ]);

            // Act
            const result = sut.getFirstFile("file"); // <- What we pass in here is arbitrary, since we're mocking the ls return anyway.

            // Assert
            expect(result).toBe("file1.jpg");
        });
    });

    describe("getSolutionPath()", () => {
        test("when no solution file is found, it returns undefined", () => {
            // Arrange & Act
            const result = sut.getSolutionPath();

            // Assert
            expect(result).not.toBeDefined();
        });

        test("when solution file is found, it returns that path", () => {
            // Arrange
            jest.spyOn(shell, "ls").mockImplementation(() => ["Example.sln"]);

            // Act
            const result = sut.getSolutionPath();

            // Assert
            expect(result).toBeDefined();
            expect(result).toBe("Example.sln");
        });
    });

    describe("solutionPathOrExit()", () => {
        test("when no solution file is found, it returns calls shell.exit with exit code 1", () => {
            // Arrange
            const shellExitSpy = jest
                .spyOn(shell, "exit")
                .mockImplementation((code) =>
                    console.log(`shell.exit was called with code: ${code}`)
                );

            // Act
            sut.solutionPathOrExit();

            // Assert
            expect(shellExitSpy).toBeCalledWith(1);
        });
    });

    describe("restoreDotnetSolution()", () => {
        test("when solutionPathOrExit fails to find the path, it calls shell.exit with exit code 1", () => {
            // Arrange
            jest.spyOn(sut, "solutionPathOrExit").mockImplementation(() => {
                shell.exit(1);
            });
            const shellExitSpy = jest
                .spyOn(shell, "exit")
                .mockImplementation((code) =>
                    console.log(`shell.exit was called with code: ${code}`)
                );

            // Act
            sut.restoreDotnetSolution();

            // Assert
            expect(shellExitSpy).toBeCalledWith(1);
        });

        test("when shell.exec returns non-zero exit code, it calls shell.exit with that code", () => {
            // Arrange
            const exitCode = faker.random.number({ min: 1, max: 50 });
            jest.spyOn(shell, "exec").mockImplementation(() => {
                return { code: exitCode };
            });
            const shellExitSpy = jest
                .spyOn(shell, "exit")
                .mockImplementation((code) =>
                    console.log(`shell.exit was called with code: ${code}`)
                );

            // Act
            sut.restoreDotnetSolution();

            // Assert
            expect(shellExitSpy).toBeCalledWith(exitCode);
        });
    });
});
