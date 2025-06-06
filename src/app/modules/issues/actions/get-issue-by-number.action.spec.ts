import { getIssueByNumber } from "./get-issue-by-number.action";

import { environment } from "src/environments/environment.development";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

const issueNumber = "123";
const mockIssue = {
    id: 1,
    number: issueNumber,
    body: '# hola mundo',
}

describe("getIssueByNumber", () => {

    it("should exist and be defined", async () => {
        expect(getIssueByNumber).toBeDefined();
        expect(getIssueByNumber).toBeInstanceOf(Function);
    });

    it("should fetch issue successfully", async () => {
        const requestURL = `${GITHUB_API_URL}/issues/${issueNumber}`;
        const issueResponse = new Response(JSON.stringify(mockIssue), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-type": "application/json",
            }
        });

        spyOn(window, "fetch").and.resolveTo(issueResponse);
        const issue = await getIssueByNumber(issueNumber);
        expect(window.fetch).toHaveBeenCalledWith(requestURL, { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } });
    });

    it("should fetch issue wrongly", async () => {
        const requestURL = `${GITHUB_API_URL}/issues/${issueNumber}`;
        const issueResponse = new Response(null, {
            status: 404,
            statusText: "Not Found",
            headers: {
                "Content-type": "application/json",
            }
        });

        spyOn(window, "fetch").and.resolveTo(issueResponse);
        try {
            const issue = await getIssueByNumber(issueNumber); // falla
            expect(true).toBe(false); // no debería llegar aquí, usar a discrecion
        } catch (error) {
            expect(error).toBe("Can't get issue "+issueNumber);
        }
        
    });
});