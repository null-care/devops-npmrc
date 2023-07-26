export function replaceAllOccurrences(
  input: string,
  replacements: Record<string, string>
): string {
  const regex = new RegExp(Object.keys(replacements).join('|'), 'g');
  return input.replace(regex, (match) => replacements[match]);
}

export function replaceBetweenTokens(
  input: string,
  startToken: string,
  endToken: string,
  replacement: string
): string {
  const regex = new RegExp(`${startToken}[^]*?${endToken}`, 'g');
  return input.replace(regex, `${startToken}${replacement}${endToken}`);
}
