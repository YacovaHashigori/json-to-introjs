import introJs from "intro.js";
import jsonToIntrojs from "../index";
import StorageService, { StorageServiceCheck } from "./services/storage";
import { JTI } from "../types/types";

export async function fetchJson<T>(url): Promise<T> {
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

export const findIntro = (intros: JTI.Intros): JTI.Intro | undefined => {
  return intros.find((intro: JTI.Intro) =>
    document.querySelector(intro.element) ? intro : false
  );
};

export const applyIntroOptions = (options: JTI.Options, intro: JTI.Intro) => {
  Object.entries(options).forEach(([option, val]) => {
    switch (option) {
      case "numbering":
        if (val) {
          intro = {
            ...intro,
            steps: intro.steps.map((step, id) =>
              step.title
                ? {
                  ...step,
                  title: `<span style="font-size:0.8em">#</span>${id + 1
                    } <span style="font-size:0.7em; margin: 0 4px">•</span> ${step.title
                    }`,
                }
                : step
            ),
          };
        }
        break;
    }
  });
  return intro;
};
