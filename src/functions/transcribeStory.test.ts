import { Story } from "types/Story";
import { transcribeStory } from "./transcribeStory";

const text = "foo";

const story: Story = [
  {
    axes: ["x", "y"],
    id: "",
    results: [],
    onRender: (context: any) => {
      return text;
    },
  },
];

describe(`The ${transcribeStory.name} function`, () => {
  it("renders a Story to text", () => {
    return transcribeStory(story, async (axes: string[]) => {
      return [];
    }).then((transcription) => {
      expect(transcription).toStrictEqual(text);
    });
  });
  it("invokes a callback function.", () => {
    const callback = jest.fn(async () => {
      return [];
    });
    return transcribeStory(story, callback).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
