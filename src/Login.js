import React, { use } from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "./context/AuthProvider"
import axios from './api/axios'
const LOGIN_URL = '/auth'

const Login = () => {

    const {setAuth} = useContext(AuthContext);
    // So we can set focus on the first input when the component loads
    const userRef = useRef();
    // We'll need to set the focus on the errors for screen readers or other assitive tech to read if an error occurs
    const errRed = useRef();
    // Three states which will respond to our inputs
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    // Gets the error message from the server when we try to authenticate 
    const [errMsg, setErr] = useState('');
    // To show if we login right 
    const [success, setSuccess] = useState(false);

    // Set the focus on the first input when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Empty out any error message we might have if the user changes the user or password state/changes either one of the inputs will make the error disappear
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {headers: {'Content-Type': 'application/json'},
                withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            //console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken;
            // IMP: REFER TO HIS 9 HOUR INTRO FOR THIS. THIS AND BACKEND IS SETUP THROUGH THAT
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
        <section> 
            /*If we have an error message, we'll show it here*/
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text"
                       id="username" 
                       ref={userRef} 
                       autoComplete="off"
                       onChange={e => setUser(e.target.value)}
                       value={user} 
                       required
                />
                <label htmlFor="password">Password:</label>
                <input type="password"
                       id="password" 
                       onChange={e => setPwd(e.target.value)}
                       value={pwd} 
                       required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Accoun?<br />
                <span className="line">
                    /*React router link that should lead to the registration form. Will give a warning when used*/
                    {/*put router name here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
            )}
        </>
    )
}

export default Login