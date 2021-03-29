import {useReducer, useCallback} from 'react';


const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return {loading: true, error: null, data: null};
		case 'RESPONSE':
			return {...curHttpState, loading: false, data: action.responseData};
		case 'ERROR':
			return {loading: false, error: action.errorMessage};
		case 'CLEAR_ERROR':
			return {...curHttpState, error: null};
		default:
			throw new Error('błąd który nie wystąpi');
	};//switch
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(
		httpReducer, 
		{
			loading: false, 
			error: null,
			data: null
		});

	const sendRequest = useCallback((url, method, body) => {
		dispatchHttp({type: 'SEND'});
		fetch(url/*`https://hooks-e900b-default-rtdb.firebaseio.com/ingredients/${id}.json`*/,{
			method: method/*'DELETE'*/,
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response.json();
			// dispatch({
			// 	type: 'DELETE',
			// 	id: id
			// })
		})
		.then(responseConverted => {
			dispatchHttp({type: 'RESPONSE', responseData: responseConverted});
		})
		.catch(error => {
			dispatchHttp({type: 'ERROR', errorMessage: 'Coś poszło nie tak jak trzeba!'});
		});

	}, []);

	return {
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		sendRequest: sendRequest

	};
	
};

export default useHttp;