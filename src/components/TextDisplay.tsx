import { WordStatus } from "../utils/extraTypes";

const TextDisplay = ({
  wordsArr,
  wordStatuses,
  wordIndex
}: {
  wordsArr: string[],
  wordStatuses: WordStatus[],
  wordIndex: number
}) => {
  return (
    <div className={`relative text-text`}>
      {
        wordsArr.map((d, i) => {
          const status = wordStatuses[i];
          let style;
          if (status === "CORRECT") {
            style = "text-correct"
          } else if (status === "INCORRECT") {
            style = "text-incorrect"
          } else {
            style = "text-text"
          }

          return (
            <span className={style} key={i}>
              {i === wordIndex ? <u>{d}</u> : <span> {d} </span>}
            </span>
          )
        })
      }
    </div>
  )
}

export default TextDisplay