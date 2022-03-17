import { useNavigate } from "react-router-dom"

const EmailVerificationFail = () => {
	const navigate = useNavigate();

	return (
		<div className="content-container">
			<h1>Uh oo...</h1>
			<p>Something went wrong while trying to verify email address.</p>
			<button onClick={() => {
				navigate('/signup', {replace: true})
			}}>Back To Sign Up Page</button>
		</div>
	)
}

export default EmailVerificationFail