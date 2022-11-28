import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import { Questions } from './components/questions/Questions';
import { NoInternet } from './components/noInternet/NoInternet';
import { StyledContainer } from './style';
import { Route as RouteName } from './constants/general';
import { useCheckInterNet } from './hooks/general';
import { QuestionDetails } from './components/questionDetails/QuestionDetails';

function App() {
	const checkInternet = useCheckInterNet();

	useEffect(() => {
		checkInternet();
	}, []);

	return (
		<StyledContainer>
			<Routes>
				<Route path={RouteName.QUESTION_DEATILS} element={<QuestionDetails />} />
				<Route path={RouteName.QUESTIONS} element={<Questions />} />
				<Route path={RouteName.NO_INTERNET} element={<NoInternet />} />
			</Routes>
		</StyledContainer>
	);
}

export default App;
