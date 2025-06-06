import { getIssueComments } from "./get-issue-comments.action";

import { environment } from "src/environments/environment.development";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

const issueNumber = "123";
const mockComments = [
    { id: 1, body: 'First comment', user: { login: 'user1' } },
    { id: 2, body: 'Second comment', user: { login: 'user2' } },
]

describe("getIssueComments", () => {
    it("should fetch issue comments successfully", async () => {
        const commentsURL = `${GITHUB_API_URL}/issues/${issueNumber}/comments`
        const commentsResponse = new Response(JSON.stringify(mockComments), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-type": "application/json",
            }
        });

        spyOn(window, 'fetch').and.resolveTo(commentsResponse);
        const comments = await getIssueComments(issueNumber);
        expect(window.fetch).toHaveBeenCalledWith(commentsURL, { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } });

    });

    it("should trow an error if the response is not ok", async () => {
        
        const commentsResponse = new Response(null, {
            status: 404,
            statusText: "Not Found",
            headers: {
                "Content-type": "application/json",
            }
        });

        spyOn(window, 'fetch').and.resolveTo(commentsResponse);
        try {
            const comments = await getIssueComments(issueNumber);
            expect(true).toBe(false); // no debería llegar aquí, usar a discrecion
        } catch (error) {
            expect(error).toBe("Can't get comments of issue " + issueNumber);
        }

    });
});