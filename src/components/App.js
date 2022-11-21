import { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Pastries from "./Pastries";
import Cart from "./Cart";
import { callApi } from "../api/utils";
import Login from "./Login";
import CreateForm from "./CreateForm";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [pastries, setPastries] = useState([]);
  const userToken = localStorage.getItem("token")
  console.log(userToken)

  // const isAdmin = localStorage.getItem("isAdmin");
  // console.log(isAdmin)
  // const [currentUser, setCurrentUser] = useState(undefined);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      const admin = localStorage.getItem("isAdmin");
      console.log(admin, "isAdmin")

      if (admin === "false"){
        return setIsAdmin(false);
      }

      if (admin === "true"){
        return setIsAdmin(true)
      }

    }, []);

    //watch for a user change
    //if user changes, set admin to this
    //add a logout function

  const navigate = useNavigate();
  
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
              <Link to="/cart">Cart</Link>
            </li>
            <li>
            {!userToken ? 
              ( <Link to="login">Login</Link> ) : 
              (<Link to="/pastries" onClick={() => {
                    localStorage.removeItem("token");
                    setIsAdmin(false);
                    navigate("/pastries");
                  }}>Log Out</Link>
              )}
            </li>
            <li>
            <Link to="/pastries">Pastries</Link>
          </li>
          <li>
          {isAdmin ? <Link to="/admin">Admin</Link> : null}
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
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          <Route
          path="/pastries"
          element={
            <Pastries 
              pastries={pastries}
              setPastries={setPastries}
              token={token}
              isAdmin={isAdmin}
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
              navigate={navigate}
            />
          }
      ></Route>
      <Route path="/cart" element={<Cart token={token}/>}>
      </Route>
        </Routes>
      </div>

  );
};

export default App;
