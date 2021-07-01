import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>***</b>}
      Hello world! {name} <button>!!!</button>
      {/* comment */}
    </div>
  );
}

Hello.defaultProps = {
  name: "no name",
};
export default Hello;
