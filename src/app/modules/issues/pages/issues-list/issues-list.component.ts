import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { JsonPipe } from '@angular/common';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";

@Component({
  selector: 'app-issues-list',
  imports: [RouterLink, JsonPipe, LabelsSelectorComponent],
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.css'
})
export default class IssuesListComponent {
  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }
}
