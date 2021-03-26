import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {

	const [userIngredients, setUserIngredients] = useState([]);

	const addIngredientHandler = ingredient => {
		setUserIngredients( prevState => [
			...prevState , 
			{
				id: new Date().getTime(), 
				...ingredient
			}] );
	};

	const removeIngredientHandler = id => {
		const ingredientsArray = userIngredients.filter((value) => value.id !== id);
		setUserIngredients([...ingredientsArray]);

	}

  	return (
    	<div className="App">
      		<IngredientForm onAddIngr={addIngredientHandler}/>

      		<section>
        		<Search />
        		<IngredientList ingredients={userIngredients} onRemoveItem={ (id) => {removeIngredientHandler(id)} }/>
      		</section>
    	</div>
  );
}

export default Ingredients;
