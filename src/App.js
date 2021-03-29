import React, {useContext} from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import IngredientsWithReducer from './components/Ingredients/IngredientsWithReducer';

import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {

	const authContext = useContext(AuthContext);

	let content = <Auth/>;

	if (authContext.isAuth){
		content = (
					<React.Fragment>
				  		<IngredientsWithReducer/>
				  		<Ingredients/>
				  	</React.Fragment>
				);
	}

  return content;
};

export default App;
