
import { environment } from "src/environments/environment.development";
import { GithubIssue } from "../interfaces/github-issues.interface";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

export const getIssues = async (state: string = 'all', selectedLabels: string[]): Promise<GithubIssue[]> => {

    const params = new URLSearchParams();
    params.append('state', state);
    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','));
    }

    try {
        const resp = await fetch(`${GITHUB_API_URL}/issues?${params}`, {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });
        if (!resp.ok) throw "Can't get issues";

        const issues: GithubIssue[] = await resp.json();

        return issues
    } catch (error) {
        throw "Can't get issues";
    }
}