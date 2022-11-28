import React, { useRef } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Url } from '../../constants/general';
import { Question } from '../question/Question';
import { StyledList, StyledClearButton, StyledButtonContainer } from './style';
import debounce from 'lodash.debounce';

export const Questions = () => {
	const URL = Url.BASE;

	const containerRef = useRef();
	const [questions, setQuestions] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [query, setQuery] = React.useState({ limit: 10, filter: '', offset: 0 });
	const [isSearching, setIsSearching] = React.useState(false);

	const checkHealth = React.useCallback(() => {
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
	}, [URL]);

	const fetchQuestions = React.useCallback(
		(filter = '', limit = 10, offset = 0) => {
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
		},
		[URL, checkHealth]
	);
	const debouncedGetQuestions = React.useCallback(debounce(fetchQuestions, 500), [fetchQuestions]);

	const handleOnRetry = () => {
		debouncedGetQuestions('');
	};

	const handleOnFilterChange = value => {
		debouncedGetQuestions(value);
		setQuery({ ...query, filter: value });
		setIsSearching(true);
	};

	const handleOnClear = e => {
		setQuery({ ...query, filter: '' });
		debouncedGetQuestions('');
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

	let lastScrollTop = 0;
	const trackScolling = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (isBottom() && scrollTop > lastScrollTop) {
			debouncedGetQuestions(query.filter, 10, query.length);
		}
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	};

	React.useEffect(() => {
		window.addEventListener('scroll', trackScolling);
		debouncedGetQuestions('');

		return () => {
			window.removeEventListener('scroll', trackScolling);
		};
	}, []);

	const overrideCSS = {
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

			<StyledList>
				{questions.map((question, i) => (
					<li key={i}>
						<Question id={question.id} thumb={question.thumb_url} question={question.question} />{' '}
					</li>
				))}
			</StyledList>

			{isSearching && <button onClick={handleOnClickShareScreen}>Share Screen</button>}
			<ClipLoader
				color={'#ffffff'}
				loading={isLoading}
				cssOverride={overrideCSS}
				size={150}
				aria-label="Loading Spinner"
			/>
		</div>
	);
};
