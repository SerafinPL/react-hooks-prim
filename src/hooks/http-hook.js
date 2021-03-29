import {useReducer} from 'react';


const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return {loading: true, error: null};
		case 'RESPONSE':
			return {...curHttpState, loading: false,};
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
			error: null
		});

	const sendRequest = (url, method, body) => {
		dispatchHttp({type: 'SEND'});
		fetch(url/*`https://hooks-e900b-default-rtdb.firebaseio.com/ingredients/${id}.json`*/,{
			method: method/*'DELETE'*/,
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(respones => {
			dispatchHttp({type: 'RESPONSE'});
			dispatch({
				type: 'DELETE',
				id: id
			})
		})
		.catch(error => {
			dispatchHttp({type: 'ERROR', errorMessage: 'Coś poszło nie tak jak trzeba!'});
		});

	}

	
};

export default useHttp;