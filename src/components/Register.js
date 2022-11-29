import { callApi } from "../api/utils";

export default function Register({
  email,
  setEmail,
  password,
  setPassword,
  setError,
  setToken,
  error,
}) {
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
      <h2>REGISTER</h2>
      <br></br>
      <form>
        <label className="loginHeaders">EMAIL ADDRESS</label>
        <br></br>
        <input className="loginInput" type="text" onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <br></br>
        <label className="loginHeaders">PASSWORD</label>
        <br></br>
        <input className="loginInput" type="password" onChange={(e) => setPassword(e.target.value)} />
        <br></br>
        <center><input className="loginButton" type="submit" value="Sign up" onClick={handleRegisterSubmit} /></center>
      </form>
      <p className="registerLink">Already have an account? Sign in!</p>
      {error && <p>{error}</p>}
    </div>
      </div>
  );
}
