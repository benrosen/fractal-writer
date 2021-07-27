import { Story } from "types/Story";
import { transcribeStory } from "./transcribeStory";

const story: Story = [
  {
    axes: ["disgust", "lust", "trust"],
    id: "link-with-odo",
    onRender: (context: any): string => {
      return `"${
        context?.player?.name ?? "Ensign"
      }," says Odo in a gravelly voice. "Let me link with you."`;
    },
    results: [
      {
        point: [
          { axis: "disgust", value: 0 },
          { axis: "lust", value: 1 },
          { axis: "trust", value: 1 },
        ],
        id: "link-with-odo-passionately",
      },
      {
        point: [
          { axis: "disgust", value: 1 },
          { axis: "lust", value: 0 },
          { axis: "trust", value: 1 },
        ],
        id: "link-with-odo-dutifully",
      },
      {
        point: [
          { axis: "disgust", value: 1 },
          { axis: "lust", value: 1 },
          { axis: "trust", value: 0 },
        ],
        id: "link-with-odo-inquisitively",
      },
      {
        point: [
          { axis: "disgust", value: 1 },
          { axis: "lust", value: 0 },
          { axis: "trust", value: 0 },
        ],
        id: "game-over",
      },
    ],
  },
  {
    axes: [],
    id: "link-with-odo-passionately",
    onRender: (context: any): string => {
      return "No longer afraid of expressing your innermost desires, you throw yourself into Odo's waiting arms and become one with the Great Link.";
    },
    results: [],
  },
  {
    axes: [],
    id: "link-with-odo-dutifully",
    onRender: (context: any): string => {
      return `You sigh and shake your head. A wry smile flickers across your face. Being a Starfleet officer certainly comes with its fair share of adventures. You take Odo's hand and prepare to join the Great Link.`;
    },
    results: [],
  },
  {
    axes: [],
    id: "link-with-odo-inquisitively",
    onRender: (context: any): string => {
      return `The next few hours are a blur. You don't remember much, and you're not sure you ever want to.`;
    },
    results: [],
  },
  {
    axes: [],
    id: "game-over",
    onRender: (context: any): string => {
      return `You recoil in disgust and slap Odo's gooey hand away. "${context.player.name}," says Odo. "...how could you?" Odo's feelings are clearly hurt.`;
    },
    results: [],
  },
];

describe(`The ${transcribeStory.name} function`, () => {
  it("renders a Story to text", () => {
    return transcribeStory(
      story,
      async (axes: string[], transcript: string) => {
        return [
          { axis: axes[0], value: 1 },
          { axis: axes[1], value: 0 },
          { axis: axes[2], value: 1 },
        ];
      }
    ).then((transcription) => {
      expect(transcription).toBeDefined();
    });
  });
  it("invokes a callback function.", () => {
    const callback = jest.fn(async (axes: string[], transcript: string) => {
      return [];
    });
    return transcribeStory(story, callback).then(() => {
      expect(callback.mock.calls.length).toBeGreaterThan(0);
    });
  });
  it("uses a context object to modify the story.", () => {
    return transcribeStory(
      story,
      async (axes: string[], transcript: string) => [
        { axis: axes[0], value: 1 },
        { axis: axes[1], value: 0 },
        { axis: axes[2], value: 0 },
      ],
      {
        player: { name: "Maggie" },
      }
    ).then((transcription) => {
      expect(transcription).toMatch(/(Maggie)/i);
    });
  });
});
