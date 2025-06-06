import { environment } from "src/environments/environment.development";
import { GithubIssue } from "../interfaces/github-issues.interface";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

export const getIssueComments = async (issueNumber: string): Promise<GithubIssue[]> => {

    try {
        const resp = await fetch(`${GITHUB_API_URL}/issues/${issueNumber}/comments`, {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });
        if (!resp.ok) throw "Can't get issue comments";

        const issueComments: GithubIssue[] = await resp.json();

        return issueComments
    } catch (error) {
        throw "Can't get comments of issue "+issueNumber;
    }
}
