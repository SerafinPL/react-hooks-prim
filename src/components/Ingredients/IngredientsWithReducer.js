import React, {useReducer, useEffect, useCallback, useMemo} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http-hook';

const ingredientReducer = (currentIngredients, action) => {

	switch(action.type){
		case 'SET':
			return action.ingredients;
		case 'ADD':
			return [...currentIngredients, action.ingredient];
		case 'DELETE':
			return currentIngredients.filter(ing => ing.id !== action.id);
		default:
			throw new Error('błąd który nie wystąpi');
	};//switch

};



const Ingredients = (props) => {
	/* [state, function to dipatch actions ]*/
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []); //(function, initialState)
	
	const {isLoading, data, error, sendRequest} = useHttp();
	

	useEffect(() => {
		console.log('RENDERING INGREDIENTS ', userIngredients);
	},[userIngredients]);

	const filteredIngredientsHandler = useCallback((ingredientsFilteredArray) => {
		dispatch({
			type: 'SET',
			ingredients: ingredientsFilteredArray
		});
	}, []);


	const addIngredientHandler = useCallback(ingredient => {
		// dispatchHttp({type: 'SEND'});
		// fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json',{
		// 	method: 'POST',
		// 	body: JSON.stringify(ingredient),
		// 	headers: {'Content-Type': 'application/json'}
		// }).then(response => {
		// 	dispatchHttp({type: 'RESPONSE'});
		// 	return response.json();
		// }).then(responseData => {
		// 	dispatch({
		// 		type: 'ADD',
		// 		ingredient: {
		// 						id: responseData.name,
		// 						...ingredient
		// 					} 
		// 	});
		// }).catch(error => {
		// 	dispatchHttp({type: 'ERROR', errorMessage: 'Coś poszło nie tak jak trzeba!'});
		// });
	}, []);

	const removeIngredientHandler = useCallback(id => {
		sendRequest(`https://hooks-e900b-default-rtdb.firebaseio.com/ingredients/${id}.json`, 'DELETE')
		
	}, []);

	const clearError = useCallback(() => {
		// dispatchHttp({type: 'CLEAR_ERROR'});
	}, []);

	const ingredientList = useMemo(() => {
		return <IngredientList ingredients={userIngredients} onRemoveItem={ removeIngredientHandler }/>;
	},[userIngredients, removeIngredientHandler]);

  	return (
    	<div className="App">
    		<h1 style={{textAlign: 'center'}}>Lista Zakupów Na useReducer</h1>
    		{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      		<IngredientForm 
      			onAddIngr={addIngredientHandler}
      			loading={isLoading}
      		/>
      		<section>
        		<Search onLoadIngr={filteredIngredientsHandler} />
        		{ingredientList}
      		</section>
    	</div>
  );
}

export default Ingredients;
