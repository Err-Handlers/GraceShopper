import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";
import swal from 'sweetalert';

export default function Login({ setEmail, email, setPassword, password, setToken, setError, error, setIsAdmin }) {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await callApi({
        method: "POST",
        body: { email, password },
        path: "/users/login",
      });

      setToken(result.token);
  
      localStorage.setItem("user", result.user);
      localStorage.setItem("isAdmin", result.user.isAdmin);
      localStorage.setItem("token", result.token);

      if (result.user.isAdmin != true){
        navigate("/products");
        window.location.reload(false);
      }

      if (result.user.isAdmin = true){
        navigate("/products");
        setToken(result.token);
        setIsAdmin(true)
      }

      if (!error){
        swal({
          icon: "success",
        });
      }

    } catch (error) {
      setError(error)  
      console.error(error);
    }
  };

  return (
    <div className="loginpage">
    <div className= "loginContainer">
      <h2 className="registerTitle">SIGN IN</h2>
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
        <br></br>
        <center><button className="loginButton" onClick={submitHandler}>Sign in</button></center>
      </form>
      <p>Test Email: test@gmail.com </p>
      <p>Test Password: testpassword</p>
      <p className="registerLink" onClick={ () => navigate("/register")}>Don't have an account yet? <a href="/register">Register here!</a></p>
      {error && <p className="text-danger">{error}</p>}
    </div>
    
    </div>
  );
}
