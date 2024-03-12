import { useState } from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";

function Contact() {
  const useAuth = AuthContext();
  const { auth } = useContext(useAuth);
   
  return (
    <>
      <h1>
        {auth && "Hello, World!"}
      </h1>
    </>
    )
}

export default function App() {
  const useAuth = AuthContext();
  const [auth, setAuth] = useState(true);
  const valorPassadoPeloContext = { auth, setAuth };

  return (
    <useAuth.Provider
      value={valorPassadoPeloContext}
    >
      <Contact />
    </useAuth.Provider>
  );
};
