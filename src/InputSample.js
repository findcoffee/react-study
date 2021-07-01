import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

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
  };
  return (
    <div>
      <input name="name" placeholder="Name" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="Nick Name"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>init</button>
      <div>
        <b> value : </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
