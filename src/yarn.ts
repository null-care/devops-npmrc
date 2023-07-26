import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import os from 'os';
import chalk from 'chalk';
import yaml from 'js-yaml';

export async function configureYarnrc(config: Configuration) {
  const userHomeDir = os.homedir();
  const yarnrcHomePath = join(userHomeDir, '.yarnrc.yml');

  try {
    const exists = existsSync(yarnrcHomePath);

    exists
      ? console.log(chalk.dim('reading .yarnrc.yml...'))
      : console.log(chalk.dim('creating .yarnrc.yml...'));
    // Read the YAML file content
    const yamlContent = exists
      ? await readFile(yarnrcHomePath, 'utf8')
      : JSON.stringify({ npmRegistries: {}, npmScopes: {} });

    // Parse the YAML content into a JavaScript object
    const ymlConfig: Config = yaml.load(yamlContent) as Config;

    // Append or replace the npmAlwaysAuth and npmAuthIdent entries in the npmRegistries object
    const npmRegistriesKey = `//pkgs.dev.azure.com/${config.organization}/_packaging/${config.feed}/npm/registry`;
    const newEntry: NpmRegistryEntry = {
      npmAlwaysAuth: true,
      npmAuthIdent: Buffer.from(
        `${config.organization}:${config.pat}`
      ).toString('base64'),
    };

    const scopeEntry: NpmScopesEntry = {
      npmRegistryServer: `https://pkgs.dev.azure.com/${config.organization}/_packaging/${config.feed}/npm/registry`,
    };

    // Append or replace the entry
    ymlConfig.npmRegistries[npmRegistriesKey] = newEntry;
    ymlConfig.npmScopes[config.organization] = scopeEntry;

    // Convert the modified config object back to YAML format
    const updatedYamlContent = yaml.dump(ymlConfig);

    // Write the updated YAML content back to the file
    await writeFile(yarnrcHomePath, updatedYamlContent, 'utf8');

    console.log(chalk.green.bold('.yarnrc.yml updated successfully.'));
  } catch (error) {
    console.error(chalk.red.bold('Error updating YAML file:'), error);
  }
}
