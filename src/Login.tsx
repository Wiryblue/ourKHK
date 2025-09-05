import { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function Login() {
 // Initialize Firebase authentication and navigation
    const auth = getAuth();
    const navigate = useNavigate();
    
    // State variables for managing authentication state, email, password, and error messages
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle sign-in with Google
    const signInWithGoogle = async () => {
        setAuthing(true);
        
        // Use Firebase to sign in with Google
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/userhome');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    }

    // Function to handle sign-in with email and password
    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        // Use Firebase to sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/userhome');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    }

    return (
        <div className=''>
            {/* Left half of the screen - background styling */}
            <div className=''>
            </div>

            {/* Right half of the screen - login form */}
            <div className=''>
                <div className=''>
                    {/* Header section with title and welcome message */}
                    <div className=''>
                        <h3 className=''>Login</h3>
                        <p className=''>Welcome Back! Please enter your details.</p>
                    </div>

                    {/* Input fields for email and password */}
                    <div className=''>
                        <input
                            type='email'
                            placeholder='Email'
                            className=''
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type='password'
                            placeholder='Password'
                            className=''
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Button to log in with email and password */}
                    <div className=''>
                        <button
                            className=''
                            onClick={signInWithEmail}
                            disabled={authing}>
                            Log In With Email and Password
                        </button>
                    </div>

                    {/* Display error message if there is one */}
                    {error && <div className=''>{error}</div>}

                    {/* Divider with 'OR' text */}
                    <div className=''>
                        <div className=''></div>
                        <p className=''>OR</p>
                    </div>

                    {/* Button to log in with Google */}
                    <button
                        className=''
                        onClick={signInWithGoogle}
                        disabled={authing}>
                        Log In With Google
                    </button>
                </div>

                {/* Link to sign up page */}
                <div className=''>
                    <p className=''>Don't have an account? <span className='underline'><a href='/signup'>Sign Up</a></span></p>
                </div>
            </div>
        </div>
    );
}

export default Login
