import { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  console.log('error :>> ', error);
  
  // useEffect(() => {
  //   // follow this pattern inside your useEffect calls:
  //   // first, create an async function that will wrap your axios service adapter
  //   // invoke the adapter, await the response, and set the data
  //   const getAPIStatus = async () => {
  //     const { healthy } = await getAPIHealth();
  //     setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
  //   };

  //   // second, after you've defined your getter above
  //   // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);
  
  return (
    <div className="app-container">
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/register"
          element={
            <Register
              setError={setError}
              error={error}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setToken={setToken}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
