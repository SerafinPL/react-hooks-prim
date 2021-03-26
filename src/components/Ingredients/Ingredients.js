import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {

	const [userIngredients, setUserIngredients] = useState([]);

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
