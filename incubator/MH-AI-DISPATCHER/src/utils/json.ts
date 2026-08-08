export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue. Some CLIs wrap the useful JSON in text.
  }

  for (let start = trimmed.lastIndexOf('{'); start >= 0; start = trimmed.lastIndexOf('{', start - 1)) {
    const candidate = trimmed.slice(start);
    try {
      return JSON.parse(candidate);
    } catch {
      // Try an earlier opening brace.
    }
  }
  throw new Error('No valid JSON object found in agent output');
}
