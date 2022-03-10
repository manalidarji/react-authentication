import {useState} from 'react';
import {Link} from 'react-router-dom';

const LoginPage = () => {
    let [emailValue, setEmailValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');

    const onLoginClicked = async () => {
        alert('login btn clicked');
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