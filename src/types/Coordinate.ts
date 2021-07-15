/**
 * Measures a user's reaction to a {@link Choice}.
 */
export type Coordinate = {
  /**
   * How did the user react?
   */
  axis: string;

  /**
   * How strong was the user's reaction.
   */
  value: number;
};
