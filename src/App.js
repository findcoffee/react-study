import React, { useRef, useReducer, useMemo, useCallback } from "react";
import Wrapper from "./Wrapper";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Counter from "./Counter";
import useInputs from "./useInputs";

function countActiveUsers(users) {
  console.log("Counting.... active users");

  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "hi1",
      email: "hi1@mgmail.com",
      active: true,
    },
    {
      id: 2,
      username: "hi2",
      email: "hi2@mgmail.com",
      active: false,
    },
    {
      id: 3,
      username: "hi3",
      email: "hi3@mgmail.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        //...state,
        inputs: initialState.inputs,
        //users: [...state.users, action.user],
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id
            ? {
                ...user,
                active: !user.active,
              }
            : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const { username, email } = form;

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <Wrapper>
      <Counter />
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onDelete={onRemove} />
      <div>Active users couunt : {count}</div>
    </Wrapper>
  );
}

export default App;
