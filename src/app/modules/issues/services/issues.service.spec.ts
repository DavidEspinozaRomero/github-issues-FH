import { TestBed } from '@angular/core/testing';

import { injectQuery, provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { IssuesService } from './issues.service';


fdescribe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(queryClient)]
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    const { data } = await service.labelsQuery.refetch();
    expect(data?.length).toBe(30);

    const [label] = data!;
    expect(typeof label.id).toBe("number")
    expect(typeof label.node_id).toBe("string")
    expect(typeof label.url).toBe("string")
    expect(typeof label.name).toBe("string")
    expect(typeof label.color).toBe("string")
    expect(typeof label.default).toBe("boolean")
    expect(typeof label.description).toBe("string")
  });

  it('should set selected state All | Open | Closed', async () => {
    service.showIssuesByState('closed');
    expect(service.selectedState()).toBe('closed');

    const { data } = await service.issuesQuery.refetch();
    data?.forEach(issue => {
      expect(issue.state).toBe('closed');
    })

    service.showIssuesByState('open');
    expect(service.selectedState()).toBe('open');

    const { data: dataOpen } = await service.issuesQuery.refetch();
    dataOpen?.forEach(issue => {
      expect(issue.state).toBe('open');
    })
  });

  it('should set selected labels', async () => {
    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBe(true);

    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeFalse();
  });

  it('should get issues by selected labels', async () => { 
    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBe(true);

    const { data } = await service.issuesQuery.refetch();
    data?.forEach(issue => {
      expect(issue.labels.some(label => label.name === 'Accessibility')).toBe(true);
    })
  });
});
