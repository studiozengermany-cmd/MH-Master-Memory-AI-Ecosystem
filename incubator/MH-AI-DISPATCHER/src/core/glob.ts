function escapeRegex(value: string): string {
  return value.replace(/[.+^${}()|[\]\\]/g, '\\$&');
}

export function globToRegex(glob: string): RegExp {
  let out = '';
  let i = 0;
  while (i < glob.length) {
    const char = glob[i]!;
    if (char === '*') {
      if (glob[i + 1] === '*') {
        out += '.*';
        i += 2;
      } else {
        out += '[^/]*';
        i += 1;
      }
      continue;
    }
    if (char === '?') out += '[^/]';
    else out += escapeRegex(char);
    i += 1;
  }
  return new RegExp(`^${out}$`);
}

export function matchesAny(file: string, patterns: string[]): boolean {
  const normalized = file.replaceAll('\\', '/');
  return patterns.some((pattern) => globToRegex(pattern.replaceAll('\\', '/')).test(normalized));
}
