import { useContext, useState } from "react";
import "./login.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"
const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { user, loading, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
        console.log(e.target.value)
    }

    const handleClickLogin = async e => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }
        console.log(">>> check user :", user)
    }

    return (
        <>
            <div className="login">
                <div className="lContainer">
                    <div>
                        <input
                            type="text" placeholder="Username" id="username" className="lInput"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password" placeholder="Password" id="password" className="lInput"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button disabled={loading} onClick={handleClickLogin} className="lButton">
                            Login
                        </button>
                    </div>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </>
    )
}

export default Login;