import { Point } from "types/Point";
import { Result } from "types/Result";
import distance from "euclidean-distance";
import { getAxisValuesFromPoint } from "./getAxisValuesFromPoint";

/**
 * Finds the {@link Result} with the lowest distance to the given {@link Point}.
 *
 * @param {Point} point - The origin from which to measure distances.
 * @param {Result[]} results - The {@link Result} candidates.
 *
 * @returns {Result}
 *
 * @todo import types from euclidean-distance
 */
export const getClosestResult = (point: Point, results: Result[]): Result => {
  const pointValues = getAxisValuesFromPoint(point);
  return results.sort((a, b) => {
    return (
      distance([...pointValues], [...getAxisValuesFromPoint(a.point)]) -
      distance([...pointValues], [...getAxisValuesFromPoint(b.point)])
    );
  })[0];
};
