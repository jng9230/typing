import { generate, count } from "random-words";
import { useState } from "react";

console.log(generate({ exactly: 50 }))
function App() {
  const [words, setWords] = useState(() => {
    return generate({ exactly: 50 }).reduce((acc, curr) => {
      return acc + " " + curr
    })
  })
  return (
    <div className="w-screen h-screen flex items-center">
      <div>
        <div className="font-mono text-gray-500">
          {words}
        </div>
        <div>
          <input type="text"
            className="
              border-2 
              border-black 
              rounded-full
              px-3
              py-1
            "
          >
          </input>
        </div>
      </div>
    </div>
  );
}

export default App;
