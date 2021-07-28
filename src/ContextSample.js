import React, { createContext, useContext, useState } from "react";

const MyContext = createContext("defaultValue");

function Child() {
  const text = useContext(MyContext);
  return <div> hi {text} </div>;
}

function Parent({ text }) {
  return <Child text={text}></Child>;
}

function GrandParent({ text }) {
  return <Parent text={text}></Parent>;
}

function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? "Good" : "BAD"}>
      <GrandParent />
      <button onClick={() => setValue(!value)}>Click</button>
    </MyContext.Provider>
  );
}

export default ContextSample;
