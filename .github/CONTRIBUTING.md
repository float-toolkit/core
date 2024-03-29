<div align="center" style="margin-bottom: 0.5rem">
	<img src="https://raw.githubusercontent.com/float-toolkit/core/HEAD/media/ftlogo.svg" width="50" />
</div>

<h1 align="center">Contribution guidelines</h1>

**IMPORTANT:** IF YOU WANT TO REPORT A SECURITY VULNERABILITY, PLEASE USE
[SECURITY ADVISORIES](https://github.com/float-toolkit/core/security/advisories/new) TO FILE A PRIVATE REPORT.

If you wish to contribute to the **Float Toolkit** codebase, feel free to fork the repository and submit a pull request.

## Steps

1.  Refer to the [documentation](https://float-toolkit.web.app) to make sure the error is actually a bug and not a mistake of your
    own.
1.  Make sure the issue hasn't already been reported or suggested.
1.  Fork and clone the repository, and checkout the corresponding branch (`docs` for documentation, `master` for anything else). **DO
    NOT** modify the `stable` branch.
1.  Make your changes (add or modify tests and documentation comments as necessary to cover your changes).
1.  Run `npm run build` (or VSCode task _ESBuild: Compile and generate documentation_) to run the tests and build the package and
    documentation (you can use `npm link` to try it locally).
1.  [Submit a pull request](https://github.com/float-toolkit/core/compare).
