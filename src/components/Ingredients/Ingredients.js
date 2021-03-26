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

  	return (
    	<div className="App">
      		<IngredientForm onAddIngr={addIngredientHandler}/>

      		<section>
        		<Search />
        		<IngredientList ingredients={userIngredients} onRemoveItem={ () => {} }/>
      		</section>
    	</div>
  );
}

export default Ingredients;
