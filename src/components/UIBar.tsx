
const UIBar = ({
  numWordsOptions,
  numWords,
  updateNumWords,
  WPM,
  ACC
}: {
  numWordsOptions: number[],
  numWords: number,
  updateNumWords: (d: number) => void,
  WPM: number | "NAN",
  ACC: number | "NAN"
}) => {
  return (
    <div className="flex justify-between flex-col text-center md:flex-row md:text-start">
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
        <span className="pr-3">
          WPM: {WPM}
        </span>
        <span className="px-3 pr-0">
          ACC: {ACC}%
        </span>
      </div>
    </div>
  )
}

export default UIBar