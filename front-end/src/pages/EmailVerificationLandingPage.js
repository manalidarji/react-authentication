import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import useToken from "../auth/useToken";
import EmailVerificationSuccess from './EmailVerificationSuccess';
import EmailVerificationFail from './EmailVerificationFail';


const EmailVerificationLandingPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const {verificationString} = useParams();
	const [, setToken] = useToken();

	useEffect(() => {
		const loadVerification = async () => {
			try {
				const response = await axios.put('/api/verify-email', {verificationString});
				setToken(response.data.token);
				setIsSuccess(true);
				setIsLoading(false);
			} catch (error) {
				setIsSuccess(false);	
				setIsLoading(false);
			}
		}
		loadVerification();
	}, [setToken, verificationString]);

	if(isLoading) return <p>Loading...</p>

	if(isSuccess){
		return <EmailVerificationSuccess />;
	}else{
		return <EmailVerificationFail />;
	}
}

export default EmailVerificationLandingPage