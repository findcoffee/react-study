import { useState, useReducer, useCallback } from "react";

function reducer(state, action) {
  //CHANGE
  //RESET
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      console.log("State keys from Object keys :" + Object.keys(state));
      return Object.keys(state).reduce((key, current) => {
        console.log("key =", key, " current = ", current);
        key[current] = "";
        return key;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  }, []);

  const reset = useCallback(
    () =>
      dispatch({
        type: "RESET",
      }),
    []
  );

  return [form, onChange, reset];
}

export default useInputs;
