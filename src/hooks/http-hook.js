import {useReducer, useCallback} from 'react';


		const initialState = {
			loading: false, 
			error: null,
			data: null,
			extra: null,
			identifier: null
		}

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return {loading: true, error: null, data: null, extra: null, identifier: action.identifer};
		case 'RESPONSE':
			return {...curHttpState, loading: false, data: action.responseData, extra: action.extra};
		case 'ERROR':
			return {loading: false, error: action.errorMessage};
		case 'CLEAR_ERROR':
			return initialState;
		default:
			throw new Error('błąd który nie wystąpi');
	};//switch
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, initialState );


	const clearErr = useCallback(() => {
		dispatchHttp({type: 'CLEAR_ERROR'})
	}, []);
	
	const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifer) => {
		dispatchHttp({type: 'SEND', identifer: reqIdentifer});
		fetch(url/*`https://hooks-e900b-default-rtdb.firebaseio.com/ingredients/${id}.json`*/,{
			method: method/*'DELETE'*/,
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response.json();
		})
		.then(responseConverted => {
			dispatchHttp({type: 'RESPONSE', responseData: responseConverted, extra: reqExtra });
		})
		.catch(error => {
			dispatchHttp({type: 'ERROR', errorMessage: 'Coś poszło nie tak jak trzeba!'});
		});

	}, []);

	

	return {
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		sendRequest: sendRequest,
		reqExtra: httpState.extra,
		reqIdentifer: httpState.identifier,
		clearErr: clearErr

	};
	
};

export default useHttp;