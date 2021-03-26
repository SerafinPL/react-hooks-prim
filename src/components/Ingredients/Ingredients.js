import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {

	const [userIngredients, setUserIngredients] = useState([]);

	useEffect(() => {
		
		fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json')
			.then(response => response.json())
				.then(responseData => {
					const loadedIngredients = [];
					for (const key in responseData){
						loadedIngredients.push({id: key, ...responseData[key]})
					}
					setUserIngredients(loadedIngredients);
				}); 

	});



	const addIngredientHandler = ingredient => {
		fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json',{
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: {'Content-Type': 'application/json'}
		}).then(response => {
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
		setUserIngredients(prevArray => prevArray.filter( (value) => value.id !== id ));
	}

  	return (
    	<div className="App">
      		<IngredientForm onAddIngr={addIngredientHandler}/>

      		<section>
        		<Search />
        		<IngredientList ingredients={userIngredients} onRemoveItem={ removeIngredientHandler }/>
      		</section>
    	</div>
  );
}

export default Ingredients;
