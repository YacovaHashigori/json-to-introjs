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
  checkJsonStructure,
} from "./js/functions";
import { isNewIntro } from "./js/services/storage";
import jsonStructure from "./js/structure.json";

import "./css/index.css";

class jsonToIntrojs {
  data = defaultData; // introjs
  options = defaultOptions;
  theme = defaultTheme;
  status = JTI.Status.Unloaded;
  init(jsonPath: string) {
    this.status = JTI.Status.Loading;

    fetchAndDecode<JTI.IntrosJson>(jsonPath).then((data) => {
      if (checkJsonStructure(data, jsonStructure)) {
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
      } else {
        throw customError(
          "Json is missing some mandatory properties, structure should be as follow : " +
            JSON.stringify(jsonStructure)
        );
      }
    });
  }
  start() {
    if (this.status == JTI.Status.Loaded) {
      dataReady(this.data);
    } else if (this.status == JTI.Status.Loading) {
      let loopID = 0;
      let awaitData = setInterval(() => {
        if (loopID == 1)
          console.log(customError("Delay can be increased", true));
        if (!this.data.intros.length) return loopID++;
        dataReady(this.data);
        clearInterval(awaitData);
      }, this.options.delay);
    } else {
      console.error(customError("Method init must be called before start"));
    }
  }
}

export default new jsonToIntrojs();
