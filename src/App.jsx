import {useEffect, useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [char, setChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");
// useRef hook to add reference to the component
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) string += "0123456789";
    if (char) string += "!@#$%^&*()";

    for(let i= 1; i <= length; i++) {
      let data = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(data);
    }

    setPassword(pass);
  }, [length, char, number, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // window.alert("text copied to clipboard");
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, char, number, passwordGenerator])

  return (
    <>
      <div className="justify-center text-center mt-[12rem] text-4xl font-semibold font-mono">
        Password Generator
      </div>
      <div className="content-center mx-auto mt-14 flex  items-center space-x-2 md:w-1/3">
        <input
          className=" h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-lg placeholder:text-gray-600"
          type="text"
          placeholder="password"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          type="button"
          onClick={copyPasswordToClipboard}
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Copy
        </button>
      </div>
      <div className=" flex mx-auto gap-x-2 justify-center ">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            className=" cursor-pointer"
            min={8}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className=" cursor-pointer m-2 p-2"
            defaultChecked= {number}
            
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className=" cursor-pointer m-2 p-2"
            defaultChecked= {char}
            id="characterInput"
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
