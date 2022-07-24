### Getting started

-   Clone the repository
-   Run the command `npm install`
-   Use the function inside index.js

### Technologies & tools

-   Javscript
-   NodeJS

### Repository structure

-   `src`: This is wher the main source code is
-   `src/index.js`: Starting of the repository
-   `src/controller`: Directory containing all the controller functions inside
-   `src/services`: Directory containing all the service functions inside
-   `src/tests`: Directory containing all the tests functions inside
-   `.gitignore`: File for adding the files that is to be ignored by GIT.

### Working

-   The app start with the index.js file, where the main function is located.
-   The main function takes the parameters and calls the controller function according to the condition
-   The controller has multiple functions which checks and calls the downloadFileAsPerProtocol at last.
-   The functions in the services are called from the controller and the downloading and saving takes place.
-   Utility service is made for the functions which can be used at multiple places as utility services.
-   More Protocols can be easily added by just creating the function for it in the services and calling it in the controller as per the conditions.
