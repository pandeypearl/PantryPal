import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import '../../styles/auth.scss';
import AuthCreators from '../../components/AuthCreators';
import AuthContext from '../../context/AuthContext';

const LogIn = () => {
    const {loginUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, setError, clearErrors } = useForm();
    const [error, setErrorState] = useState(null);
    // const [csrfToken, setCsrfToken] = useState('');

    // useEffect(() => {
    //     const fetchCsrfToken = async () => {
    //       try {
    //         const response = await fetch('http://localhost:8000/get_csrf/', {
    //           method: 'GET',
    //           credentials: 'include',
    //         });
    
    //         const responseData = await response.json();
    //         setCsrfToken(responseData.csrf_token);
    //       } catch (error) {
    //         console.error('Failed to fetch CSRF token:', error);
    //       }
    //     };
    
    //     fetchCsrfToken();
    //   }, []);
    

    // const onSubmit = async (data) => {
    //     try{
    //         const response = await fetch('http://localhost:8000/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-CSRFToken': csrfToken,
    //             },
    //             body: new URLSearchParams(data),
    //             credentials: 'include',
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             setErrorState(errorData.error);
    //             return;
    //         }

    //         setErrorState(null);
    //         const responseData = response.json();
    //         console.log('Login Successful:', responseData);

    //         navigate('/user-profile/:pk')
    //     } catch (error) {
    //         console.error('Login failed:', error.message);
    //         setErrorState('Network error. Please try again');
    //     }
    // };

    return (
        <>
            <div className='wrapper'>
                <div className='auth-container'>
                    <h2>Log In</h2>
                    <hr />
                    <form onSubmit={loginUser} method='POST'>
                        <div>
                            <label>Username</label>
                            <Controller
                                name='username'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} placeholder='Enter Username' />}
                            />
                            {/* {errors.username && <div style={{ color: 'red' }}>{errors.username.message}</div>} */}
                        </div>

                        <div>
                            <label>Password</label>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} type='password' placeholder='Enter Password' />}
                            />
                            {/* {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}    */}
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <button type='submit'>Log in</button>
                       
                    </form>
                    <p><small>Forgot your password? <Link to='/' className='auth-link'>Reset password</Link>.</small></p>
                </div>
            </div>
            <AuthCreators />
        </>
        
    );
};

export default LogIn;
