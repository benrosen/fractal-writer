import { Choice } from "types/Choice";
import { findStoryChoiceById } from "functions/findStoryChoiceById";

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
  it("throws an error if the Story contains no Choice objects.", () => {
    expect(() => {
      findStoryChoiceById("foo", []);
    }).toThrow();
  });
  it("returns the first Choice in the Story if no choiceId is provided.", () => {
    const choice = findStoryChoiceById("", [foo, bar]);
    expect(choice).toBe(foo);
  });
  it("returns `undefined` if no matching Choice can be found.", () => {
    [
      { id: "foo", story: [bar] },
      { id: "foo", story: [bar, baz] },
    ].forEach(({ id, story }) => {
      const choice = findStoryChoiceById(id, story);
      expect(choice).toBeUndefined();
    });
  });
});
