import { useNavigate } from 'react-router-dom';
import { Route as RouteName } from './../constants/general';

export const useCheckInterNet = () => {
	const navigate = useNavigate();

	return () => {
		setInterval(() => {
			const isInNoInternetScreen = window.location.href.lastIndexOf(RouteName.NO_INTERNET) > -1;
			if (!window.navigator.onLine && !isInNoInternetScreen) {
				navigate(RouteName.NO_INTERNET);
			} else if (window.navigator.onLine && isInNoInternetScreen) {
				navigate(-1);
			}
		}, 5000);
	};
};
