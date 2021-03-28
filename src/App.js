import React from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import IngredientsWithReducer from './components/Ingredients/IngredientsWithReducer';

const App = props => {
  return (
  	<>
  		<IngredientsWithReducer/>
  		<Ingredients />
  	</>
  );
};

export default App;
