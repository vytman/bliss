import axios from 'axios';
import { Url } from '../../constants/general';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const QuestionDetails = props => {
	const { id } = useParams();
	const [questionDetails, setQuestionDetails] = useState({});
	const { image_url, question, choices, published_at } = questionDetails;
	const date = new Date(published_at)?.toLocaleDateString('en-US');
	const URL = Url.BASE;
	const handleOnClick = () => {
		axios
			.put(`${URL}/questions/${id}`)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get(`${URL}/questions/${id}`)
			.then(res => {
				setQuestionDetails(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [id, URL]);

	return (
		<div>
			<p>{question}</p>
			<div>
				{image_url && (
					<div>
						<img alt="Programming" src={image_url} width="600" height="400" />
					</div>
				)}
				<div>
					<div>
						{choices?.map((choice, i) => (
							<div key={i}>
								<p>{choice.choice}</p>
								<button onClick={handleOnClick}>Vote</button>
							</div>
						))}
					</div>
				</div>
			</div>
			{published_at && <p>{date}</p>}
		</div>
	);
};
