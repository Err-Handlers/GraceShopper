import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";

export default function Login({ setEmail, email, setPassword, password, setToken, setError, error, setIsAdmin }) {
  const navigate = useNavigate();
  console.log(password);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await callApi({
        method: "POST",
        body: { email, password },
        path: "/users/login",
      });

      setToken(result.token);
      console.log(result);

      localStorage.setItem("user", result.user);
      console.log(result.user)
      localStorage.setItem("isAdmin", result.user.isAdmin);
      localStorage.setItem("token", result.token);

      if (result.user.isAdmin != true){
        navigate("/products");
        window.location.reload(false);
      }

      if (result.user.isAdmin = true){
        navigate("/products");
        // window.location.reload(false);
        setToken(result.token);
        setIsAdmin(true)
      }
      
    } catch (error) {
      setError(error)  
      console.error(error);
    }
  };

  return (
    <div className="loginpage">
    <div className= "loginContainer">
      <h2>SIGN IN</h2>
      <br></br>
      <form >
        <label className="loginHeaders">EMAIL ADDRESS</label>
        <br></br>
        <input className="loginInput"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <br></br>
        <br></br>
        <label className="loginHeaders">PASSWORD</label>
        <br></br>
        <input className="loginInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <br></br>
        <center><button className="loginButton" onClick={submitHandler}>SIGN IN</button></center>
      </form>
      <p className="registerLink">Don't have an account yet? Click me!</p>
    </div>

    </div>
  );
}
