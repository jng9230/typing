import { setCSSVar } from "./useCSSVar"
export const themes = [
  "default",
  "light",
  "dark",
  "monokai",
  "nord",
  "dumpling",
  "lucky",
]
export const updateTheme = (theme: string) => {
  switch (theme) {
    case "dark":
      setCSSVar("--color-correct", "#22c55e")
      setCSSVar("--color-incorrect", "#ef4444")
      setCSSVar("--color-bg", "#000")
      setCSSVar("--color-text", "#fff")
      setCSSVar("--color-box", "#474747")
      setCSSVar("--color-ui", "#fff")
      setCSSVar("--color-upcoming", "#fff")
      break;
    case "monokai":
      setCSSVar("--color-correct", "#53DA52")
      setCSSVar("--color-incorrect", "#FA5C7E")
      setCSSVar("--color-bg", "#2C292D")
      setCSSVar("--color-text", "#F1F8F2")
      setCSSVar("--color-box", "#606060")
      setCSSVar("--color-ui", "#65C8E1")
      setCSSVar("--color-upcoming", "#70BA6F")
      break;
    case "nord":
      setCSSVar("--color-correct", "#89BE8C")
      setCSSVar("--color-incorrect", "#BF5D5E")
      setCSSVar("--color-bg", "#242933")
      setCSSVar("--color-text", "#fff")
      setCSSVar("--color-box", "#2E3440")
      setCSSVar("--color-ui", "#fff")
      setCSSVar("--color-upcoming", "#968EAD")
      break;
    case "dumpling":
      setCSSVar("--color-correct", "#26BC4C")
      setCSSVar("--color-incorrect", "#D13675")
      setCSSVar("--color-bg", "#AE9381")
      setCSSVar("--color-text", "#AB4E16")
      setCSSVar("--color-box", "#C5C2C0")
      setCSSVar("--color-ui", "#AB4E16")
      setCSSVar("--color-upcoming", "#AB4E16")
      break;
    case "lucky":
      setCSSVar("--color-correct", "#32D95D")
      setCSSVar("--color-incorrect", "#000FD3")
      setCSSVar("--color-bg", "#ECD7B6")
      setCSSVar("--color-text", "black")
      setCSSVar("--color-box", "#FE262B")
      setCSSVar("--color-ui", "#FFD700")
      setCSSVar("--color-upcoming", "#000FD3")
      break;
    case "light":
    default:
      setCSSVar("--color-correct", "#22c55e")
      setCSSVar("--color-incorrect", "#ef4444")
      setCSSVar("--color-bg", "#fff")
      setCSSVar("--color-text", "#000")
      setCSSVar("--color-box", "#fff")
      setCSSVar("--color-ui", "#000")
      setCSSVar("--color-upcoming", "#000")
      break;
  }
}