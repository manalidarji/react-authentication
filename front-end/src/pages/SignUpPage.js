import {useState} from 'react';
import {Link} from 'react-router-dom';

const SignUpPage = () => {
    let [emailValue, setEmailValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');
    let [confirmPasswordValue, setConfirmPasswordValue] = useState('');


    const onSignupClicked = async () => {
        alert('sign up btn clicked');
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

            <button><Link to='/login'>Already have have an account? Log in Now</Link></button>
        </div>
    )
}

export default SignUpPage;