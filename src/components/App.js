import { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Products from "./Products";
import Cart from "./Cart";
import { callApi } from "../api/utils";
import Login from "./Login";
import Account from "./Account";
import CreateForm from "./CreateForm";
import { useNavigate } from "react-router-dom";


const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  

  const [token, setToken] = useState(window.localStorage.getItem("token") || "");
  const userToken = localStorage.getItem("token");
  // console.log(userToken)
  // console.log('token :>> ', token);

  const [productToEdit, setProductToEdit] = useState("")

  // const isAdmin = localStorage.getItem("isAdmin");
  // console.log(isAdmin)
  // const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    console.log(admin, "isAdmin");

    if (admin === "false") {
      return setIsAdmin(false);
    }

    if (admin === "true") {
      return setIsAdmin(true);
    }
  }, []);
console.log('token :>> ', token);
  //watch for a user change
  //if user changes, set admin to this
  //add a logout function

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const data = await callApi({
      path: "/products",
    });
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  

  const fetchCart = async () => {
    try {
      const data = await callApi({
        path: "/cart/products",
        token
      });
      setCart(data)
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  
  useEffect( () => {
    fetchCart();
  }, []);

  
  console.log('error :>> ', error);
  
  return (
    <div className="app-container">
      <nav className="navbarContainer">
        <h2 className="logoName">StickySituations</h2>
        
        <ul className="navbar">
          <li>
            <Link className="navbarLinks" to="/products">
              Home
            </Link>
          </li>
          <li>
            {!userToken ? (
              <div>
                <Link className="navbarLinks" to="/register">
                  Register
                </Link>
                <Link className="navbarLinks" to="login">
                  Login
                </Link>
              </div>
            ) : (
              <div>
                <Link className="navbarLinks" to="/account">Account</Link>

                <Link
                  className="navbarLinks"
                  to="/products"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsAdmin(false);
                    navigate("/products");
                  }}
                >
                  Logout
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link className="navbarLinks" to="/cart">
              Cart
            </Link>
          </li>
          <li>
            {isAdmin ? (
              <Link className="navbarLinks" to="/admin">
                Admin
              </Link>
            ) : null}
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
          path="/products"
          element={
            <Products
              token={token}
              isAdmin={isAdmin}
              cart={cart}
              setCart={setCart}
              productToEdit={productToEdit}
              products={products}
              setProducts={setProducts}
              fetchProducts={fetchProducts}
            />
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <CreateForm
              token={token}
              navigate={navigate}
              setProducts={setProducts}

            />
          }
        ></Route>
        <Route
          path="/cart"
          element={<Cart token={token} cart={cart}/>}
        ></Route>
        <Route path="/account" element={<Account></Account>}></Route>
      </Routes>
    </div>
  );
};

export default App;
