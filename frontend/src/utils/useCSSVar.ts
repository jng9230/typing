import { useLocalStorage } from "./localStorage";

const r = document.querySelector(":root") as HTMLDivElement; //not correct but w/e
export const getCSSVar = (key: string) => {
    const rs = getComputedStyle(r)
    return rs.getPropertyValue(key)
}

export const setCSSVar = (key: string, val: string) => {
    r.style.setProperty(key, val)
}

export const useCSSVar = (key: string) => {
    const [val, setLocalVal] = useLocalStorage(key, getCSSVar(key));
    const setVal = (x: any) => {
        setCSSVar(key, x)
        setLocalVal(x)
    }

    return [val, setVal]
}