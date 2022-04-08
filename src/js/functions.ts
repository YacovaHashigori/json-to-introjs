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
