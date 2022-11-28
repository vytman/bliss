import { StyledContainer } from './style';
import { useNavigate } from 'react-router-dom';

export const Question = props => {
	const { id, thumb, question } = props;
	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate(`questions/${id}`, { state: { cenas: 'coisas' } });
	};

	return (
		<StyledContainer onClick={handleOnClick}>
			<p>#{id}</p>
			<img alt="Programming" src={thumb} width="120" height="120" />
			<p>{question}</p>
		</StyledContainer>
	);
};
