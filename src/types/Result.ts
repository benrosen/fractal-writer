import { Point } from "types/Point";

/**
 * A potential outcome of a {@link Choice}.
 */
export type Result = {
  /**
   * Which user reaction should prompt this {@link Result}?
   */
  point: Point;

  /**
   * Which {@link Choice} should follow this {@link Result}?
   */
  id: string;
};
