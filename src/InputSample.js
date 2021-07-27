import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  const nameInput = useRef();

  const { name, nickname } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    setInputs(nextInputs);
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="nickname"
        placeholder="Nick Name"
        onChange={onChange}
        value={nickname}
        ref={nameInput}
      />
      <input name="name" placeholder="Name" onChange={onChange} value={name} />
      <button onClick={onReset}>init</button>
      <div>
        <b> value : </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
