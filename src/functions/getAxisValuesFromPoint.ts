import { Point } from "types/Point";

/**
 * Converts a {@link Point} into an array of numeric axis values.
 *
 * @param {Point} point - The {@link Point} from which to extract axis values.
 *
 * @returns {number[]}
 */
export const getAxisValuesFromPoint = (point: Point): number[] => {
  return point.map((coordinate) => {
    return coordinate.value;
  });
};
