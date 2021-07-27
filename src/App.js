import React, { useRef, useState, useMemo, useCallback } from "react";
import Wrapper from "./Wrapper";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Counter from "./Counter";

function countActiveUsers(users) {
  console.log("Counting.... active users");

  return users.filter((user) => user.active).length;
}

function App() {
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  }); // users.concat(user);

  const { username, email } = inputs;
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // setUsers([...users, user]);
    setUsers((users) => users.concat(user));
    setInputs({
      username: "",
      email: "",
    });
    console.log(nextId.current);
    nextId.current += 1;
  }, [username, email]);

  const onDelete = useCallback((id) => {
    console.log(id);
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              active: !user.active,
            }
          : user
      )
    );
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
      <UserList users={users} onDelete={onDelete} onToggle={onToggle} />
      <div>Active users couunt : {count}</div>
    </Wrapper>
  );
}

export default App;
