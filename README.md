# json-to-introjs (JTI)

Make use of the Tour API of Introjs via a single JSON config.

---

## Json config

A sample of the json structure to follow can be found [here](./src/structure.json)

### JTI

Infos about JTI default values : [defaultOptions / defaultTheme](./src/js/defaults.ts)
These options take effect on all intros (futur implementation might allow you to be more specific)

#### Options

| key       | values  | description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| autoplay  | boolean | Automaticaly start intro if there's one on this page              |
| numbering | boolean | Prefix each step's title with a number                            |
| button    | string  | A css selector for the button that will be used to start an Intro |

#### Theme

| key   | values                       | description                     |
| ----- | ---------------------------- | ------------------------------- |
| color | string (any valid css color) | Sets the color used for Introjs |

---

### Introjs

#### Options

List of available Tour API options : [introjs doc](https://introjs.com/docs/intro/options).

> These options are global, meaning that they will apply to all Intros

#### Intros

List (array) of Intros. Each Intro is composed of the following :

| key     | values | required | description                                                               |
| ------- | ------ | -------- | ------------------------------------------------------------------------- |
| element | string | yes      | A <b>unique</b> css selector that identifies the container for this intro |
| steps   | array  | yes      | Array of Step objects                                                     |
| options | object | no       | Same as options mentioned above, but only apply to a specific Intro       |

#### Step

List of available Step options : [introjs doc](https://introjs.com/docs/intro/attributes)

> Those options should be written without `data-` and in camelCase (eg. "data-scroll-to" becomes "scrollTo")

| key     | values | required | description                                                                                           |
| ------- | ------ | -------- | ----------------------------------------------------------------------------------------------------- |
| element | string | no       | A css selector of the element to focus. If none specified, it will appear on the center of the screen |
