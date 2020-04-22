#!/bin/bash
DOTNET_SOLUTION_FILE_PATH=""

# Checks three common locations under the current directory for a .sln file, or exits if one
# is not found. If found, DOTNET_SOLUTION_FILE_PATH is set to the value.
findDotnetSolution() {
    LS_RESULT=`ls *.sln`

    # If the exit status of that ls command is 0, it means at least one file matching the pattern exists.
    if [ $? -eq 0 ];
    then
        echo "Dotnet solution found."
        DOTNET_SOLUTION_FILE_PATH=$LS_RESULT
    fi;

    LS_RESULT=`ls dotnet/*.sln`
    if [ $? -eq 0 ];
    then
        echo "Dotnet solution found."
        DOTNET_SOLUTION_FILE_PATH=$LS_RESULT
    fi;

    LS_RESULT=`ls dotnet/*/*.sln`
    if [ $? -eq 0 ];
    then
        echo "Dotnet solution found: $LS_RESULT"
        DOTNET_SOLUTION_FILE_PATH=$LS_RESULT
    fi;

    if [[ $DOTNET_SOLUTION_FILE_PATH = "" ]];
    then
        echo "No dotnet solution found. Exiting."
        exit 1;
    fi;
}


# Restores dotnet solution nuget dependencies
restoreDotnetSolution() {
    findDotnetSolution

    echo "Running dotnet restore on the solution..."
    dotnet restore $DOTNET_SOLUTION_FILE_PATH
    echo "Dotnet solution restored"
}