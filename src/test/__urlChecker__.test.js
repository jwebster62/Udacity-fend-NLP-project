import { validateUrl } from "../client/js/urlChecker";

describe("Testing the validate functionality", () => {
    test("Testing the validateInput() function", () => {
        expect(validateUrl).toBeDefined();
    });
});