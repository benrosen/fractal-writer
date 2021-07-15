import { Choice } from "types/Choice";
import { findStoryChoiceById } from "./findStoryChoiceById";

const foo: Choice = { axes: [], id: "foo", results: [], onRender: () => "" };
const bar: Choice = { axes: [], id: "bar", results: [], onRender: () => "" };
const baz: Choice = { axes: [], id: "baz", results: [], onRender: () => "" };

describe(`The ${findStoryChoiceById.name} function`, () => {
  it("finds the first Choice in the Story whose `id` matches the provided `id`.", () => {
    [
      { input: { id: "foo", story: [foo] }, expectedChoice: foo },
      { input: { id: "bar", story: [foo, bar] }, expectedChoice: bar },
      { input: { id: "baz", story: [foo, bar, baz] }, expectedChoice: baz },
    ].forEach(({ input, expectedChoice }) => {
      const choice = findStoryChoiceById(input.id, input.story);
      expect(choice).toStrictEqual(expectedChoice);
    });
  });
  it("returns `undefined` if no matching {@link Choice} can be found.", () => {
    [
      { id: "", story: [] },
      { id: "foo", story: [] },
      { id: "bar", story: [foo] },
    ].forEach(({ id, story }) => {
      const choice = findStoryChoiceById(id, story);
      expect(choice).toBeUndefined();
    });
  });
});
