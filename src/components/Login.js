import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";

export default function Login({ setEmail, email, setPassword, password, setToken, setError, error }) {
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


      if (result.user.isAdmin != true){
        navigate("/pastries");
        window.location.reload(false);
      }

      if (result.user.isAdmin = true){
        navigate("/admin");
      }
      
    } catch (error) {
      setError(error)  
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign in to access your account</h1>
      <form>
        <label>Email:</label>
        <br></br>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <br></br>
        <button onClick={submitHandler}>Login</button>
      </form>
    </div>
  );
}
