import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { GithubIssue } from '../../interfaces/github-issues.interface';
@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html',
  styleUrl: './issue-comment.component.css'
})
export class IssueCommentComponent {
  issue = input.required<GithubIssue>();
}
