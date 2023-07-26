interface NpmRegistryEntry {
  npmAlwaysAuth: boolean;
  npmAuthIdent: string;
}

interface NpmScopesEntry {
  npmRegistryServer: string;
}

interface Config {
  npmRegistries: {
    [key: string]: NpmRegistryEntry;
  };
  npmScopes: {
    [key: string]: NpmScopesEntry;
  };
}
