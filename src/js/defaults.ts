import { JTI } from "./types";

export const defaultIntro: JTI.Intro = {
  element: "",
  steps: [],
};

export const defaultOptions: JTI.Options = {
  autoplay: false,
  delay: 100,
};

export const defaultData: JTI.Data = {
  intros: [],
  options: {},
  intro: defaultIntro,
};

export const defaultTheme: JTI.Theme = {
  color: "black",
};

export const defaultStorage: JTI.Storage = [];
