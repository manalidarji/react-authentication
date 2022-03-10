// An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render nothing.
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = props => {
	const user = null;

	return (user) ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute