import { Injectable } from '@angular/core';

import { injectQuery } from '@tanstack/angular-query-experimental';

import { getLabels } from '../actions/get-labels';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }))

  
}
