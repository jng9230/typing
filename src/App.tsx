import { type } from "os";
import { generate, count } from "random-words";
import { useCallback, useState } from "react";

function App() {
  const [numWords, setNumWords] = useState(50);
  const numWordsOptions = [10, 25, 50, 100, 200]

  const [wordsArr, setWordsArr] = useState(() => {
    return generate({ exactly: numWords })
  })

  const [words, setWords] = useState(() => {
    return wordsArr.reduce((acc, curr) => {
      return acc + " " + curr
    })
  })
  const [typedWords, setTypedWords] = useState<Boolean[]>([])

  const [wordIndex, setWordIndex] = useState(0)
  const [inputText, setInputText] = useState("")
  const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const str = e.currentTarget.value
    const currChar = str[str.length - 1]
    const currWord = str.slice(0, str.length - 1)

    //update indexes and check word if it's a space
    if (currChar === " ") {
      setWordIndex(wordIndex + 1)
      setInputText("")
      setTypedWords([...typedWords, currWord === wordsArr[wordIndex]])
      return;
    }

    //continue otherwise
    setInputText(e.currentTarget.value)
  }

  //reset test if tab is pressed 
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Tab") { return; }

    e.preventDefault();

    const newGen = generate({ exactly: numWords })
    setWordsArr(newGen)
    setWords(newGen.reduce((acc, curr) => {
      return acc + " " + curr
    }))

    setInputText("")
    setWordIndex(0)
    setTypedWords([])
  }
  const WPM = 0;
  const ACC = 0;

  const updateNumWords = (num: number) => {
    setNumWords(num)
    const newGen = generate({ exactly: num });
    setWordsArr(newGen)
    setWords(newGen.reduce((acc, curr) => {
      return acc + " " + curr
    }))
    setWordIndex(0);
    setTypedWords([]);
    setInputText("");

  }
  return (
    <div className="w-screen h-screen flex items-center font-mono">
      <div className="p-3 space-y-3 w-full">
        <h3 className="text-xl text-center"> TYPING TEST </h3>
        <div className="flex justify-between">
          <div className="divide-x-2">
            {
              numWordsOptions.map(d => {
                const focused = d === numWords ? "font-bold" : "font-normal"
                return <>
                  <span className={`first:pl-0 px-3 py-1 hover:font-bold cursor-pointer ${focused}`} onClick={() => updateNumWords(d)}>
                    {d}
                  </span>
                </>
              })
            }
          </div>
          <div className="divide-x-2">
            <span className="px-3 py-1">
              WPM: {WPM}
            </span>
            <span className="px-3 pr-0 py-1">
              ACC: {ACC}
            </span>
          </div>
        </div>
        <div className=" text-gray-500 relative">
          {words}
          <div className=" absolute top-0 z-50">
            {
              typedWords?.map((correct, i) => {
                const textColor = correct ? "text-green-500" : "text-red-500"
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
        <div>
          <input type="text"
            className="border-2 border-black rounded-xl px-3 py-1  w-full"
            value={inputText}
            onChange={handleInputText}
            onKeyDown={handleKeydown}
            autoFocus
          >
          </input>

        </div>
      </div>
    </div>
  );
}

export default App;
