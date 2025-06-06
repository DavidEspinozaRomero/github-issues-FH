import { getIssues } from "./get-issues.action";
import { environment } from "src/environments/environment.development";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

const mockIssues =[
    { id: 1, body: 'First comment', user: { login: 'user1' } },
    { id: 2, body: 'Second comment', user: { login: 'user2' } },
]

describe("getIssues", () => {
    it("should fetch issues successfully", async () => {
        const issuesURL = `${GITHUB_API_URL}/issues?state=all`;
        const issuesResponse = new Response(JSON.stringify(mockIssues), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-type": "application/json",
            }
        })

        spyOn(window, 'fetch').and.resolveTo(issuesResponse);
        const issues = await getIssues('all', []);
        expect(window.fetch).toHaveBeenCalledWith(issuesURL, { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } });
    });

    it("should trow an error if the response is not ok", async () => {
        const issuesResponse = new Response(null, {
            status: 404,
            statusText: "Not Found",
            headers: {
                "Content-type": "application/json",
            }
        })

        spyOn(window, 'fetch').and.resolveTo(issuesResponse);
        try {
            const issues = await getIssues('all', []);
            expect(true).toBe(false); // no debería llegar aquí, usar a discrecion
        } catch (error) {
            expect(error).toBe("Can't get issues");
        }
    });
});