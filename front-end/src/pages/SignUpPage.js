import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useToken from '../auth/useToken';
import axios from 'axios';

const SignUpPage = () => {
    const [token,  setToken] = useToken();
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');


    const onSignupClicked = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue
        });

        setToken(response.data.token);
        navigate('/', { replace: true });
    }

    return(
        <div className="content-container">
            <h1>Sign Up</h1>

            <input
                type="email"
                placeholder="john-doe@email.com"
                value={emailValue}
                onChange={ e => setEmailValue(e.target.value) } />

            <input 
                type="password"
                placeholder="password"
                value={passwordValue}
                onChange={ e => setPasswordValue(e.target.value) } />

            <input 
                type="password"
                placeholder="confirm password"
                value={confirmPasswordValue}
                onChange={ e => setConfirmPasswordValue(e.target.value) } />

            <button
                disabled={ 
                    !emailValue|| !passwordValue ||
                    !passwordValue !== !confirmPasswordValue } 
                onClick={onSignupClicked}>Sign Up</button>

            <button><Link to='/login'>Already have an account? Login Now</Link></button>
        </div>
    )
}

export default SignUpPage;