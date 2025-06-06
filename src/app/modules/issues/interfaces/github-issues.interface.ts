export interface GithubIssue {
    id: number;
    number: number;
    node_id: string;
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    in_progress: boolean;
    locked: boolean;
    title: string;
    user: any;
    labels: any[];
    state: string;
    assignee: any;
    assignees: any[];
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    author_association: string;
    body: string;
}