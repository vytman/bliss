import React from 'react';
import axios from 'axios';
import { Url } from '../../constants/general';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StyledVoteContainer, StyledVoteMainContainer, StyledDate, StyledImg } from './style';
import { Loading } from '../loading/loading';

export const QuestionDetails = props => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [questionDetails, setQuestionDetails] = useState({});
	const { image_url, question, choices, published_at } = questionDetails;
	const date = new Date(published_at)?.toLocaleDateString('en-US');
	const URL = Url.BASE;
	const [isLoading, setIsLoading] = React.useState(false);
	const handleOnClick = () => {
		setIsLoading(true);
		axios
			.put(`${URL}/questions/${id}`)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${URL}/questions/${id}`)
			.then(res => {
				setQuestionDetails(res.data);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id, URL]);

	const handleOnClickBack = () => {
		navigate(-1);
	};

	return (
		<div>
			{!isLoading && (
				<>
					<button onClick={handleOnClickBack}>Back</button>
					<h2>{question}</h2>
					<div>
						{image_url && (
							<div>
								<StyledImg alt="Programming" src={image_url} />
							</div>
						)}
						<div>
							<StyledVoteMainContainer>
								{choices?.map((choice, i) => (
									<StyledVoteContainer key={i}>
										<p>{choice.choice}</p>
										<button onClick={handleOnClick}>Vote</button>
									</StyledVoteContainer>
								))}
							</StyledVoteMainContainer>
						</div>
					</div>
					{published_at && <StyledDate>{date}</StyledDate>}
				</>
			)}
			<Loading isLoading={isLoading} />
		</div>
	);
};
