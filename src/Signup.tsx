import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
    // Initialize Firebase authentication and navigation
    const auth = getAuth();
    const navigate = useNavigate();
    
    // State variables for managing authentication state, email, password, confirm password, and error messages
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle sign-up with Google
    const signUpWithGoogle = async () => {
        setAuthing(true);
        
        // Use Firebase to sign up with Google
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    // Function to handle sign-up with email and password
    const signUpWithEmail = async () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        // Use Firebase to create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    };

    return (
        <div className=''>
            {/* Left half of the screen - background styling */}
            <div className=''>
            </div>

            {/* Right half of the screen - signup form */}
            <div className=''>
                <div className=''>
                    {/* Header section with title and welcome message */}
                    <div className=''>
                        <h3 className=''>Sign Up</h3>
                        <p className=''>Welcome! Please enter your information below to begin.</p>
                    </div>

                    {/* Input fields for email, password, and confirm password */}
                    <div className=''>
                        <input
                            type='email'
                            placeholder='Email'
                            className=''
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className=''
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Re-Enter Password'
                            className=''
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Display error message if there is one */}
                    {error && <div className=''>{error}</div>}

                    {/* Button to sign up with email and password */}
                    <div className=''>
                        <button
                            onClick={signUpWithEmail}
                            disabled={authing}
                            className=''>
                            Sign Up With Email and Password
                        </button>
                    </div>

                    {/* Divider with 'OR' text */}
                    <div className=''>
                        <div className=''></div>
                        <p className=''>OR</p>
                    </div>

                    {/* Button to sign up with Google */}
                    <button
                        onClick={signUpWithGoogle}
                        disabled={authing}
                        className=''>
                        Sign Up With Google
                    </button>
                </div>

                {/* Link to login page */}
                <div className=''>
                    <p className=''>Already have an account? <span className=''><a href='/login'>Log In</a></span></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;