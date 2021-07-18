import { Point } from "types/Point";
import { Story } from "types/Story";
import { findStoryChoiceById } from "./findStoryChoiceById";
import { getClosestResult } from "./getClosestResult";

/**
 * Render a {@link Story} to text, prompting the user for their reactions along the way and adjusting course accordingly.
 *
 * @param story - The list of {@link Choice} data to transcribe.
 * @param onPrompt - A callback function that can be used to collect user input in the form of a {@link Point}.
 * @param context - A persistent mutable data structure.
 * @param nextChoiceId - The id of the next {@link Choice} to transcribe.
 * @param transcript - The accumulated text of the {@link Story}.
 *
 * @returns {Promise<string>}
 */
export const transcribeStory = async (
  story: Story,
  onPrompt: (axes: string[]) => Promise<Point>,
  context: any = {},
  nextChoiceId: string = "",
  transcript: string = ""
): Promise<string> => {
  const choice = findStoryChoiceById(nextChoiceId, story) ?? story[0];
  if (!choice) {
    console.warn(`Unable to find choice by id: ${nextChoiceId}.`);
    return transcript;
  }
  const point = await onPrompt(choice.axes);
  const updatedTranscript = transcript + choice.onRender(context);
  return choice.results.length === 0
    ? updatedTranscript
    : transcribeStory(
        story,
        onPrompt,
        context,
        getClosestResult(point, choice.results).id,
        updatedTranscript
      );
};
