import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';
import { getIssueComments } from '../actions/get-issue-comments.action';
import { GithubIssue } from '../interfaces/github-issues.interface';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  #issueNumber = signal<string | null>(null);
  queryClient = inject(QueryClient);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueNumber()],
    queryFn: () => getIssueByNumber(this.#issueNumber()!),
    enabled: this.#issueNumber() !== null
  }))
  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.#issueNumber(), 'comments'],
    queryFn: () => getIssueComments(this.#issueNumber()!),
    enabled: this.#issueNumber() !== null
  }))
  prefetchIssueComments(issueNumber: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueNumber),
      staleTime: 1000 * 60 * 5
    });
  }

  setIssueNumber(issueNumber: string) {
    this.#issueNumber.set(issueNumber);
  }
  prefetchIssue(issueNumber: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60 * 5
    });
  }

  setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60 * 5
    });
  }
  // setIssueCommentsData(issue: GithubIssue) {
  //   this.queryClient.setQueryData(['issue', issue.number.toString(), 'comments'], issue, {
  //     updatedAt: Date.now() + 1000 * 60 * 5
  //   });
  // }

}
