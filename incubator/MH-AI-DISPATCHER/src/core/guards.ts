import type { ProjectContract, ProjectTask } from '../types.js';
import { matchesAny } from './glob.js';

export interface PathGuardResult {
  ok: boolean;
  violations: string[];
}

export function validateChangedPaths(contract: ProjectContract, task: ProjectTask, changedFiles: string[]): PathGuardResult {
  const forbidden = [...contract.globalForbiddenPaths, ...task.forbiddenPaths];
  const violations: string[] = [];
  for (const file of changedFiles) {
    if (matchesAny(file, forbidden)) {
      violations.push(`${file}: forbidden path`);
      continue;
    }
    if (!matchesAny(file, task.allowedPaths)) {
      violations.push(`${file}: outside allowedPaths`);
    }
  }
  return { ok: violations.length === 0, violations };
}

export function dependenciesSatisfied(contract: ProjectContract, taskId: string, passed: Set<string>): boolean {
  const task = contract.tasks.find((value) => value.id === taskId);
  if (!task) return false;
  return task.dependsOn.every((dependency) => passed.has(dependency));
}
