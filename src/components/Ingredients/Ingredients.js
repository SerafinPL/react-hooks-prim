import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {

	const [ingredients, setIngredients] = useState([]);

  	return (
    	<div className="App">
      		<IngredientForm />

      		<section>
        		<Search />
        		<IngredientList/>
      		</section>
    	</div>
  );
}

export default Ingredients;
