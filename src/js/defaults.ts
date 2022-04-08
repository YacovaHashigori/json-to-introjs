import { JTI } from "../types/types";

export const defaultOptions: JTI.Options = {
  autoplay: false,
  numbering: false,
  button: "",
};

export const defaultTheme: JTI.Theme = {
  color: "black",
};

export const defaultIntro: JTI.Intro = {
  element: "",
  steps: [],
};

export const defaultData: JTI.Data = {
  intros: [],
  options: {},
  intro: defaultIntro,
};

export const defaultStorage: JTI.Storage = [];
