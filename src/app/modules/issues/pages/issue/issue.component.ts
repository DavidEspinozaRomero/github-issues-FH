import { Component, inject, input, OnInit } from '@angular/core';
import { GithubIssue } from '../../interfaces/github-issues.interface';
import { IssueService } from '../../services/issue.service';
import { RouterLink } from '@angular/router';
import { IssueCommentComponent } from "../../components/issue-comment/issue-comment.component";

@Component({
  selector: 'app-issue',
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})
export default class IssueComponent implements OnInit{
  issueService = inject(IssueService);

  number = input.required<string>();
  issue = input.required<GithubIssue>();
  isOpen = input.required<boolean>();
  
  get issueQuery() {
    return this.issueService.issueQuery;
  }
  get issueCommentsQuery() {
    return this.issueService.issueCommentsQuery;
  }
  
  ngOnInit(): void {
    this.issueService.setIssueNumber(this.number());
  }
 
}
