import { callApi } from "../api/utils"

export default function Register({email, setEmail, password, setPassword}) {

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        try {
            const result = await callApi({
                method: "POST",
                body: {email, password},
                path: "/register"
            })
            console.log('result :>> ', result);
        } catch (err) {
            console.error(err);
        }
        
    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Sign up" onClick={handleRegisterSubmit}/>
            </form>
        </div>
    )
}