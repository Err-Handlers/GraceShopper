import { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { Route, Routes, Link } from "react-router-dom";
import Register from "./Register";

import Pastries from "./Pastries";
import { callApi } from "../api/utils";
import Login from "./Login";
import CreateForm from "./CreateForm";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [pastries, setPastries] = useState([]);
  
  console.log('error :>> ', error);

  const fetchPastries = async () => {
    const data = await callApi({
      path: "/pastries"
    })
    setPastries(data);
  };
  
  useEffect(() => {
    fetchPastries();
  }, []);
  
  return (
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
            <Link to="/pastries">Pastries</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
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
          <Route
            path="/login"
            element={
              <Login
                setError={setError}
                error={error}
                setEmail={setEmail}
                email={email}
                setPassword={setPassword}
                password={password}
                setToken={setToken}
              />
            }
          ></Route>
          <Route
          path="/pastries"
          element={
            <Pastries 
              pastries={pastries}
              setPastries={setPastries}
            />
          }
      ></Route>
      <Route
          path="/admin"
          element={
            <CreateForm
              pastries={pastries}
              setPastries={setPastries}
              token={token}
            />
          }
      ></Route>
        </Routes>
      </div>

  );
};

export default App;
