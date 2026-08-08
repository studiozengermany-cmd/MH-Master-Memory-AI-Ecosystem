import { spawn } from 'node:child_process';
import type { CommandEvidence } from '../types.js';

const MAX_CAPTURE = 2_000_000;

export async function runProcess(
  command: string,
  args: string[],
  options: { cwd: string; timeoutMs: number; env?: NodeJS.ProcessEnv; stdin?: string }
): Promise<CommandEvidence> {
  const started = Date.now();
  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
      shell: false
    });

    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      if (stdout.length < MAX_CAPTURE) stdout += chunk.slice(0, MAX_CAPTURE - stdout.length);
    });
    child.stderr.on('data', (chunk: string) => {
      if (stderr.length < MAX_CAPTURE) stderr += chunk.slice(0, MAX_CAPTURE - stderr.length);
    });

    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      setTimeout(() => child.kill('SIGKILL'), 2_000).unref();
    }, options.timeoutMs);

    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        command: [command, ...args].join(' '),
        exitCode: code ?? -1,
        stdout,
        stderr,
        durationMs: Date.now() - started
      });
    });

    if (options.stdin !== undefined) child.stdin.end(options.stdin);
    else child.stdin.end();
  });
}

export async function runShell(command: string, cwd: string, timeoutMs: number): Promise<CommandEvidence> {
  const isWindows = process.platform === 'win32';
  return await runProcess(isWindows ? 'cmd.exe' : '/bin/sh', isWindows ? ['/d', '/s', '/c', command] : ['-lc', command], {
    cwd,
    timeoutMs
  });
}
