import React from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import IngredientsWithReducer from './components/Ingredients/IngredientsWithReducer';

import Auth from './components/Auth';

const App = props => {
  return (
  	<>
  		<IngredientsWithReducer/>
  		<Ingredients />
  	</>
  );
};

export default App;
