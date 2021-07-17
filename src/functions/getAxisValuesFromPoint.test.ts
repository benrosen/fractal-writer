import { getAxisValuesFromPoint } from "functions/getAxisValuesFromPoint";

describe(`The ${getAxisValuesFromPoint.name} function`, () => {
  it(`converts a Point into an array of numeric axis values.`, () => {
    [
      { point: [], expectedAxisValues: [] },
      { point: [{ axis: "foo", value: 0 }], expectedAxisValues: [0] },
      {
        point: [
          { axis: "bar", value: 0.5 },
          { axis: "baz", value: 1 },
        ],
        expectedAxisValues: [0.5, 1],
      },
    ].forEach(({ point, expectedAxisValues }) => {
      const axisValues = getAxisValuesFromPoint(point);
      expect(axisValues).toStrictEqual<number[]>(expectedAxisValues);
    });
  });
});
