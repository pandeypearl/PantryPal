import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import '../../styles/auth.scss';
import AuthCreators from '../../components/AuthCreators';

const SignUp = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: {errors} } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://locahost:8000/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (responseData.success) {
                navigate.push('/profile')
            } else {
                console.error('Error during signup:', responseData.errors);
                Object.keys(responseData.errors).forEach((field) => {
                    const error = { message: responseData.errors[field] };
                    errors[field] = error;
                });
            }
        } catch (error) {
            console.error('Error during sign up:', error)
        } 
    };

    return (
        <>
            <div className='wrapper'>
                <div className='auth-container'>
                    <h2>Sign Up </h2>
                    <hr />
                    
                    <form onSubmit={handleSubmit(onSubmit)}> 
                        <div>
                            <label>Username</label>
                            <Controller 
                                name='username'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} placeholder='unique username' />} 
                            />
                            {errors.username && <div style={{ color: 'red' }}>{errors.username.message}</div>}
                        </div>
                        
                        <div>
                            <label>Email</label>
                            <Controller
                                name='email'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} type='email' placeholder='example@email.com' />}
                            />
                            {errors.email && <div style={{ color: 'red'}}>{errors.email.message}</div>}
                        </div>
                        
                        <div>
                            <label>Password</label>
                            <Controller 
                                name='password' 
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} type='password' placeholder='secure password' />}
                            />
                            {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                        </div>
                        
                        <div>
                            <label>Password Confirm</label>
                            <Controller
                                name='password2'
                                control={control}
                                defaultValue=''
                                render={({ field }) => <input {...field} type='password' placeholder='confirm password' />}
                            />
                            {errors.password2 && <div style={{ color: 'red' }}>{errors.password2.message}</div>}
                        </div>
                        
                        <button type='button'>Sign up</button>

                    </form>
                    <p><small>Already have an account? <Link to='/login' className='auth-link'>Log in</Link>.</small></p>
                </div>

            </div>
            <AuthCreators />
        </>
    );

}

export default SignUp;