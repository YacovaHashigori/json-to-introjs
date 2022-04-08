import introJs from "intro.js";

import { defaultOptions, defaultData, defaultTheme } from "./js/defaults";
import { JTI } from "./types/types";
import {
	fetchJson,
	findIntro,
	applyIntroOptions,
} from "./js/functions";
import StorageService, { StorageServiceCheck } from "./js/services/storage";

import "./css/index.css";

class jsonToIntrojs {
	introjs = null; // introjs instance
	data = defaultData; // introjs data
	options = defaultOptions;
	theme = defaultTheme;
	status = JTI.Status.Unloaded;
	constructor(jsonPath: string) {
		this.status = JTI.Status.Loading;

		fetchJson<JTI.IntrosJson>(jsonPath).then((data) => {
			if (data) {
				this.status = JTI.Status.Loaded;

				// Assign data to variables
				const {
					JTI: { options: JTIOptions, theme: JTITheme },
					introjs: { intros: introjsIntros, options: introjsOptions },
				}: JTI.IntrosJson = data;

				let intro = findIntro(introjsIntros);
				if (intro) {
					// Set & apply options, theme
					this.options = { ...this.options, ...JTIOptions };
					this.theme = { ...this.theme, ...JTITheme };
					this.applyTheme();

					// Set data
					this.data.options = introjsOptions;
					this.data.intros = introjsIntros;
					this.data.intro = applyIntroOptions(this.options, intro);

					this.applyOptions();
				}
			} else {
				this.status = JTI.Status.Error;
			}
		});
	}
	applyTheme() {
		Object.entries(this.theme).forEach(([prop, value]) => {
			document.documentElement.style.setProperty(`--introjs-${prop}`, value);
		});
	}
	applyOptions() {
		Object.entries(this.options).forEach(([prop, value]) => {
			switch (prop) {
				case "autoplay":
					if (StorageService.check(this.data.intro.element, StorageServiceCheck.New) && value) this.start();
					break;
				case "button":
					if (value) document.querySelector(value as string)?.addEventListener('click', () => { this.start() });
					break;
			}
		})
	}
	start() {
		switch (this.status) {
			case JTI.Status.Loaded:
				let { options, intros, intro } = this.data;
				// If current intro has specific options, overwrite default options
				if (intro.options) {
					options = { ...options, ...intro.options };
				}
				this.introjs = introJs(intro.element)
					.setOptions({ ...options, steps: intro.steps })
					.onexit(() => {
						StorageService.add(intro.element);
					})
					.start();
				break;
			case JTI.Status.Loading:
				// Loading...
				break;
			case JTI.Status.Error:
				// Error...
				break;
		}
	}
}

export default jsonToIntrojs;
