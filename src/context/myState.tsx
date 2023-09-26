import React, { useState } from "react";
import MyContext from "./myContext";

const MyState = (props: any) => {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  return (
    <MyContext.Provider
      value={{ mode, toggleMode, loading, setLoading, user, setUser }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
