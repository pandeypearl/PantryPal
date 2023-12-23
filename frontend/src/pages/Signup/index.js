import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.scss';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://locahost:8000/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    password2,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setError(null);
                navigate.push('/profile')
            } else {
                setSuccess(false);
                setError(data.error || 'Sign up failed');
            }
        } catch (error) {
            console.error('Error during sign up:', error)
            setError('Network error')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='wrapper'>
            <div className='auth-container'>
                <h2>Sign Up </h2>
                <hr />
                
                <form>
                    <div>
                        <label>Username</label>
                        <input 
                            type='text' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder='unique username'
                        />
                    </div>
                    
                    <div>
                        <label>Email</label>
                        <input type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='example@email.com'
                        />
                    </div>
                    
                    <div>
                        <label>Password</label>
                        <input 
                            type='password' 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder='choose a secure password'
                        />    
                    </div>
                    
                    <div>
                        <label>Password Confirm</label>
                        <input 
                            type='text' 
                            value={password2} onChange={(e) => setPassword2(e.target.value)}
                            placeholder='confirm password'
                        />
                    </div>
                    
                    <button type='button' onClick={handleSignup} disabled={loading}>
                       {loading ? 'Signing up...': 'Sign up'} 
                    </button>
                    {success && <p>Sign up successful! Redirecting...</p>}
                    {error && <p style={{ color: 'red'}}>{error}</p>}
                </form>
                <p><small>Already have an account? <Link to='/login' className='auth-link'>Log in</Link>.</small></p>
            </div>

        </div>
    );

}

export default SignUp;