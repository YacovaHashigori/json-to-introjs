import { defaultOptions, defaultData, defaultTheme } from "./js/defaults";
import { JTI } from "./types/types";
import {
  fetchAndDecode,
  setTheme,
  findCurrentIntro,
  createBtnElement,
  customError,
  dataReady,
  applyIntroOptions,
} from "./js/functions";
import { isNewIntro } from "./js/services/storage";

import "./css/index.css";

class jsonToIntrojs {
  data = defaultData; // introjs
  options = defaultOptions;
  theme = defaultTheme;
  status = JTI.Status.Unloaded;
  init(jsonPath: string) {
    this.status = JTI.Status.Loading;

    fetchAndDecode<JTI.IntrosJson>(jsonPath).then((data) => {
      this.status = JTI.Status.Loaded;

      const {
        JTI: { options: options, theme: theme },
        introjs: { intros, options: introjsOptions },
      }: JTI.IntrosJson = data;

      let currentIntro = findCurrentIntro(intros);
      if (currentIntro) {
        this.options = { ...this.options, ...options };
        this.theme = { ...this.theme, ...theme };
        setTheme(this.theme);

        this.data.options = introjsOptions;
        this.data.intros = intros;
        this.data.intro = applyIntroOptions(this.options, currentIntro);

        console.log(this.options);
        if (isNewIntro(currentIntro.element)) {
          if (this.options.autoplay) {
            this.start();
          }
        }
        if (this.options.button) {
          createBtnElement();
        }
      }
    });
  }
  start() {
    if (this.status == JTI.Status.Loaded) {
      dataReady(this.data);
    } else if (this.status == JTI.Status.Loading) {
      let awaitData = setInterval(() => {
        if (!this.data.intros.length) return;
        dataReady(this.data);
        clearInterval(awaitData);
      }, this.options.delay);
    } else {
      console.error(customError("Method init must be called before start"));
    }
  }
}

export default new jsonToIntrojs();
