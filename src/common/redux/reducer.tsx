export interface AppState {
    lang: string;
    dir: string;
    datanavlayout: string;
    datathememode: string;
    dataheaderstyles: string;
    datamenustyles: string;
    dataverticalstyle: string;
    stylebodybg: string;
    styledarkbg: string;
    toggled: string;
    datanavstyle: string;
    horstyle: string;
    datapagestyle: string;
    datawidth: string;
    datamenuposition: string;
    dataheaderposition: string;
    // loader: string;
    iconoverlay: string;
    colorprimaryrgb: string;
    bodybg: string;
    light: string;
    darkbg: string;
    inputborder: string;
    bgimg: string;
    icontext: string;
    body: {
        class: string;
    };
}
const initialState: AppState = {
    lang: "en",
    dir: "ltr",
    datanavlayout: "vertical",
    datathememode: "light",
    dataheaderstyles: "light",
    datamenustyles: "light",
    dataverticalstyle: "default",
    stylebodybg: "",
    styledarkbg: "",
    toggled: "",
    datanavstyle: "",
    horstyle: "",
    datapagestyle: "regular",
    datawidth: "fullwidth",
    datamenuposition: "fixed",
    dataheaderposition: "fixed",
    // loader: "disable",
    iconoverlay: "",
    colorprimaryrgb: "",
    bodybg: "",
    light: "",
    darkbg: "",
    inputborder: "",
    bgimg: "",
    icontext: "",
    body: {
        class: ""
    },

};

export default function reducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {

        case "ThemeChanger":
            state = payload;
            return state;

        default:
            return state;
    }
}
