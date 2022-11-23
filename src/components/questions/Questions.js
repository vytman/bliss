import React, { useRef } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { StyledClearButton, StyledButtonContainer } from './../../style';
import { Url } from '../../constants/general';

export const Questions = () => {
	const URL = Url.BASE;

	const containerRef = useRef();
	const [questions, setQuestions] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [query, setQuery] = React.useState({ limit: 10, filter: '', offset: 0 });
	const [isSearching, setIsSearching] = React.useState(false);

	const getQuestionsFunction = () => {
		let timer;
		return (filter = '', limit = 10, offset = 0) => {
			clearInterval(timer);
			timer = setTimeout(() => {
				checkHealth().then(data => {
					if (data?.status !== 'OK') {
						return;
					}
					setIsLoading(true);
					axios
						.get(`${URL}/questions?limit=${limit}&filter=${filter}&offset=${offset}`)
						.then(res => {
							setQuestions(res.data);
						})
						.catch(err => {
							console.log(err);
						})
						.finally(() => {
							setIsLoading(false);
						});
				});
			}, 500);
		};
	};
	const getQuestions = getQuestionsFunction();

	const checkHealth = () => {
		setIsLoading(true);
		return axios
			.get(`${URL}/health`)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleOnRetry = () => {
		getQuestions();
	};

	const handleOnFilterChange = value => {
		getQuestions(value);
		setQuery({ ...query, filter: value });
		setIsSearching(true);
	};

	const handleOnClear = e => {
		setQuery({ ...query, filter: '' });
		getQuestions('');
		setIsSearching(false);
	};

	const handleOnClickShareScreen = () => {
		setIsLoading(true);

		const currentPage = window.location.href;

		return axios
			.post(`${URL}/share?destination_email=your@email.com&content_url=${currentPage}`)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const isBottom = () => {
		const element = containerRef.current;
		return element.getBoundingClientRect().bottom <= window.innerHeight + 50;
	};

	const trackScolling = () => {
		if (isBottom) {
			getQuestions({ ...query, offset: query.limit + query.offset, limit: 10 });
		}
	};

	React.useEffect(() => {
		window.addEventListener('scroll', trackScolling);
		getQuestions();

		return () => {
			window.removeEventListener('scroll', trackScolling);
		};
	}, []);

	// if (containerRef.current?.scrollTop === containerRef.current?.scrollHeight - containerRef.current?.offsetHeight) {
	// 	console.log('nha');
	// }

	// console.log(containerRef.current);
	// console.log(containerRef.current.scrollHeight);
	// if (obj.scrollTop === obj.scrollHeight - obj.offsetHeight) {
	// 	containerRef.current.
	// }

	const override = {
		position: 'absolute',
		margin: '0 auto',
		borderColor: 'red',
		top: 'calc(50% - 87.5px)',
		right: 'calc(50% - 87.5px)',
	};

	return (
		<div ref={containerRef}>
			{questions.length ? (
				<>
					<StyledButtonContainer>
						<input
							placeholder="Search"
							type={'text'}
							onChange={e => {
								handleOnFilterChange(e.target.value);
							}}
							value={query.filter}
						/>

						<StyledClearButton type={'submit'} value="Clear" onClick={handleOnClear} />
					</StyledButtonContainer>
				</>
			) : (
				<button onClick={handleOnRetry} disabled={isLoading}>
					Retry
				</button>
			)}

			<ul>
				{questions.map((question, i) => (
					<li key={i}>{question.question}</li>
				))}
			</ul>

			{isSearching && <button onClick={handleOnClickShareScreen}>Share Screen</button>}
			<ClipLoader
				color={'#ffffff'}
				loading={isLoading}
				cssOverride={override}
				size={150}
				aria-label="Loading Spinner"
			/>
		</div>
	);
};
