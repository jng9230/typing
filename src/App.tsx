import { generate } from "random-words";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./utils/localStorage";
import LineChart from "./components/LineChart";
import { TypingHistory, WordStatus } from "./utils/extraTypes";
import ThemeSetter from "./components/ThemeSetter";
import UIBar from "./components/UIBar";
import TextDisplay from "./components/TextDisplay";

function App() {
  //meta vars for words
  const [numWords, setNumWords] = useState(10);
  const numWordsOptions = [1, 10, 25, 50, 100]
  const [wordsArr, setWordsArr] = useState(() => {
    return generate({ exactly: numWords })
  })

  //vars to control state of typing
  const [typedWords, setTypedWords] = useState<Boolean[]>([])
  const [finished, setFinished] = useState(false);
  const [wordIndex, setWordIndex] = useState(0)
  const [inputText, setInputText] = useState("")
  const [wordStatuses, setWordStatuses] = useState<WordStatus[]>(() => {
    return Array.from("WAITING".repeat(numWords)) as WordStatus[]
  })

  //vars for data purposes
  const [history, setHistory] = useLocalStorage("history", []);
  const [WPM, setWPM] = useState<"NAN" | number>("NAN");
  const [ACC, setACC] = useState<"NAN" | number>("NAN");
  const [numCorrect, setNumCorrect] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

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
      const correct = typedWord === correctWord
      correct ? setNumCorrect(numCorrect + 1) : setNumCorrect(numCorrect)
      const temp = wordStatuses
      temp[wordIndex] = correct ? "CORRECT" : "INCORRECT"
      setWordStatuses(temp)
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
      const correct = typedWord + currChar === correctWord
      setTypedWords([...typedWords, correct])
      correct ? setNumCorrect(numCorrect + 1) : setNumCorrect(numCorrect)
      const temp = wordStatuses
      temp[wordIndex] = correct ? "CORRECT" : "INCORRECT"
      setWordStatuses(temp)
      return;
    }
  }

  //show WPM chart and update history when finished
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

  const updateNumWords = (num: number) => {
    setNumWords(num);
    resetWords(num);
  }

  const resetWords = (num: number) => {
    setFinished(false);
    const newGen = generate({ exactly: num })
    setWordsArr(newGen)

    setInputText("")
    setWordIndex(0)
    setTypedWords([])
    setACC("NAN")
    setWPM("NAN")
    setNumCorrect(0)
    setWordStatuses(Array.from("WAITING".repeat(numWords)) as WordStatus[])
  }

  return (
    <div className={`w-screen h-screen flex items-center justify-center font-mono bg-bg`}>
      <h3 className="text-xl text-center text-text absolute top-2"> TYPING TEST </h3>
      <div className={`p-3 space-y-3 w-2/3 border-2 border-transparent inline-flex flex-col rounded-lg bg-box max-w-screen-md`}>
        <UIBar numWordsOptions={numWordsOptions} numWords={numWords}
          updateNumWords={updateNumWords} WPM={WPM} ACC={ACC}
        />
        <TextDisplay wordsArr={wordsArr} wordStatuses={wordStatuses} wordIndex={wordIndex} />
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
        </div>
        {
          finished ?
            <LineChart history={history.filter((d: any) => d.numWords === numWords)} />
            : <></>
        }
      </div>
      <ThemeSetter />
    </div>
  );
}

export default App;
