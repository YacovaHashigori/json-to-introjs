# json-to-introjs (JTI)

Make use of the Tour API of Introjs via a single JSON config.

---

## Json config

A sample of the json structure to follow can be found [here](./src/structure.json)

### JTI

Infos about JTI default values : [defaultOptions / defaultTheme](./src/js/defaults.ts)

#### Options

| key         | values                | description                                          |
| ----------- | --------------------- | ---------------------------------------------------- |
| autoplay    | boolean               | Automaticaly start intro if there's one on this page |
| delay       | number                | Delay the start method                               |
| titleNumber | boolean               | Prefix each step's title with a number               |
| button      | string (accepts html) | Button to start/restart an intro                     |

#### Theme

| key   | values                       | description                     |
| ----- | ---------------------------- | ------------------------------- |
| color | string (any valid css color) | Sets the color used for Introjs |

---

### Introjs

#### Options

List of available options is the same as [in the doc](https://introjs.com/docs/intro/options) of Introjs. These are general options that will apply to all Intros.

#### Intros

Intros are composed of a list of Intro objects. Each Intro is composed of the following :

| key     | values | required | description                                                        |
| ------- | ------ | -------- | ------------------------------------------------------------------ |
| element | string | yes      | A UNIQUE css selector that identifies the container for this intro |
| steps   | array  | yes      | Array of Step objects                                              |

#### Step

A list of additional options are listed [in the doc](https://introjs.com/docs/intro/attributes) of Introjs.

> Those options should be written without the `data-` part & in camelCase

| key     | values | required | description                                                                                           |
| ------- | ------ | -------- | ----------------------------------------------------------------------------------------------------- |
| element | string | no       | A css selector of the element to focus. If none specified, it will appear on the center of the screen |
| options | object | no       | Introjs options that should be used only by a specific step                                           |
