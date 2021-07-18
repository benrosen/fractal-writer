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

## Scripts

```bash
npm run build   # compile the code
npm run docs    # generate updated documentation
npm run start   # compile the code and then run it
npm run test    # run all the tests
```
