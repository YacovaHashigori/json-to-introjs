import { Options, Step } from "intro.js";

// JsonToIntrojs namespace
export namespace JTI {
  export type Intros = Intro[];

  export type Intro = {
    element: string;
    steps: Step[];
    options?: Options;
  };

  export type Theme = {
    color: string;
  };

  export type IntrosJson = {
    theme: Theme;
    options: Options;
    intros: Intros;
  };

  export type Data = {
    options: Options;
    intros: Intros;
    intro: Intro;
  };

  export type Options = {
    autoplay?: boolean;
    delay?: number;
    titleNumber?: boolean;
  };

  export type Storage = string[];

  export enum Status {
    Unloaded = "unloaded",
    Loading = "loading",
    Loaded = "loaded",
    Error = "error",
  }
}
