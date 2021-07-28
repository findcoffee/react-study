import React, { useReducer, useMemo, createContext } from "react";
import produce from "immer";
import Wrapper from "./Wrapper";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Counter from "./Counter";

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
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    // {
    //...state,
    //inputs: initialState.inputs,
    //users: [...state.users, action.user],
    //users: state.users.concat(action.user),
    // };
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    // return {
    //   ...state,
    //   users: state.users.map((user) =>
    //     user.id === action.id
    //       ? {
    //           ...user,
    //           active: !user.active,
    //         }
    //       : user
    //   ),
    // };
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    // return {
    //   ...state,
    //   users: state.users.filter((user) => user.id !== action.id),
    // };
    default:
      return state;
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <Wrapper>
      <UserDispatch.Provider value={dispatch}>
        <Counter />
        <CreateUser />
        <UserList users={users} />
        <div>Active users couunt : {count}</div>
      </UserDispatch.Provider>
    </Wrapper>
  );
}

export default App;
