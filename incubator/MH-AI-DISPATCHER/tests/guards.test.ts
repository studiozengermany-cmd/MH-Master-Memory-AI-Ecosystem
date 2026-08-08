import test from 'node:test';
import assert from 'node:assert/strict';
import { validateChangedPaths } from '../src/core/guards.js';
import type { ProjectContract, ProjectTask } from '../src/types.js';

const task: ProjectTask = {
  id: 'T1', title: 'UI task', objective: 'Fix popup', kind: 'frontend', risk: 'low', preferredEngine: 'auto',
  allowedPaths: ['src/ui/**'], forbiddenPaths: ['src/ui/secret.ts'], acceptance: ['No overflow'], validationCommands: [], dependsOn: [], ownerApproved: false
};
const contract: ProjectContract = {
  projectId: 'P1', name: 'Project One', repoPath: '.', baseBranch: 'main', planner: 'ChatGPT Work', state: 'LOCKED', goal: 'Goal',
  locked: ['Keep API'], flexible: [], escalate: [], globalForbiddenPaths: ['.env', '.env.*', '.git/**'], validationCommands: [],
  maxParallel: 2, maxAttemptsPerTask: 2, tasks: [task]
};

test('allows paths inside task scope', () => {
  assert.equal(validateChangedPaths(contract, task, ['src/ui/popup.ts']).ok, true);
});

test('blocks paths outside task scope', () => {
  assert.equal(validateChangedPaths(contract, task, ['src/api/server.ts']).ok, false);
});

test('forbidden path wins even inside allowed scope', () => {
  assert.equal(validateChangedPaths(contract, task, ['src/ui/secret.ts']).ok, false);
});
