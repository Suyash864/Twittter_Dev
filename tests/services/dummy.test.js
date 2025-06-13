import { JsonWebTokenError } from "jsonwebtoken";
import { execute } from "../../src/services/dummy-service.js";

test('result is true and return Learning JS', () => {
    // IMPL oof test
    const result = execute();
    expect(result).toBe('Learning JS');
})