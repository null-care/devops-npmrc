import { showConfigHint } from './hints';
import { input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { writeFile } from 'fs/promises';

export async function configureProjectFile() {
  console.clear();
  console.log(chalk.blue.bold('Add a .npmrc file to your project'));
  let config;
  while (true) {
    config = await getConfig();
    console.clear();
    console.log(chalk.blue.bold('Confirm the information you entered'));
    console.log(chalk.gray('Organization:'), chalk.green(config.organization));
    console.log(chalk.gray('Feed:'), chalk.green(config.feed));
    const answer = await confirm({
      message: 'Is this correct?',
    });
    if (answer) break;
  }
  console.clear();
  try {
    await writeNpmrc(config);
    console.clear();
    console.log(
      chalk.blue.bold(
        'You should now be able to install packages from DevOps artifact feed in this project!\n'
      )
    );

    console.log(
      `${chalk.gray.bold('To verify, run: ')}${chalk.red.bold(
        'npm config get registry'
      )}\n${chalk.gray.bold('Or using yarn: ')}${chalk.blue.bold(
        'yarn info <package_in_devops_registry>'
      )}\n`
    );

    console.log(
      `${chalk.dim.bold(
        'Read the official microsoft docs here:'
      )} ${chalk.blue.bold(
        'https://learn.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc'
      )}`
    );
  } catch (error) {
    console.error(chalk.red.bold('Error writing .npmrc file.'), error);
  }
}

async function writeNpmrc(config: ProjectConfiguration) {
  console.log(chalk.dim('writing .npmrc file...'));
  const npmrc = `registry=https://pkgs.dev.azure.com/${config.organization}/_packaging/${config.feed}/npm/registry/\n\nalways-auth=true`;
  await writeFile('.npmrc', npmrc);
  console.log(chalk.green.bold('.npmrc created successfully.'));
}

async function getConfig(): Promise<ProjectConfiguration> {
  showConfigHint();

  const organization = await input({
    message: 'The name of your organization',
    validate: (input) =>
      input.length > 0 ? true : 'organization cannot be empty',
  });

  const feed = await input({
    message: 'The name of your feed',
    validate: (input) => (input.length > 0 ? true : 'feed cannot be empty'),
  });

  return {
    organization,
    feed,
  };
}
