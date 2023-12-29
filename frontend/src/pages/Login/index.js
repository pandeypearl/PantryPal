import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import '../../styles/auth.scss';
import AuthCreators from '../../components/AuthCreators';

const LogIn = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try{
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (responseData.success) {
                navigate.push('/')
            } else {
                console.error('Error during login:', responseData.errors);

                Object.keys(responseData.errors).forEach((field) => {
                    const error = { message: responseData.errors[field] };
                    setError(field, 'backend', error);
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('network', 'backend', 'Network error.');
        }
    };

    return (
        <>
            <div className='wrapper'>
                <div className='auth-container'>
                    <h2>Log In</h2>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Username</label>
                            <Controller
                                name='username'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} placeholder='your username here...' />}
                            />
                            {errors.username && <div style={{ color: 'red' }}>{errors.username.message}</div>}
                        </div>

                        <div>
                            <label>Password</label>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} type='password' placeholder='your password here...' />}
                            />
                            {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}   
                        </div>

                        <button type='submit'>Log in</button>
                        {errors.network && <p style={{ color: 'red' }}>{errors.network.message}</p>}
                    </form>
                    <p><small>Forgot your password? <Link to='/' className='auth-link'>Reset password</Link>.</small></p>
                </div>
            </div>
            <AuthCreators />
        </>
        
    );
};

export default LogIn;
