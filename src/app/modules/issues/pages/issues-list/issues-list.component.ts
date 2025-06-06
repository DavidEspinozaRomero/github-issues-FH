import { Component, computed, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";

@Component({
  selector: 'app-issues-list',
  imports: [LabelsSelectorComponent, IssueItemComponent],
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.css'
})
export default class IssuesListComponent {
  issuesService = inject(IssuesService);
  currentState = computed(() => this.issuesService.selectedState());

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }
  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  setIssuesState(newState: string) {
    const state = {
      all: 'all',
      open: 'open',
      closed: 'closed'
    }[newState] ?? 'all';
    this.issuesService.showIssuesByState(state);
  }

}
