import { sleep } from "@helpers/sleep";

import { environment } from "src/environments/environment";
import { GithubIssue } from "../interfaces/github-issues.interface";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

export const getLabels = async (): Promise<GithubIssue[]> => {
    await sleep(1000);
    try {
        const resp = await fetch(`${GITHUB_API_URL}/issues`, {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });
        if (!resp.ok) throw "Can't get issues";

        const issues: GithubIssue[] = await resp.json();
        console.log({ issues });

        return issues
    } catch (error) {
        throw "Can't get issues";
    }
}