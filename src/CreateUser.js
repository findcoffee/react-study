import React, { useContext, useRef } from "react";
import { UserDispatch } from "./App";
import useInputs from "./useInputs";

function CreateUser() {
  const dispatch = useContext(UserDispatch);

  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const id = useRef(4);
  const { username, email } = form;

  return (
    <div>
      <input
        name="username"
        placeholder="Account name"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="email"
        onChange={onChange}
        value={email}
      />
      <button
        onClick={() => {
          dispatch({
            type: "CREATE_USER",
            user: {
              id: id.current,
              username,
              email,
            },
          });
          id.current += 1;
          reset();
        }}
      >
        Register
      </button>
    </div>
  );
}

export default React.memo(CreateUser);
