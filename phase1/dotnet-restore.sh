DOTNET_SOLUTION_FILE_PATH=/home/brandon/projects/DotnetExample

# Restores dotnet solution nuget dependencies
restoreDotnetSolution() {
    echo "Running dotnet restore on the solution..."
    dotnet restore $DOTNET_SOLUTION_FILE_PATH
    echo "Dotnet solution restored"
}