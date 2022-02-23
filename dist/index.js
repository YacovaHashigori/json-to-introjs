require("./index.css");
var $iEn1Z$introjs = require("intro.js");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $f5bfd4ce37214f4f$export$2e2bcd8739ae039);
const $9439ee6ea7d8bd70$export$e338e92a88877a75 = {
    element: "",
    steps: []
};
const $9439ee6ea7d8bd70$export$ba43bf67f3d48107 = {
    autoplay: false,
    delay: 100
};
const $9439ee6ea7d8bd70$export$54e9baa5a9072bca = {
    intros: [],
    options: {
    },
    intro: $9439ee6ea7d8bd70$export$e338e92a88877a75
};
const $9439ee6ea7d8bd70$export$164de7ab8df77ef0 = {
    color: "black"
};
const $9439ee6ea7d8bd70$export$586b30dcaeecb901 = [];


let $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff;
(function($77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff) {
    let Status1;
    (function(Status) {
        Status["Unloaded"] = "unloaded";
        Status["Loading"] = "loading";
        Status["Loaded"] = "loaded";
        Status["Error"] = "error";
    })(Status1 = $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status || ($77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status = {
    }));
})($77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff || ($77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff = {
}));





const $d293d0d9f2670d3e$var$StorageService = {
    key: "JTI",
    read: function() {
        let storageString = localStorage.getItem(this.key);
        return storageString ? JSON.parse(storageString) : $9439ee6ea7d8bd70$export$586b30dcaeecb901;
    },
    write: function(state) {
        localStorage.setItem(this.key, JSON.stringify(state));
    },
    add: function(id) {
        let storage = this.read();
        if ($d293d0d9f2670d3e$export$123f3831ce004887(id)) {
            storage.push(id);
            this.write(storage);
        }
    }
};
const $d293d0d9f2670d3e$export$123f3831ce004887 = (id)=>{
    return !$d293d0d9f2670d3e$var$StorageService.read().includes(id);
};
var $d293d0d9f2670d3e$export$2e2bcd8739ae039 = $d293d0d9f2670d3e$var$StorageService;


async function $9a5998f7c71eb6ac$export$8192083f64c7bc77(url) {
    let content = null;
    try {
        let res = await fetch(url);
        if (res.ok) content = await res.json();
    } catch (e) {
        console.log(e);
    }
    return content;
}
const $9a5998f7c71eb6ac$export$9c5ae2f9096874a4 = (intros)=>{
    return intros.find((intro)=>document.querySelector(intro.element) ? intro : false
    );
};
const $9a5998f7c71eb6ac$export$27db50ed83a49c5a = (msg, soft = false)=>{
    let err = `Intro-creator: ${msg}`;
    return soft ? err : new Error(err);
};
const $9a5998f7c71eb6ac$export$32ed53e78850bc76 = ({ options: options , intro: intro  })=>{
    if (intro.options) // if current intro has specific options, overwrite default options
    options = {
        ...options,
        ...intro.options
    };
    return ($parcel$interopDefault($iEn1Z$introjs))(intro.element).setOptions({
        ...options,
        steps: intro.steps
    }).onexit(()=>{
        $d293d0d9f2670d3e$export$2e2bcd8739ae039.add(intro.element);
    }).start();
};
const $9a5998f7c71eb6ac$export$2e49b867b7a0847c = (theme)=>{
    Object.entries(theme).forEach(([prop, value])=>{
        document.documentElement.style.setProperty(`--introjs-${prop}`, value);
    });
};
const $9a5998f7c71eb6ac$export$90f8500472dfb23e = ()=>{
    let elt = document.createDocumentFragment();
    let btn = document.createElement("button");
    btn.innerText = "Start intro";
    btn.classList.add("jti-button");
    btn.addEventListener("click", ()=>$f5bfd4ce37214f4f$export$2e2bcd8739ae039.start()
    );
    elt.append(btn);
    document.body.appendChild(elt);
};
const $9a5998f7c71eb6ac$export$c4c73389d7ce666 = (options, intro)=>{
    Object.entries(options).forEach(([option, val])=>{
        switch(option){
            case "titleNumber":
                intro = {
                    ...intro,
                    steps: intro.steps.map((step, id)=>step.title ? {
                            ...step,
                            title: `<span style="font-size:0.8em">#</span>${id + 1} <span style="font-size:0.7em; margin: 0 4px">•</span> ${step.title}`
                        } : step
                    )
                };
                break;
        }
    });
    return intro;
};




class $f5bfd4ce37214f4f$var$jsonToIntrojs {
    init(jsonPath, options) {
        this.status = $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status.Loading;
        if (options) this.options = {
            ...this.options,
            ...options
        };
        $9a5998f7c71eb6ac$export$8192083f64c7bc77(jsonPath).then((data)=>{
            if (data) {
                if (data.intros && data.intros.length) {
                    this.status = $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status.Loaded;
                    const { intros: intros , options: introjsOptions , theme: introjsTheme ,  } = data;
                    let currentIntro = $9a5998f7c71eb6ac$export$9c5ae2f9096874a4(intros);
                    if (currentIntro) {
                        this.data.intros = intros;
                        if (introjsOptions) this.data.options = introjsOptions;
                        $9a5998f7c71eb6ac$export$2e49b867b7a0847c(introjsTheme ?? this.theme);
                        this.data.intro = $9a5998f7c71eb6ac$export$c4c73389d7ce666(this.options, currentIntro);
                        if ($d293d0d9f2670d3e$export$123f3831ce004887(currentIntro.element)) {
                            if (this.options.autoplay) this.start();
                        }
                        $9a5998f7c71eb6ac$export$90f8500472dfb23e();
                    }
                } else throw $9a5998f7c71eb6ac$export$27db50ed83a49c5a('Json must have property "intros" and must contain at least 1 intro');
            }
        }).catch(console.log);
    }
    start() {
        if (this.status == $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status.Loaded) $9a5998f7c71eb6ac$export$32ed53e78850bc76(this.data);
        else if (this.status == $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status.Loading) {
            let loopID = 0;
            let awaitData = setInterval(()=>{
                if (loopID == 1) console.log($9a5998f7c71eb6ac$export$27db50ed83a49c5a("Delay can be increased", true));
                if (!this.data.intros.length) return loopID++;
                $9a5998f7c71eb6ac$export$32ed53e78850bc76(this.data);
                clearInterval(awaitData);
            }, this.options.delay);
        } else console.error($9a5998f7c71eb6ac$export$27db50ed83a49c5a("Method init must be called before start"));
    }
    constructor(){
        this.data = $9439ee6ea7d8bd70$export$54e9baa5a9072bca;
        this.options = $9439ee6ea7d8bd70$export$ba43bf67f3d48107;
        this.theme = $9439ee6ea7d8bd70$export$164de7ab8df77ef0;
        this.status = $77e0a0f3da8e33d3$export$a8ae2b7d78b1dfff.Status.Unloaded;
    }
}
var $f5bfd4ce37214f4f$export$2e2bcd8739ae039 = new $f5bfd4ce37214f4f$var$jsonToIntrojs();


