import { Injectable, signal } from '@angular/core';

import { injectQuery } from '@tanstack/angular-query-experimental';

import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions/get-issues.action';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  selectedState = signal<string>('all');
  selectedLabels = signal(new Set<string>());

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }))

  issuesQuery = injectQuery(() => ({
    queryKey: ['issues', { state: this.selectedState(), selectedLabels: [...this.selectedLabels()] }],
    queryFn: () => getIssues(this.selectedState(), [...this.selectedLabels()]),
  }))

  showIssuesByState(state: string) {
    this.selectedState.set(state);
  }

  toggleLabel(label: string) {
    const labels = this.selectedLabels();
    labels.has(label) ? labels.delete(label) : labels.add(label);
    this.selectedLabels.set(labels);
  }
}
