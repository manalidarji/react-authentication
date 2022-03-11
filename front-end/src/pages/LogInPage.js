import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import useToken from '../auth/useToken';

const LoginPage = () => {
    const navigate = useNavigate();
    const [token, setToken] = useToken();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onLoginClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue
        });

        setToken(response.data.token);
        navigate('/', { replace: true });
    }

    return(
        <div className="content-container">
            <h1>Log In</h1>

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

            <button
                disabled={ !(emailValue && passwordValue) } 
                onClick={onLoginClicked}>Log In</button>

            <button><Link to='/forgot-password'>Forgot your password?</Link></button>
            <button><Link to='/signup'>Don't have an account? Sign Up Now</Link></button>
        </div>
    )
}

export default LoginPage;