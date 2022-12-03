import { callApi } from "../api/utils";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'

export default function Register({
  email,
  setEmail,
  password,
  setPassword,
  setError,
  setToken,
  error,
  confirmPassword,
  setConfirmPassword
}) {
  const navigate = useNavigate();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if(password === confirmPassword) {
      const result = await callApi({
        method: "POST",
        body: { email, password },
        path: "/users/register",
      });

      console.log("result :>> ", result);
      setToken(result.token);
      console.log("User Registered");

      if (!error){
        swal({
          icon: "success",
        });
      }

      navigate("/login");

      } else (
        swal({
          text: "Passwords do not match, try again."
        })
      )
      
    } catch (err) {
      
      setError(err);
      console.error(err);
    }
  };

  return (
    <div className="loginpage">
      <div className="loginContainer">
        <br></br>
        <h2 className="registerTitle">REGISTER</h2>
        <br></br>
        <form className="registerForm">
          <label className="loginHeaders">EMAIL ADDRESS</label>
          <input
            className="loginInput"
            type="text"
            name="name"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <label className="loginHeaders">PASSWORD</label>
          <input
            className="loginInput"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <label className="loginHeaders">CONFIRM PASSWORD</label>
          <input
            className="loginInput"
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />



          <p className="passwordLength">(Must be at least 8 characters long)</p>
          <center>
            <input
              className="loginButton"
              type="submit"
              value="Sign up"
              onClick={handleRegisterSubmit
              }
            />
          </center>
        </form>
        <p className="registerLink" onClick={() => navigate("/login")}>
          Already have an account? <a href="/login">Sign in!</a>
        </p>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}
