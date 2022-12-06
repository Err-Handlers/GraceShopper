import { callApi } from "../api/utils";
import { useNavigate } from "react-router-dom";

export default function Register({
  email,
  setEmail,
  password,
  setPassword,
  setError,
  setToken,
  error,
}) {

  const navigate = useNavigate();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await callApi({
        method: "POST",
        body: { email, password },
        path: "/users/register",
      });
      console.log("result :>> ", result);
      setToken(result.token);
      console.log("User Registered");
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  return (
    <div className="loginpage">
      <div className= "loginContainer">
      <br></br>
      <h2 className="registerTitle">REGISTER</h2>
      <br></br>
      <form className="registerForm">
        <label className="loginHeaders">EMAIL ADDRESS</label>
        <input className="loginInput" type="text" onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <label className="loginHeaders">PASSWORD</label>
        <input className="loginInput" type="password" onChange={(e) => setPassword(e.target.value)} />
        <p className="passwordLength">(Must be at least 8 characters long)</p>
        <center><input className="loginButton" type="submit" value="Sign up" onClick={handleRegisterSubmit} /></center>
      </form>
      <p className="registerLink" onClick={ () => navigate("/login")}>Already have an account? Sign in!</p>
      {error && <p>{error}</p>}
    </div>
      </div>
  );
}
