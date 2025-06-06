import { Component, inject, input } from '@angular/core';
import { GithubIssue } from '../../interfaces/github-issues.interface';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [NgStyle, RouterLink],
  templateUrl: './issue-item.component.html',
  styleUrl: './issue-item.component.css'
})
export class IssueItemComponent {
  issue = input.required<GithubIssue>();
  issueService = inject(IssueService);

  get isOpen() { return this.issue().state === 'open'; }

  prefetchIssue() {
    // this.issueService.prefetchIssue(this.issue().number.toString());
    // this.issueService.prefetchIssueComments(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
    // this.issueService.setIssueCommentsData(this.issue());
  }
}
