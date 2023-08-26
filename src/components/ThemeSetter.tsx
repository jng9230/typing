import { themes, updateTheme } from "../utils/updateTheme"
import { useEffect } from "react";
import { useLocalStorage } from "../utils/localStorage";

const ThemeSetter = () => {
  const [theme, setTheme] = useLocalStorage("theme", "default")
  useEffect(() => {
    updateTheme(theme);
  }, [theme])

  return (
    <div className="divide-x absolute bottom-3 text-text max-w-screen-md text-center">
      THEME:
      {
        Object.keys(themes).map(d => {
          return <button onClick={() => setTheme(d)} className="px-3" key={d}>
            {d === theme ? <b>{d}</b> : <span>{d}</span>}
          </button>
        })
      }
    </div>
  )
}

export default ThemeSetter