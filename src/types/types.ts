import Introjs from "intro.js";

// JsonToIntrojs namespace
export namespace JTI {
  // Introjs types extends
  export type Intros = Intro[];

  export type Intro = {
    element: string;
    steps: Introjs.Step[];
    options?: Introjs.Options;
  };

  // JTI Types
  export type IntrosJson = {
    JTI: {
      options: Partial<Options>;
      theme: Partial<Theme>;
    };
    introjs: {
      options: Introjs.Options;
      intros: Intros;
    };
  };

  export type Options = {
    autoplay: boolean;
    delay: number;
    titleNumber: boolean;
    button: string;
  };

  export type Theme = {
    color: string;
  };

  export type Data = {
    options: Introjs.Options;
    intros: Intros;
    intro: Intro;
  };

  export type Storage = string[];

  export enum Status {
    Unloaded = "unloaded",
    Loading = "loading",
    Loaded = "loaded",
    Error = "error",
  }
}
