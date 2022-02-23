import introJs from "intro.js";
import jsonToIntrojs from "../../index";
import StorageService from "./services/storage";
import { JTI } from "./types";

export async function fetchAndDecode<T>(url): Promise<T> {
  let content = null;

  try {
    let res = await fetch(url);
    if (res.ok) {
      content = await res.json();
    }
  } catch (e) {
    console.log(e);
  }

  return content;
}

export const findCurrentIntro = (intros: JTI.Intros): JTI.Intro | undefined => {
  return intros.find((intro: JTI.Intro) =>
    document.querySelector(intro.element) ? intro : false
  );
};

export const customError = (msg: string, soft: boolean = false) => {
  let err = `Intro-creator: ${msg}`;
  return soft ? err : new Error(err);
};

export const dataReady = ({ options, intro }: JTI.Data) => {
  if (intro.options) {
    // if current intro has specific options, overwrite default options
    options = { ...options, ...intro.options };
  }
  return introJs(intro.element)
    .setOptions({ ...options, steps: intro.steps })
    .onexit(() => {
      StorageService.add(intro.element);
    })
    .start();
};

export const setTheme = (theme: JTI.Theme) => {
  Object.entries(theme).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(`--introjs-${prop}`, value);
  });
};

export const createBtnElement = () => {
  let elt = document.createDocumentFragment();
  let btn = document.createElement("button");
  btn.innerText = "Start intro";
  btn.classList.add("jti-button");
  btn.addEventListener("click", () => jsonToIntrojs.start());
  elt.append(btn);
  document.body.appendChild(elt);
};

export const applyIntroOptions = (options: JTI.Options, intro: JTI.Intro) => {
  Object.entries(options).forEach(([option, val]) => {
    switch (option) {
      case "titleNumber":
        intro = {
          ...intro,
          steps: intro.steps.map((step, id) =>
            step.title
              ? {
                  ...step,
                  title: `<span style="font-size:0.8em">#</span>${
                    id + 1
                  } <span style="font-size:0.7em; margin: 0 4px">•</span> ${
                    step.title
                  }`,
                }
              : step
          ),
        };
        break;
    }
  });
  return intro;
};
