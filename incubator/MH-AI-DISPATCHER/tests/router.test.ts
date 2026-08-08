import test from 'node:test';
import assert from 'node:assert/strict';
import { routeTask } from '../src/core/router.js';
import type { ProjectTask } from '../src/types.js';

const base: ProjectTask = {
  id: 'T1', title: 'Test task', objective: 'Do a thing', kind: 'frontend', risk: 'low', preferredEngine: 'auto',
  allowedPaths: ['src/**'], forbiddenPaths: [], acceptance: ['Works'], validationCommands: [], dependsOn: [], ownerApproved: false
};

test('low-risk frontend routes to Antigravity', () => {
  assert.equal(routeTask(base).engine, 'antigravity');
});

test('architecture routes to Claude Code harness', () => {
  assert.equal(routeTask({ ...base, kind: 'architecture', risk: 'medium' }).engine, 'claude-code-gpt');
});

test('critical task gates on owner', () => {
  assert.equal(routeTask({ ...base, risk: 'critical' }).gate, 'owner');
});

test('explicit engine wins after risk gate', () => {
  assert.equal(routeTask({ ...base, risk: 'medium', preferredEngine: 'antigravity', kind: 'backend' }).engine, 'antigravity');
});
