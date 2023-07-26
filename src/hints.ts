import chalk from 'chalk';

export function showConfigHint() {
  console.log();
  console.log(
    chalk.white.dim.bold(
      'You can find your organization name and feed in the url of your project'
    )
  );
  console.log(
    `${chalk.white('https://dev.azure.com/')}${chalk.blue.bold(
      '<organization>'
    )}${chalk.white('/Some.Project/_artifacts/feed/')}${chalk.blue.bold(
      '<feed>'
    )}\n`
  );
}
