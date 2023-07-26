import { readFile, writeFile, appendFile } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import chalk from 'chalk';
import { replaceAllOccurrences, replaceBetweenTokens } from './regexUtils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function configureNpmrc(config: Configuration) {
  console.log(chalk.dim('reading template file...'));
  const npmrc = (
    await readFile(join(__dirname, 'template', 'npmrc_template.txt'))
  ).toString();

  const replacements: Record<string, string> = {
    '<ORGANIZATION_NAME>': config.organization,
    '<FEED_NAME>': config.feed,
    '<USERNAME>': config.username,
    '<EMAIL>': config.email,
    '<PAT_64>': Buffer.from(config.pat).toString('base64'),
  };

  const updated = replaceAllOccurrences(npmrc, replacements);

  await upsertFile(updated);
}

async function upsertFile(config: string) {
  const userHomeDir = os.homedir();
  const npmrcFilePath = join(userHomeDir, '.npmrc');

  if (existsSync(npmrcFilePath)) {
    const npmrc = (await readFile(npmrcFilePath)).toString();
    if (npmrc.includes('; begin auth token')) {
      console.log(chalk.dim('updating .npmrc file...'));
      const startToken = '; begin auth token';
      const endToken = '; end auth token';

      const updated = replaceBetweenTokens(npmrc, startToken, endToken, config);

      await writeFile(npmrcFilePath, updated);
      console.log(chalk.green.bold('.npmrc updated successfully.'));
    } else {
      console.log(chalk.dim('updating .npmrc file...'));
      await appendFile(npmrcFilePath, config);
      console.log(chalk.green.bold('.npmrc updated successfully.'));
    }
  } else {
    console.log(chalk.dim('creating .npmrc file...'));

    await writeFile(npmrcFilePath, config);
    console.log(chalk.green.bold('.npmrc created successfully.'));
  }
}
