import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";

export default function Login({ setEmail, email, setPassword, password, setToken, setError, error }) {
//   const navigate = useNavigate();
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
    //   navigate("/");
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
