import { getLabels } from "./get-labels.action";
import { environment } from "src/environments/environment.development";

const GITHUB_API_URL = environment.GITHUB_API_URL;
const GITHUB_TOKEN = environment.GITHUB_TOKEN;

const mockLabels = [
    {
        "id": 2732535159,
        "node_id": "MDU6TGFiZWwyNzMyNTM1MTU5",
        "url": "https://api.github.com/repos/angular/angular/labels/Accessibility",
        "name": "Accessibility",
        "color": "b52eea",
        "default": false,
        "description": "issues related to accessibility (a11y)"
    },
    {
        "id": 135584804,
        "node_id": "MDU6TGFiZWwxMzU1ODQ4MDQ=",
        "url": "https://api.github.com/repos/angular/angular/labels/action:%20cleanup",
        "name": "action: cleanup",
        "color": "e11d21",
        "default": false,
        "description": "The PR is in need of cleanup, either due to needing a rebase or in response to comments from reviews"
    }
]

describe("getLabels", () => {
    it("should fetch labels successfully", async () => {
        const labelsURL = `${GITHUB_API_URL}/labels`;
        const labelsResponse = new Response(JSON.stringify(mockLabels), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-type": "application/json",
            }
        })

        spyOn(window, 'fetch').and.resolveTo(labelsResponse);
        const labels = await getLabels();
        expect(window.fetch).toHaveBeenCalledWith(labelsURL, { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } });
    });

    it("should trow an error if the response is not ok", async () => {
        const labelsResponse = new Response(null, {
            status: 404,
            statusText: "Not Found",
            headers: {
                "Content-type": "application/json",
            }
        })

        try {
            const labels = await getLabels();
            expect(true).toBe(false); // no debería llegar aquí, usar a discrecion
        } catch (error) {
            expect(error).toBe("Can't get labels");
        }
    });

})