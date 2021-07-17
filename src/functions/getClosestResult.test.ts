import { Result } from "types/Result";
import { getClosestResult } from "functions/getClosestResult";

const a: Result = {
  point: [
    { axis: "x", value: 0 },
    { axis: "y", value: 1 },
  ],
  id: "a",
};
const b: Result = {
  point: [
    { axis: "x", value: 1 },
    { axis: "y", value: 0 },
  ],
  id: "b",
};
const c: Result = {
  point: [
    { axis: "x", value: 1 },
    { axis: "y", value: 1 },
  ],
  id: "c",
};

describe(`The ${getClosestResult} function`, () => {
  it("finds the Result with the lowest distance to the given Point", () => {
    [
      {
        expectedresult: undefined,
        point: a.point,
        results: [],
      },
      {
        expectedresult: a,
        point: [],
        results: [a],
      },
      {
        expectedresult: b,
        point: b.point,
        results: [a, b],
      },
      {
        expectedresult: a,
        point: a.point,
        results: [a, b],
      },
      {
        expectedresult: c,
        point: c.point,
        results: [a, b, c],
      },
    ].forEach(({ expectedresult, point, results }) => {
      const closestResult = getClosestResult(point, results);
      expect(closestResult).toStrictEqual<Result | undefined>(expectedresult);
    });
  });
});
