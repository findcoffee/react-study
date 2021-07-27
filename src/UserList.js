import React, { useEffect } from "react";

const User = React.memo(function User({ user, onDelete, onToggle }) {
  const { username, email, id, active } = user;
  useEffect(() => {
    console.log("will be load on the screen. ", user);
    return () => {
      console.log("will be disappeared. ", user);
    };
  }, [user]);

  return (
    <div>
      <b
        style={{
          color: active ? "green" : "black",
          cursor: "pointer",
        }}
        onClick={() => onToggle(id)}
      >
        {username}
      </b>{" "}
      <span>({email})</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
});

function UserList({ users, onDelete, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
