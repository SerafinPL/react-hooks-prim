import React, {useReducer, useEffect, useCallback, useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

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
	// const [userIngredients, setUserIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	// useEffect(() => {

	// 	fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json')
	// 		.then(response => response.json())
	// 			.then(responseData => {
	// 				const loadedIngredients = [];
	// 				for (const key in responseData){
	// 					loadedIngredients.push({id: key, ...responseData[key]})
	// 				}
	// 				setUserIngredients(loadedIngredients);
	// 			}); 

	// }, []);

	useEffect(() => {
		console.log('RENDERING INGREDIENTS ', userIngredients);
	},[userIngredients]);

	const filteredIngredientsHandler = useCallback((ingredientsFilteredArray) => {
		//setUserIngredients(ingredientsArray);
		dispatch({
			type: 'SET',
			ingredients: ingredientsFilteredArray

		});
	}, []);


	const addIngredientHandler = ingredient => {
		setIsLoading(true);
		fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json',{
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: {'Content-Type': 'application/json'}
		}).then(response => {
			setIsLoading(false);
			return response.json();
		}).then(responseData => {
			// setUserIngredients( prevState => [
			// ...prevState , 
			// {
			// 	id: responseData.name, 
			// 	...ingredient
			// }] );
			dispatch({
				type: 'ADD',
				ingredient: {
								id: responseData.name,
								...ingredient
							} 
			});
		}).catch(error => {
			setIsLoading(false);
			setError(/*error.message*/ 'Coś poszło nie tak jak trzeba!');
		});;
		
	};

	const removeIngredientHandler = id => {
		// const ingredientsArray = userIngredients.filter((value) => value.id !== id);
		// setUserIngredients([...ingredientsArray]);
		//setUserIngredients(prevArray => prevArray.filter( (value) => value.id !== id ));
		setIsLoading(true);
		fetch(`https://hooks-e900b-default-rtdb.firebaseio.com/ingredients/${id}.json`,{
			method: 'DELETE',
		})
		.then(respones => {
			 setIsLoading(false);
			// setUserIngredients(prevArray => prevArray.filter( (value) => value.id !== id ));
			dispatch({
				type: 'DELETE',
				id: id
			})
		})
		.catch(error => {
			setIsLoading(false);
			setError(/*error.message*/ 'Coś poszło nie tak jak trzeba!');
		});
	}

	const clearError = () => {
		
		setError(null);

	}

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
        		<IngredientList ingredients={userIngredients} onRemoveItem={ removeIngredientHandler }/>
      		</section>
    	</div>
  );
}

export default Ingredients;
