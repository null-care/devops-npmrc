# DevOps `.npmrc` CLI

[![npm version](https://img.shields.io/npm/v/devops-npmrc.svg?style=flat)](https://www.npmjs.com/package/devops-npmrc/)
[![npm version](https://img.shields.io/npm/dm/devops-npmrc.svg)](https://nodei.co/npm/devops-npmrc/)

CLI tool for adding Azure DevOps artifact feed to .npmrc on unix based systems like macOS or Linux.

> _Works for both `npm` and `yarn`._

## Prerequisites

To use the tool you will need:

- DevOps organization name
- DevOps artifact feed name
- A personal access token (_global file only_)

1. Find the name of your `organization` and `feed`

   - Go to [https://dev.azure.com/](https://dev.azure.com/) and log in to your organization.
   - Select the project where your feed is located and navigate to `Artifacts` in the menu to the left.
   - Select the feed you wish to add to `.npmrc` from the dropdown menu in the top left corner.
   - Retrieve `organization` and `feed` from the url: `dev.azure.com/<organization>/Your.Project/_artifacts/<feed>`

2. Generate a `personal access token`
   - Generate a [Personal Access Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) with Packaging read & write scopes.

## Quick start

> Before using the tool make sure you have all the [prerequisites](#prerequisites).

Add a registry to the global `.npmrc` file

```bash
npx devops-npmrc@latest
```

To be able to install packages you also need to add a `.npmrc` file to your project

```bash
# cd to your project
cd /path/to/your/project

# Then run
npx devops-npmrc@latest -p
```

To verify that everything is working you can run the following

```bash
npm config get registry

# Or using yarn
yarn info <package_in_devops_registry>
```

## Usage

Add a registry to the global `.npmrc` file

```bash
npx devops-npmrc@latest
```

Add a `.npmrc` file to a project

```bash
npx devops-npmrc@latest -p
```

### Available options

- `-p`, `--project` – _Generate a `.npmrc` file for a project instead of a global file_
- `-V`, `--version` – _output the version number_
- `-h`, `--help` – _display help_

### Yarn

If you are using `yarn` you can select `yarn` when asked what package manager you are using, this will generate both a `.npmrc` file and a `.yarnrc.yml` file.

---

<br/>

## Contribute

If you wish to contribute, here are some steps to get started:

1. [Fork the repo](https://github.com/null-care/devops-npmrc/fork) and clone it to your local machine.
2. Install dependencies by running `yarn`
3. Make your changes
4. [Build and bundle the project](#build-and-bundle-the-project)
5. Push to github and [submit a pull request](https://github.com/null-care/devops-npmrc/compare)

### Build and bundle the project

Build the project

```bash
yarn build
```

Bundle the project

```bash
yarn bundle
```

Run the executable _(located in the bin directory)_

```bash
yarn run-bin
```
