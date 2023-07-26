# devops-npmrc

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

- `-p` `--project` – _Generate a `.npmrc` file for a project instead of a global file_

## Yarn

If you are using `yarn` you can select `yarn` when asked what package manager you are using, this will generate both a `.npmrc` file and a `.yarnrc.yml` file.
