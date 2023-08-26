import { generate, count } from "random-words";
import { useCallback, useState, useEffect } from "react";
import { BiRevision, BiCog } from "react-icons/bi"
import { useLocalStorage } from "./utils/localStorage";
import LineChart from "./LineChart";
import { TypingHistory } from "./utils/extraTypes";
import { useCSSVar, getCSSVar, setCSSVar } from "./utils/useCSSVar";
import { themes, updateTheme } from "./utils/updateTheme";
function App() {
  const [numWords, setNumWords] = useState(10);
  const numWordsOptions = [1, 10, 25, 50, 100]

  const [wordsArr, setWordsArr] = useState(() => {
    return generate({ exactly: numWords })
  })

  const [words, setWords] = useState(() => {
    return wordsArr.reduce((acc, curr) => {
      return acc + " " + curr
    })
  })

  const [typedWords, setTypedWords] = useState<Boolean[]>([])
  const [finished, setFinished] = useState(false);
  const [wordIndex, setWordIndex] = useState(0)
  const [inputText, setInputText] = useState("")
  const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const str = e.currentTarget.value
    const currChar = str[str.length - 1]
    const typedWord = str.slice(0, str.length - 1)
    const correctWord = wordsArr[wordIndex]

    //at beginning -> start timer
    if (wordIndex === 0 && str.length === 1) {
      setStartTime(Date.now())
    }

    //update indexes and check word's validity if it's a space
    if (currChar === " ") {
      setWordIndex(wordIndex + 1)
      setInputText("")
      setTypedWords([...typedWords, typedWord === correctWord])
      typedWord === correctWord ? setNumCorrect(numCorrect + 1) : setNumCorrect(numCorrect)
      return;
    }

    //continue otherwise
    setInputText(e.currentTarget.value)

    //last word -> end time, calculate accuracy
    if (wordIndex === numWords - 1 &&
      str.length === wordsArr[numWords - 1].length
    ) {
      setFinished(true)
      setEndTime(Date.now())
      setInputText("")
      setTypedWords([...typedWords, typedWord + currChar === correctWord])
      typedWord + currChar === correctWord ? setNumCorrect(numCorrect + 1) : setNumCorrect(numCorrect)
      return;
    }
  }


  const [history, setHistory] = useLocalStorage("history", []);
  const [theme, setTheme] = useLocalStorage("theme", "default")
  //update css vars wrt theme
  useEffect(() => {
    updateTheme(theme);
  }, [theme])
  useEffect(() => {
    if (finished) {
      const wordsPerMSec = numWords / (endTime - startTime)
      const newWPM = Math.floor(wordsPerMSec * 1000 * 60)
      const newACC = Math.floor(numCorrect * 100 / numWords)
      setWPM(newWPM)
      setACC(newACC)
      const newHistory: TypingHistory = {
        WPM: newWPM,
        ACC: newACC,
        numWords: numWords
      }
      setHistory([...history, newHistory])
    }
  }, [finished])

  //reset test if esc is pressed 
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Escape") { return; }

    e.preventDefault();

    resetWords(numWords);
  }
  const [WPM, setWPM] = useState<"NAN" | number>("NAN");
  const [ACC, setACC] = useState<"NAN" | number>("NAN");
  const [numCorrect, setNumCorrect] = useState(0);

  const updateNumWords = (num: number) => {
    setNumWords(num);
    resetWords(num);
  }

  const resetWords = (num: number) => {
    setFinished(false);
    const newGen = generate({ exactly: num })
    setWordsArr(newGen)
    setWords(newGen.reduce((acc, curr) => {
      return acc + " " + curr
    }))

    setInputText("")
    setWordIndex(0)
    setTypedWords([])
    setACC("NAN")
    setWPM("NAN")
    setNumCorrect(0)
  }

  //set up timers for WPM
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

  return (
    <div className={`w-screen h-screen flex items-center justify-center font-mono bg-bg`}>
      <h3 className="text-xl text-center text-text absolute top-2"> TYPING TEST </h3>
      <div className={`p-3 space-y-3 w-2/3 border-2 border-transparent inline-flex flex-col rounded-lg bg-box`}>
        <div className="flex justify-between">
          <div className={`divide-x text-ui`}>
            WORDS:
            {
              numWordsOptions.map(d => {
                const focused = d === numWords ? "font-bold" : "font-normal"
                return <>
                  <span className={`first:pl-0 px-3 py-0 hover:font-bold cursor-pointer ${focused}`} onClick={() => updateNumWords(d)}>
                    {d}
                  </span>
                </>
              })
            }
          </div>
          <div className="divide-x-2 text-ui">
            <span className="px-3">
              WPM: {WPM}
            </span>
            <span className="px-3 pr-0">
              ACC: {ACC}%
            </span>
          </div>
        </div>
        <div className={`relative text-text`}>
          {
            wordsArr.map((curr, i) => {
              return i === wordIndex ? <span> <u>{curr}</u> </span>
                : curr + " "
            })
          }
          <div className="absolute top-0 left-0 z-50">
            {
              typedWords?.map((correct, i) => {
                const textColor = correct ? "text-correct" : "text-incorrect"
                return <>
                  <span className={textColor} key={i}>
                    {wordsArr[i]}
                  </span>
                  <span key={i + "space"}> </span>
                </>
              })
            }
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <input type="text"
            className="border-2 border-black rounded-xl px-3 py-1  w-full bg-transparent text-text outline-none focus:outline-none"
            value={inputText}
            onChange={handleInputText}
            onKeyDown={handleKeydown}
            autoFocus
            placeholder={finished ? "Press ESC to restart" : ""}
          >
          </input>
          {/* <button onClick={() => { resetWords(numWords) }} className="p-2 hover:border-red-500 hover:text-red-500 border-2 border-black rounded-lg"
            title="Reset"
          >
            <BiRevision />
          </button> */}
        </div>
        {
          finished ?
            <div>
              <LineChart history={history.filter((d: any) => d.numWords === numWords)} />
            </div> :
            <></>
        }
      </div>
      <div className="divide-x absolute bottom-3 text-text">
        THEME:
        {
          themes.map(d => {
            return <button onClick={() => setTheme(d)} className="px-3">
              {d}
            </button>
          })
        }
      </div>
    </div>
  );
}

export default App;
