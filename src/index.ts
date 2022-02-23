import { defaultOptions, defaultData, defaultTheme } from "./js/defaults";
import { JTI } from "./js/types";
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
  data = defaultData;
  options = defaultOptions;
  theme = defaultTheme;
  status = JTI.Status.Unloaded;
  init(jsonPath: string, options?: JTI.Options) {
    this.status = JTI.Status.Loading;
    if (options) this.options = { ...this.options, ...options };

    fetchAndDecode<JTI.IntrosJson>(jsonPath)
      .then((data) => {
        if (data) {
          if (data.intros && data.intros.length) {
            this.status = JTI.Status.Loaded;
            const {
              intros,
              options: introjsOptions,
              theme: introjsTheme,
            }: JTI.IntrosJson = data;
            let currentIntro = findCurrentIntro(intros);
            if (currentIntro) {
              this.data.intros = intros;
              if (introjsOptions) this.data.options = introjsOptions;
              setTheme(introjsTheme ?? this.theme);
              this.data.intro = applyIntroOptions(this.options, currentIntro);
              if (isNewIntro(currentIntro.element)) {
                if (this.options.autoplay) {
                  this.start();
                }
              }
              createBtnElement();
            }
          } else {
            throw customError(
              'Json must have property "intros" and must contain at least 1 intro'
            );
          }
        }
      })
      .catch(console.log);
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
