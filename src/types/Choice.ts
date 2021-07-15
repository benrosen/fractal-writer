import { Result } from "types/Result";
import { Scribe } from "types/Scribe";

/**
 * The elemental building block of every {@link Story}.
 */
export type Choice = {
  /**
   * How should the user's reaction to this {@link Choice} be measured?
   */
  axes: string[];

  /**
   * How is this {@link Choice} uniquely identified within a {@link Story}?.
   */
  id: string;

  /**
   * Which outcomes can {@link Result} from this {@link Choice}?
   */
  results: Result[];

  /**
   * How should this {@link Choice} be presented to the user?
   */
  onRender: Scribe;
};
