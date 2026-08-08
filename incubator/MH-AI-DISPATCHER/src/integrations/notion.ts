import type { ProjectContract, ProjectTask, ReviewResult, TaskRuntime } from '../types.js';
import { config } from '../config.js';
import { log } from '../utils/log.js';

function richText(content: string) {
  return { rich_text: [{ type: 'text', text: { content: content.slice(0, 1900) } }] };
}
function title(content: string) {
  return { title: [{ type: 'text', text: { content: content.slice(0, 1900) } }] };
}
function select(name: string) {
  return { select: { name } };
}
function relation(ids: string[]) {
  return { relation: ids.map((id) => ({ id })) };
}

function statusToNotion(status: TaskRuntime['status']): string {
  const map: Record<TaskRuntime['status'], string> = {
    pending: 'Assigned', blocked: 'Blocked', running: 'In Progress', reviewing: 'Final Review', rework: 'Returned',
    passed: 'Approved', failed: 'Returned', waiting_planner: 'Blocked', waiting_owner: 'Waiting Owner'
  };
  return map[status];
}

export class NotionReporter {
  get enabled(): boolean {
    return Boolean(config.notion.token);
  }

  private async request(path: string, init: RequestInit): Promise<any> {
    if (!config.notion.token) return null;
    const response = await fetch(`https://api.notion.com/v1${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${config.notion.token}`,
        'Content-Type': 'application/json',
        'Notion-Version': config.notion.version,
        ...(init.headers || {})
      }
    });
    if (!response.ok) throw new Error(`Notion ${response.status}: ${await response.text()}`);
    return await response.json();
  }

  async createWorkOrder(contract: ProjectContract, task: ProjectTask, runtime: TaskRuntime): Promise<string | undefined> {
    if (!this.enabled) return undefined;
    try {
      const priority = task.risk === 'critical' ? 'Critical' : task.risk === 'high' ? 'High' : task.risk === 'low' ? 'Low' : 'Normal';
      const page = await this.request('/pages', {
        method: 'POST',
        body: JSON.stringify({
          parent: { type: 'data_source_id', data_source_id: config.notion.workOrdersSourceId },
          properties: {
            'Work Order': title(`${task.id} — ${task.title}`),
            Project: richText(contract.name),
            Objective: richText(task.objective),
            'Locked Scope': richText(contract.locked.join('\n')),
            'Allowed Scope': richText(task.allowedPaths.join('\n')),
            Deliverables: richText(task.acceptance.join('\n')),
            Milestones: richText(task.dependsOn.length ? `Depends on: ${task.dependsOn.join(', ')}` : 'Independent task'),
            Priority: select(priority),
            Status: select(statusToNotion(runtime.status)),
            'Final Decision': select('Pending'),
            'Runner Job ID': richText(`${contract.projectId}:${task.id}`),
            'Rework Count': { number: Math.max(0, runtime.attempt - 1) },
            'Owner Intervention Count': { number: 0 }
          }
        })
      });
      return page?.id as string | undefined;
    } catch (error) {
      log('warn', 'notion.createWorkOrder.failed', { taskId: task.id, error: String(error) });
      return undefined;
    }
  }

  async updateWorkOrder(pageId: string | undefined, runtime: TaskRuntime): Promise<void> {
    if (!this.enabled || !pageId) return;
    try {
      await this.request(`/pages/${pageId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          properties: {
            Status: select(statusToNotion(runtime.status)),
            'Rework Count': { number: Math.max(0, runtime.attempt - 1) }
          }
        })
      });
    } catch (error) {
      log('warn', 'notion.updateWorkOrder.failed', { pageId, error: String(error) });
    }
  }

  async createReview(contract: ProjectContract, task: ProjectTask, runtime: TaskRuntime, review: ReviewResult): Promise<void> {
    if (!this.enabled || !runtime.notionPageId) return;
    try {
      const verdict = review.verdict === 'PASS' ? 'Pass' : review.verdict === 'FIX' ? 'Pass with Fixes' : 'Disputed';
      await this.request('/pages', {
        method: 'POST',
        body: JSON.stringify({
          parent: { type: 'data_source_id', data_source_id: config.notion.reviewsSourceId },
          properties: {
            Review: title(`Auto review — ${task.id} — attempt ${runtime.attempt}`),
            'External Run ID': richText(`${contract.projectId}:${task.id}:a${runtime.attempt}`),
            'Review Type': select('Final Review'),
            Verdict: select(verdict),
            'Overall Score': { number: Math.round(review.confidence * 100) / 10 },
            'Verified Strengths': richText(review.verifiedStrengths.join('\n')),
            'Verified Errors': richText(review.verifiedErrors.join('\n')),
            'Required Fixes': richText(review.requiredFixes.join('\n')),
            'Work Order': relation([runtime.notionPageId]),
            'Review Date': { date: { start: new Date().toISOString() } }
          }
        })
      });
    } catch (error) {
      log('warn', 'notion.createReview.failed', { taskId: task.id, error: String(error) });
    }
  }

  async evidence(contract: ProjectContract, task: ProjectTask, runtime: TaskRuntime, summary: string, type: 'Evidence' | 'Incident', severity: string): Promise<void> {
    if (!this.enabled || !runtime.notionPageId) return;
    try {
      await this.request('/pages', {
        method: 'POST',
        body: JSON.stringify({
          parent: { type: 'data_source_id', data_source_id: config.notion.evidenceSourceId },
          properties: {
            Record: title(`${type} — ${task.id} — a${runtime.attempt}`),
            'External Event ID': richText(`${contract.projectId}:${task.id}:a${runtime.attempt}:${type.toLowerCase()}`),
            'Record Type': select(type),
            Severity: select(severity),
            Summary: richText(summary),
            'Evidence Detail': richText(runtime.commitSha ? `commit=${runtime.commitSha}` : summary),
            'Work Order': relation([runtime.notionPageId]),
            'Incident Status': select(type === 'Incident' ? 'Open' : 'Not Applicable'),
            'Occurred At': { date: { start: new Date().toISOString() } },
            Verified: { checkbox: type === 'Evidence' && runtime.status === 'passed' }
          }
        })
      });
    } catch (error) {
      log('warn', 'notion.evidence.failed', { taskId: task.id, error: String(error) });
    }
  }
}
