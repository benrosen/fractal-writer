# storytoy

`storytoy` is a framework for interactive storytelling applications.

Many choose-your-own-adventure games allow the player to pick from a set of actions. Usually, each action results in a different outcome.

In `storytoy`, the reader does not choose actions directly. Instead, readers shape the course of the story by describing their emotional reactions to events.

## Overview

At its core, `storytoy` is a recursive function that operates on a `Story`.

`Choice` objects are the building blocks of every `Story`; a `Story` is just a set of choices. In other words, `Story` is syntactic sugar for `Choice[]`.

`Choice` objects tell `storytoy` what to show to the reader and how to prompt the reader for feedback. Reader feedback helps `storytoy` determine which `Choice` to show next.

Each `Choice` leads to another `Choice` until the story ends.

For more, [visit the documentation](https://benrosen.github.io/storytoy/).

## Example

```javascript
const { tell } = require("storytoy");

const story = [
  {
    axes: ["disgust", "lust", "trust"],
    id: "link-with-odo",
    onRender: (context) => {
      return `"Ensign," says Odo in a gravelly voice. "Let me link with you."`;
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
        id: "offend-odo",
      },
    ],
  },
  {
    axes: [],
    id: "link-with-odo-passionately",
    onRender: (context) => {
      return "No longer afraid of expressing your innermost desires, you throw yourself into Odo's waiting arms and become one with the Great Link.";
    },
    results: [],
  },
  {
    axes: [],
    id: "link-with-odo-dutifully",
    onRender: (context) => {
      return `You sigh and shake your head. A wry smile flickers across your face. Being a Starfleet officer certainly comes with its fair share of adventures. You take Odo's hand and prepare to join the Great Link.`;
    },
    results: [],
  },
  {
    axes: [],
    id: "link-with-odo-inquisitively",
    onRender: (context) => {
      return `The next few hours are a blur. You don't remember much, and you're not sure you ever want to.`;
    },
    results: [],
  },
  {
    axes: [],
    id: "game-over",
    onRender: (context) => {
      return `You recoil in disgust and slap Odo's gooey hand away. "${context.player.name}," says Odo. "...how could you?" Odo's feelings are clearly hurt.`;
    },
    results: [],
  },
];

tell(
  story,
  async (axes) => [
    { axis: axes[0], value: 1 },
    { axis: axes[1], value: 0 },
    { axis: axes[2], value: 1 },
  ],
  { player: { name: "Quark" } }
)
  .then((transcript) => console.log(transcript))
  .catch((error) => console.error(error));
```

## Scripts

```bash
npm run build   # compile the code
npm run docs    # generate updated documentation
npm run start   # compile the code and then run it
npm run test    # run all the tests
```
