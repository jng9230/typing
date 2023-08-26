import { setCSSVar } from "./useCSSVar"
type Theme = {
  correct: string,
  incorrect: string,
  bg: string,
  text: string,
  box: string,
  ui: string,
  upcoming: string
}
export const themes: { [themeName: string]: Theme } = {
  "default": {
    correct: "#22c55e",
    incorrect: "#ef4444",
    bg: "#f2f2f2",
    text: "#000",
    box: "white",
    ui: "#000",
    upcoming: "#000"
  },
  "light": {
    correct: "#22c55e",
    incorrect: "#ef4444",
    bg: "#f2f2f2",
    text: "#000",
    box: "white",
    ui: "#000",
    upcoming: "#000"
  },
  "dark": {
    correct: "#22c55e",
    incorrect: "#ef4444",
    bg: "#1f1f1f",
    text: "#fff",
    box: "#474747",
    ui: "#fff",
    upcoming: "#fff"
  },
  "monokai": {
    correct: "#53DA52",
    incorrect: "#FA5C7E",
    bg: "#2C292D",
    text: "#F1F8F2",
    box: "#606060",
    ui: "#65C8E1",
    upcoming: "#70BA6F"
  },
  "nord": {
    correct: "#89BE8C",
    incorrect: "#BF5D5E",
    bg: "#242933",
    text: "#fff",
    box: "#2E3440",
    ui: "#fff",
    upcoming: "#968EAD"
  },
  "dumpling": {
    correct: "#26BC4C",
    incorrect: "#D13675",
    bg: "#AE9381",
    text: "#AB4E16",
    box: "#C5C2C0",
    ui: "#AB4E16",
    upcoming: "#AB4E16"
  },
  "lucky": {
    correct: "#FFD700",
    incorrect: "black",
    bg: "#ECD7B6",
    text: "white",
    box: "#FE262B",
    ui: "#FFD700",
    upcoming: "#000FD3"
  },
}
export const updateTheme = (theme: string) => {
  setCSSVar("--color-correct", themes[theme].correct)
  setCSSVar("--color-incorrect", themes[theme].incorrect)
  setCSSVar("--color-bg", themes[theme].bg)
  setCSSVar("--color-text", themes[theme].text)
  setCSSVar("--color-box", themes[theme].box)
  setCSSVar("--color-ui", themes[theme].ui)
  setCSSVar("--color-upcoming", themes[theme].upcoming)
}