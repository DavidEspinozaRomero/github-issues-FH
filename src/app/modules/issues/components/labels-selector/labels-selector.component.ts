import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubLabel } from '../../interfaces/github-labels.interface';

@Component({
  selector: 'issues-labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  styleUrl: './labels-selector.component.css'
})
export class LabelsSelectorComponent {
  labels = input.required<GithubLabel[]>();
}
