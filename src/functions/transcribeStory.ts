import { Point } from "types/Point";
import { Story } from "types/Story";
import { findStoryChoiceById } from "./findStoryChoiceById";
import { getClosestResult } from "./getClosestResult";

/**
 * Render a {@link Story} to text, prompting the user for their reactions along the way and adjusting course accordingly.
 *
 * @param story - The list of {@link Choice} data to transcribe.
 * @param onPrompt - A callback function that can be used to display a transcript and collect user input in the form of a {@link Point}.
 * @param context - A persistent mutable data structure.
 * @param nextChoiceId - The id of the next {@link Choice} to transcribe.
 * @param transcript - The accumulated text of the {@link Story}.
 *
 * @returns {Promise<string>}
 */
export const transcribeStory = async (
  story: Story,
  onPrompt: (axes: string[], transcript: string) => Promise<Point>,
  context: any = {},
  nextChoiceId: string = "",
  transcript: string = ""
): Promise<string> => {
  const choice = findStoryChoiceById(nextChoiceId, story);
  if (!choice) {
    return transcript;
  }
  transcript += choice.onRender(context) + " ";
  const point = await onPrompt(choice.axes, transcript);
  nextChoiceId = getClosestResult(point, choice.results)?.id;
  return nextChoiceId
    ? transcribeStory(story, onPrompt, context, nextChoiceId, transcript)
    : transcript;
};
