import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {

	const [userIngredients, setUserIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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

	const filteredIngredientsHandler = useCallback((ingredientsArray) => {
		setUserIngredients(ingredientsArray);
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
			setUserIngredients( prevState => [
			...prevState , 
			{
				id: responseData.name, 
				...ingredient
			}] );
		});
		
	};

	const removeIngredientHandler = id => {
		// const ingredientsArray = userIngredients.filter((value) => value.id !== id);
		// setUserIngredients([...ingredientsArray]);
		//setUserIngredients(prevArray => prevArray.filter( (value) => value.id !== id ));
		setIsLoading(true);
		fetch(`https://hooks-e900b-default-rtdb.firebaseio.com/ingredients/${id}.json`,{
			method: 'DELETE',
		}).then(respones => {
			setIsLoading(false);
			setUserIngredients(prevArray => prevArray.filter( (value) => value.id !== id ));
		}).catch(erroe => {
			setIsLoading(false);
		});
	}

  	return (
    	<div className="App">
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
