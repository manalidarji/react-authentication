import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PleaseVerifyEmailPage = () => {
	const navigate  = useNavigate();

	useEffect( () => {
		setTimeout(() => {
			navigate('/', { replace: true });
		}, 5000)
	}, [navigate] );

	return (
		<div className="content-container">
			<h1>Thanks for Signing Up!</h1>
			<p>A verification email has been sent to the email address you provided<br/>
			Please verify email to unlock full site features</p>
		</div>
	)
}

export default PleaseVerifyEmailPage