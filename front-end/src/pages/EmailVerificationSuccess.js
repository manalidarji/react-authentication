import { useNavigate } from "react-router-dom"

const EmailVerificationSuccess = () => {
	const navigate = useNavigate();

	return (
		<div className="content-container">
			<h1>Wohoo! <br/> Your email has been verified successfully!</h1>
			<p>Thank you for verifying your email adress, you can now enjoy all the features of this app!</p>
			<button onClick={() => {
				navigate('/', {replace: true})
			}}>Go To Home Page</button>
		</div>
	)
}

export default EmailVerificationSuccess