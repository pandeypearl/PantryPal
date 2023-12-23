import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.scss';
import AuthCreators from '../../components/AuthCreators';

const LogIn = () => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            setLoading(true);
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setError(null);
                navigate.push('/')
            } else {
                setSuccess(false);
                setError(data || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='wrapper'>
                <div className='auth-container'>
                    <h2>Log In</h2>
                    <hr />
                    <form>
                        <div>
                            <label>Username</label>
                            <input 
                                type='text' 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                placeholder='your username here...'
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input 
                                type='password' 
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder='your password here...'
                            />    
                        </div>

                        
                        <button type='button' onClick={handleLogin} disabled={loading}>
                        {loading ? 'Logging in...': 'Log in'} 
                        </button>
                        {success && <p>Log in successful! Redirecting...</p>}
                        {error && <p style={{ color: 'red'}}>{error}</p>}
                    </form>
                    <p><small>Forgot your password? <Link to='/login' className='auth-link'>Reset password</Link>.</small></p>
                </div>
            </div>
            <AuthCreators />
        </>
        
    );
};

export default LogIn;
