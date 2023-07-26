import select from '@inquirer/select';
import { input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { configureYarnrc } from './yarn.js';
import { PackageManager } from './types/enums.js';
import { configureNpmrc } from './npm.js';
import { showConfigHint } from './hints';

export async function configureGlobalFile() {
  console.clear();
  console.log(chalk.blue.bold('Add a devops registry to your .npmrc file'));

  let config;

  while (true) {
    config = await prompt();
    console.clear();
    console.log(chalk.blue.bold('Confirm the information you entered'));
    console.log(chalk.gray('Username:'), chalk.green(config.username));
    console.log(chalk.gray('Email:'), chalk.green(config.email));
    console.log(chalk.gray('Organization:'), chalk.green(config.organization));
    console.log(chalk.gray('Feed:'), chalk.green(config.feed));
    console.log(chalk.gray('Personal Access Token:'), chalk.green(config.pat));
    const answer = await confirm({
      message: 'Is this correct?',
    });
    if (answer) break;
  }
  console.clear();

  const answer = await select({
    message: chalk.green.bold('Select your package manager'),
    choices: [
      {
        name: chalk.red('npm'),
        value: PackageManager.Npm,
      },
      {
        name: chalk.blue('yarn'),
        value: PackageManager.Yarn,
      },
    ],
  });

  try {
    console.log(chalk.redBright.bold('Configuring npm...'));
    await configureNpmrc(config);
    console.clear();
    if (answer === PackageManager.Yarn) {
      console.log(chalk.blueBright.bold('Configuring yarn...'));
      await configureYarnrc(config);
      console.clear();
    }

    console.log(
      chalk.blue.bold('You should now be able to access your packages.\n')
    );

    console.log(
      `${chalk.white.italic(
        'To be able to install packages from DevOps artifact feed in a project, you need to add a .npmrc file to the root of the project.\nYou can add a .npmrc file to your project by running: '
      )}${chalk.blue('npx devops-npmrc -p')}\n`
    );

    console.log(
      `${chalk.dim.bold(
        'Read the official microsoft docs here:'
      )} ${chalk.blue.bold(
        'https://learn.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc'
      )}`
    );
  } catch (error) {
    console.error(chalk.red.bold('Error adding DevOps registry.'), error);
  }
}

async function prompt(): Promise<Configuration> {
  showConfigHint();
  console.log(
    chalk.gray.italic('In most cases, you can leave this as the default value')
  );
  const username = await input({
    message: 'Enter your username',

    default: '_',
  });

  console.log(
    chalk.gray.italic('In most cases, you can leave this as the default value')
  );
  const email = await input({
    message: 'Enter your email',
    default: '_',
  });

  const organization = await input({
    message: 'The name of your organization',
    validate: (input) =>
      input.length > 0 ? true : 'organization cannot be empty',
  });

  const feed = await input({
    message: 'The name of the artifact feed',
    validate: (input) => (input.length > 0 ? true : 'feed cannot be empty'),
  });

  const pat = await input({
    message: 'Enter your personal access token',
    validate: (input) =>
      input.length > 0 ? true : 'personal access token cannot be empty',
  });

  return {
    username,
    email,
    organization,
    feed,
    pat,
  };
}
