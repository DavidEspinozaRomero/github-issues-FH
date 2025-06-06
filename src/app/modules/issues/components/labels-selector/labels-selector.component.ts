import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubLabel } from '../../interfaces/github-labels.interface';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  styleUrl: './labels-selector.component.css'
})
export class LabelsSelectorComponent {
  labels = input.required<GithubLabel[]>();

  issuesService = inject(IssuesService);

  isSelected(label: string) {
    return this.issuesService.selectedLabels().has(label);
  }

  toggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }
}
