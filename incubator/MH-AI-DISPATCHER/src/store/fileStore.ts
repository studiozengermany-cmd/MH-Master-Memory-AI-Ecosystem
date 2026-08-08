import fs from 'node:fs/promises';
import path from 'node:path';
import type { ProjectRuntime } from '../types.js';

export class FileStore {
  private readonly projectDir: string;
  private readonly eventFile: string;

  constructor(private readonly root: string) {
    this.projectDir = path.join(root, 'projects');
    this.eventFile = path.join(root, 'events.jsonl');
  }

  async init(): Promise<void> {
    await fs.mkdir(this.projectDir, { recursive: true });
    await fs.mkdir(path.join(this.root, 'worktrees'), { recursive: true });
  }

  get worktreeRoot(): string {
    return path.join(this.root, 'worktrees');
  }

  private projectPath(projectId: string): string {
    return path.join(this.projectDir, `${projectId}.json`);
  }

  async exists(projectId: string): Promise<boolean> {
    try {
      await fs.access(this.projectPath(projectId));
      return true;
    } catch {
      return false;
    }
  }

  async get(projectId: string): Promise<ProjectRuntime> {
    const raw = await fs.readFile(this.projectPath(projectId), 'utf8');
    return JSON.parse(raw) as ProjectRuntime;
  }

  async save(runtime: ProjectRuntime): Promise<void> {
    runtime.updatedAt = new Date().toISOString();
    const target = this.projectPath(runtime.contract.projectId);
    const temp = `${target}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(temp, JSON.stringify(runtime, null, 2), 'utf8');
    await fs.rename(temp, target);
  }

  async list(): Promise<ProjectRuntime[]> {
    const files = await fs.readdir(this.projectDir);
    const result: ProjectRuntime[] = [];
    for (const file of files.filter((value) => value.endsWith('.json'))) {
      const raw = await fs.readFile(path.join(this.projectDir, file), 'utf8');
      result.push(JSON.parse(raw) as ProjectRuntime);
    }
    return result;
  }

  async event(type: string, data: Record<string, unknown>): Promise<void> {
    await fs.appendFile(
      this.eventFile,
      `${JSON.stringify({ ts: new Date().toISOString(), type, ...data })}\n`,
      'utf8'
    );
  }
}
