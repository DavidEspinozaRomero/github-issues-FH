import { environment } from "src/environments/environment.development";
import { GithubIssue } from "../interfaces/github-issues.interface";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

export const getIssueByNumber = async (issueNumber: string): Promise<GithubIssue> => {
    try {
        const resp = await fetch(`${GITHUB_API_URL}/issues/${issueNumber}`, {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });
        if (!resp.ok) throw "Can't get issue";

        const issue: GithubIssue = await resp.json();
        return issue
    } catch (error) {
        throw "Can't get issue "+issueNumber;
    }
}