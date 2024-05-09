
import { checkBoard, Results } from "./tictactoe";
import {describe, it, expect} from "vitest";

describe("checkBoard", () => {
    it("should detect a win with dual X's", () => {
        expect(checkBoard("x,o,x,o,x,o,x,o,x")).toBe(Results.XWinner);
    });

    it("should detect a win with Os", () => {
        expect(checkBoard("o,o,o,,,x,,x")).toBe(Results.OWinner);
    })

    it("should detect an incomplete board", () => {
        expect(checkBoard("x,o,x")).toBe(Results.Incomplete);
    });

    it("should detect invalid characters", () => {
        expect(checkBoard("x,o,x,o,D,o,x,o,x")).toBe(Results.Error);    
    });

    it("should detect invalid x winners", () => {
        expect(checkBoard("x,x,x,x,x,x,x,x")).toBe(Results.Error);
    });

    it("should detect invalid o winners", () => {
        expect(checkBoard("o,o,o,x,x,x,o,o")).toBe(Results.Error);
    })

    it("should detect an invalid number of turns", () => {
        expect(checkBoard("x,x,x,o,,,,,")).toBe(Results.Error);    
    });
    it("should detect a tie", () => {
        expect(checkBoard("o,x,o,x,x,o,x,o,x")).toBe(Results.Tie);    
    });

    it("should reject a winnner when turns are invalid", () => {
        expect(checkBoard("o,o,o,x,,,,,")).toBe(Results.Error);
    })
});