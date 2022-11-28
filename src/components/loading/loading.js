import ClipLoader from 'react-spinners/ClipLoader';

export const Loading = props => {
	const { isLoading } = props;

	const overrideCSS = {
		position: 'absolute',
		margin: '0 auto',
		borderColor: 'red',
		top: 'calc(50% - 87.5px)',
		right: 'calc(50% - 87.5px)',
	};

	return (
		<ClipLoader
			color={'#ffffff'}
			loading={isLoading}
			cssOverride={overrideCSS}
			size={150}
			aria-label="Loading Spinner"
		/>
	);
};
