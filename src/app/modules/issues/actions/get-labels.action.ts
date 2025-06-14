import { GithubLabel } from "../interfaces/github-labels.interface";
import { environment } from "src/environments/environment.development";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

export const getLabels = async (): Promise<GithubLabel[]> => {

    try {
        const resp = await fetch(`${GITHUB_API_URL}/labels`, {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });
        if (!resp.ok) throw "Can't get labels";

        const labels: GithubLabel[] = await resp.json();

        return labels
    } catch (error) {
        throw "Can't get labels";
    }
}