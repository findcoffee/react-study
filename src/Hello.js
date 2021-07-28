import React, { Component } from "react";

class Hello extends Component {
  static defaultProps = {
    name: "no name",
  };
  render() {
    const { color, isSpecial, name } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        Hi hello world! {name}
      </div>
    );
  }
}

// function Hello({ color, name, isSpecial }) {
//   return (
//     <div style={{ color }}>
//       {isSpecial && <b>***</b>}
//       Hello world! {name} <button>!!!</button>
//       {/* comment */}
//     </div>
//   );
// }

// Hello.defaultProps = {
//   name: "no name",
// };
export default Hello;
